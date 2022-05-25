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
        uint id;
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
        require(KameleonTokenAddress != address(0x0), "constructor : KameleonTokenAddress is empty "); 
        KameleonToken = IKameleonKIP7(KameleonTokenAddress);
        _pollCreationFee = pollCreationFee_;
    }

    function setTokenAddress(address KameleonTokenAddress) public onlyOwner returns (bool) {
        require(KameleonTokenAddress != address(0x0), "setToken function : KameleonTokenAddress is empty "); 
        KameleonToken = IKameleonKIP7(KameleonTokenAddress);
        return true;
    }

    function getTokenAddress() public view returns (address) {
        return address(KameleonToken);
    }

    function getPollCreationFee () public view returns(uint){
        return _pollCreationFee;
    }

    function setPollCreationFee (uint pollCreationFee_) public onlyOwner returns(uint){
        _pollCreationFee = pollCreationFee_;
    }

    modifier _enoughTokenForCreatePoll(uint day_){
        require( day_ <= 14 && KameleonToken.balanceOf(msg.sender) > _pollCreationFee * day_ , "modifier _enoughTokenForCreatePoll");
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
    function vote(uint pollIndex_, uint value_ ,bool isAgree) public _isNotExpired(pollIndex_) returns(uint){
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

    modifier _isExpired(uint pollIndex_){
        // 시간이 지났거나 만료가 되었거나
        require(now > polls[pollIndex_].endTime || polls[pollIndex_].expired == true,"modifier _expiredChecker : poll time over or expired poll");
        _;
    }

    modifier _isNotExpired(uint pollIndex_){
        // 시간이 지나지 않았거나 만료가 되지 않았거나
        require(now <= polls[pollIndex_].endTime,"modifier _expiredChecker : poll is not time over ");
        require(polls[pollIndex_].expired == false,"modifier _expiredChecker : not expired poll");
        _;
    }

    // poll 에서 토큰 회수
    function withdrawBalance (uint pollIndex_) public _isExpired(pollIndex_) {
        KameleonToken.safeTransfer(msg.sender,polls[pollIndex_].holdingBalance[msg.sender]);
        polls[pollIndex_].holdingBalance[msg.sender] = 0;
    }

    // creator 인지 확인
    modifier isCreator (uint pollIndex_) {
        require(polls[pollIndex_].creator == msg.sender, "is Not Creater");
        _;
    }
    // poll creator가 확인되면 해당 poll 만료로 전환
    function expiryPoll(uint pollIndex_) public onlyOwner isCreator(pollIndex_) {
        polls[pollIndex_].expired = true;
    }

    // 현재 인덱스
    function getPollsLength () public view returns (uint){
        return pollIndex;
    }
    
    // poll이 만료가 되었는지
    function isExpired (uint pollIndex_) public view returns (bool){
        return (now > polls[pollIndex_].endTime) || (polls[pollIndex_].expired == true);
    }

    // 해당 poll이 통과가 되었는지
    function isPollpass (uint pollIndex_) public view _isExpired(pollIndex_) returns (bool){
        return (polls[pollIndex_].agree + polls[pollIndex_].disagree) > (getTotalSupply() / 5) && (polls[pollIndex_].agree > polls[pollIndex_].disagree);
    }

    // 카멜레온 토큰 총 발행량
    function getTotalSupply () public view returns (uint){
        return KameleonToken.totalSupply();
    }
    
    function pollState(uint pollIndex_) public view returns(string memory, string memory, uint, uint, uint, uint, bool){
      return (
          polls[pollIndex_].title,
          polls[pollIndex_].content,
          polls[pollIndex_].agree,
          polls[pollIndex_].disagree,
        //   polls[pollIndex_].creator,
          polls[pollIndex_].createdTime,
          polls[pollIndex_].endTime,
          polls[pollIndex_].expired
          );
    }

     function getPollState(uint pollIndex_) public view returns(returnPoll memory){
      returnPoll memory returnPollState; 
      returnPollState.id = pollIndex_;
      returnPollState.title = polls[pollIndex_].title;
      returnPollState.content = polls[pollIndex_].content;
      returnPollState.agree = polls[pollIndex_].agree;
      returnPollState.disagree = polls[pollIndex_].disagree;
      returnPollState.creator = polls[pollIndex_].creator;
      returnPollState.createdTime = polls[pollIndex_].createdTime;
      returnPollState.endTime = polls[pollIndex_].endTime;
      returnPollState.expired = polls[pollIndex_].expired;
      return returnPollState;
    }

    function pollList() public view returns(returnPoll[] memory){
      returnPoll[] memory returnPollList = new returnPoll[](pollIndex);
      for(uint i = 0 ; i < pollIndex; i++){
          returnPollList[pollIndex-1-i].id = i;
          returnPollList[pollIndex-1-i].title = polls[i].title;
          returnPollList[pollIndex-1-i].content = polls[i].content;
          returnPollList[pollIndex-1-i].agree = polls[i].agree;
          returnPollList[pollIndex-1-i].disagree = polls[i].disagree;
          returnPollList[pollIndex-1-i].creator = polls[i].creator;
          returnPollList[pollIndex-1-i].createdTime = polls[i].createdTime;
          returnPollList[pollIndex-1-i].endTime = polls[i].endTime;
          returnPollList[pollIndex-1-i].expired = polls[i].expired;
      }
      return returnPollList;
    }


    function pollListPagenation(uint pollIndex_) public view returns(returnPoll[] memory){
      returnPoll[] memory returnPollList = new returnPoll[](10);
      uint idx = 0;
      for(uint i = pollIndex_ ; i < pollIndex; i++){
          if(idx >= 10){
              break;
          }
          returnPollList[idx].id = i;
          returnPollList[idx].title = polls[i].title;
          returnPollList[idx].content = polls[i].content;
          returnPollList[idx].agree = polls[i].agree;
          returnPollList[idx].disagree = polls[i].disagree;
          returnPollList[idx].creator = polls[i].creator;
          returnPollList[idx].createdTime = polls[i].createdTime;
          returnPollList[idx].endTime = polls[i].endTime;
          returnPollList[idx].expired = polls[i].expired;
          idx++;
      }
      returnPoll[] memory newReturnPollList = new returnPoll[](idx);
      for(uint i = 0 ; i < idx;i++){
          newReturnPollList[idx-i-1] = returnPollList[i];
      }
      return newReturnPollList;
    }
}