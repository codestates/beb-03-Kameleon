pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;


import "./IKIP7.sol";
import "./Ownable.sol";

interface IKameleon {
    function governTransfer(address from, address to, uint256 amount) external;
}

contract IKameleonKIP7 is IKameleon, IKIP7{
    
}


contract Govern is Ownable {
    IKameleonKIP7 KameleonToken;
    uint _pollCreationFee;

    struct returnPoll{
        string title;
        string content;
        uint agree;
        uint disagree;
        address creator;
        uint createdTime;
        uint endTime;
        bool expired;
    }

    struct Poll {
        string title;
        string content;
        uint agree;
        uint disagree;
        address creator;
        uint createdTime;
        uint endTime;
        bool expired;
        mapping(address => uint) holdingBalance;
    }
    mapping(uint => Poll) private polls;

    uint pollIndex = 0;
    uint period = (60*60*24);

    constructor(address KameleonTokenAddress, uint pollCreationFee_) public {
        require(KameleonTokenAddress != address(0x0)); 
        KameleonToken = IKameleonKIP7(KameleonTokenAddress);
        _pollCreationFee = pollCreationFee_;
    }

    function setToken(address KameleonTokenAddress) public onlyOwner returns (bool) {
        require(KameleonTokenAddress != address(0x0)); 
        KameleonToken = IKameleonKIP7(KameleonTokenAddress);
        return true;
    }

    modifier _enoughTokenForCreatePoll(uint day_){
        require( day_ <= 14 && KameleonToken.balanceOf(msg.sender) > _pollCreationFee * day_ , "_enoughTokenForCreatePoll");
        _;
    }
    function createPoll(string memory title_, string memory content_,uint day_) public _enoughTokenForCreatePoll(day_) {
        KameleonToken.governTransfer(msg.sender,address(this),_pollCreationFee * day_);
        polls[pollIndex] = Poll({
            title:title_,
            content:content_,
            agree:0,
            disagree:0,
            creator:msg.sender,
            createdTime:now,
            endTime:now+(period*day_),
            expired:false
        });
        pollIndex++;
    }
    function vote(uint pollIndex_, uint value_ ,bool isAgree) public returns(uint){
        // owner 주소로 송금
        KameleonToken.governTransfer(msg.sender,address(this),value_);

        if(isAgree == true){
            // 찬성표 증가
            polls[pollIndex_].agree += value_;
        }
        else{
            // 반대표 증가
            polls[pollIndex_].disagree += value_;
        }

        // tranfer 한 balance 만큼 mapping
        polls[pollIndex_].holdingBalance[msg.sender] += value_;
    }

    // poll에서 회수 가능한 토큰
    function withdrawableBalance (uint pollIndex_) public view returns (uint){
        return polls[pollIndex_].holdingBalance[msg.sender];
    }

    modifier _expiredChecker(uint pollIndex_){
        require(now > polls[pollIndex_].endTime || polls[pollIndex_].expired == true);
        _;
    }

    // poll 에서 토큰 회수
    function withdrawBalance (uint pollIndex_) public _expiredChecker(pollIndex_) {
        KameleonToken.safeTransfer(msg.sender,polls[pollIndex_].holdingBalance[msg.sender]);
        polls[pollIndex_].holdingBalance[msg.sender] = 0;
    }

    // creator 인지 확인
    modifier isCreator (uint pollIndex_) {
        require(polls[pollIndex_].creator == msg.sender);
        _;
    }
    // poll creator가 확인되면 해당 poll 만료로 전환
    function expiryPoll(uint pollIndex_) public onlyOwner isCreator(pollIndex_) {
        polls[pollIndex_].expired = true;
    }

    // 현재 인덱스
    function getLastPollIndex () public view returns (uint){
        return pollIndex;
    }
    
    // poll이 만료가 되었는지
    function isExpired (uint pollIndex_) public view returns (bool){
        return (now > polls[pollIndex_].endTime) || (polls[pollIndex_].expired == true);
    }

    // 해당 poll이 통과가 되었는지
    function isPollpass (uint pollIndex_) public view _expiredChecker(pollIndex_) returns (bool){
        return (polls[pollIndex_].agree + polls[pollIndex_].disagree) > (getTotalSupply() / 5) && (polls[pollIndex_].agree > polls[pollIndex_].disagree);
    }

    // 카멜레온 토큰 총 발행량
    function getTotalSupply () public view returns (uint){
        return KameleonToken.totalSupply();
    }
    
    function voteState(uint pollIndex_) public view returns(string memory, string memory, uint, uint, address, uint, uint, bool){
      return (
          polls[pollIndex_].title,
          polls[pollIndex_].content,
          polls[pollIndex_].agree,
          polls[pollIndex_].disagree,
          polls[pollIndex_].creator,
          polls[pollIndex_].createdTime,
          polls[pollIndex_].endTime,
          polls[pollIndex_].expired
          );
    }

    function voteList() public view returns(returnPoll[] memory){
      Poll[] memory pollList = new Poll[](pollIndex);
      uint newPollIndex = 0;
      for(uint i = pollIndex-1; i >= 0; i--){
          if(now < polls[i].endTime){
              if(polls[i].expired == false){
                pollList[newPollIndex] = polls[i];
                newPollIndex++;
              }
          }
          else{
              break;
          }
      }

      returnPoll[] memory returnPollList = new returnPoll[](newPollIndex);
      for(uint i = 0 ; i < newPollIndex; i++){
          returnPollList[i].title = pollList[i].title;
          returnPollList[i].content = pollList[i].content;
          returnPollList[i].agree = pollList[i].agree;
          returnPollList[i].disagree = pollList[i].disagree;
          returnPollList[i].creator = pollList[i].creator;
          returnPollList[i].createdTime = pollList[i].createdTime;
          returnPollList[i].endTime = pollList[i].endTime;
          returnPollList[i].expired = pollList[i].expired;
      }
      return returnPollList;
    }
}