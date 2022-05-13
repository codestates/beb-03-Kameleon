pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;


import "./IKIP7.sol";
import "./Ownable.sol";


contract Govern is Ownable {
    IKIP7 KameleonToken;
    uint _pollCreationFee;

    struct returnPoll{
        string title;
        string content;
        uint agree;
        uint disagree;
        uint createdTime;
        bool expired;
    }

    struct Poll {
        string title;
        string content;
        uint agree;
        uint disagree;
        address creator;
        uint createdTime;
        bool expired;
        mapping(address => uint) holdingBalance;
    }
    mapping(uint => Poll) private polls;
    uint pollIndex = 0;

    constructor(address KameleonTokenAddress, uint pollCreationFee_) public {
        require(KameleonTokenAddress != address(0x0)); 
        KameleonToken = IKIP7(KameleonTokenAddress);
        _pollCreationFee = pollCreationFee_;
    }

    function setToken(address KameleonTokenAddress) public onlyOwner returns (bool) {
        require(KameleonTokenAddress != address(0x0)); 
        KameleonToken = IKIP7(KameleonTokenAddress);
        return true;
    }

    modifier _enoughTokenForCreatePoll(){
        require(KameleonToken.balanceOf(msg.sender) > _pollCreationFee);
        _;
    }
    function createPoll(string memory title_, string memory content_) public _enoughTokenForCreatePoll {
        KameleonToken.safeTransfer(msg.sender,_pollCreationFee);
        polls[pollIndex] = Poll({
            title:title_,
            content:content_,
            agree:0,
            disagree:0,
            creator:msg.sender,
            createdTime:block.timestamp,
            expired:false
        });
        pollIndex++;
    }
    function vote(uint pollIndex_, uint value_ ,bool isAgree) public returns(uint){
        // owner 주소로 송금
        KameleonToken.transferFrom(msg.sender,address(this),value_);

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

    function withdrawableBalance (uint pollIndex_) public view returns (uint){
        return polls[pollIndex_].holdingBalance[msg.sender];
    }

    modifier _expiredChecker(uint pollIndex_){
        require(now > polls[pollIndex_].createdTime + (60*60*24*3) || polls[pollIndex_].expired == true);
        _;
    }

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
    function expiryPoll(uint pollIndex_) public isCreator(pollIndex_) {
        polls[pollIndex_].expired = true;
    }

    function getLastPollIndex () public view returns (uint){
        return pollIndex;
    }
    
    function isExpired (uint pollIndex_) public view returns (bool){
        return (now > polls[pollIndex_].createdTime + (60*60*24*3)) || (polls[pollIndex_].expired == true);
    }

    function isPollpass (uint pollIndex_) public view _expiredChecker(pollIndex_) returns (bool){
        return (polls[pollIndex_].agree + polls[pollIndex_].disagree) > (getTotalSupply() / 5) && (polls[pollIndex_].agree > polls[pollIndex_].disagree);
    }

    function getTotalSupply () public view returns (uint){
        return KameleonToken.totalSupply();
    }
    
    function voteState(uint pollIndex_) public view returns(string memory,string memory,uint,uint,uint,bool){
      return (
          polls[pollIndex_].title,
          polls[pollIndex_].content,
          polls[pollIndex_].agree,
          polls[pollIndex_].disagree,
          polls[pollIndex_].createdTime,
          polls[pollIndex_].expired
          );
    }

    function voteList() public view returns(returnPoll[] memory){
      Poll[] memory pollList = new Poll[](pollIndex);
    //   uint[] memory pollList = new uint[](pollIndex);
      uint newPollIndex = 0;
      for(uint i = pollIndex-1; i >= 0; i--){
          if(now < polls[i].createdTime + (60*60*24*3)){
              if(polls[i].expired == false){
                // pollList[newPollIndex] = i;
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
          returnPollList[i].createdTime = pollList[i].createdTime;
          returnPollList[i].expired = pollList[i].expired;
      }
      return returnPollList;
    }
}