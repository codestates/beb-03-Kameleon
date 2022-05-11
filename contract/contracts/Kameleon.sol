pragma solidity ^0.5.6;

import "./KIP7.sol";
import "./Factory.sol";
import "./Ownable.sol";


// KIP7과 Factory역할 통합
contract Kameleon is KIP7, Factory, Ownable {

    /*
     * minimum test 작성
     * 
     */
    // 하루에 airdrop 할 토큰수 정리

    // 가장 최근의 LPT 기록(하루전 정보)과 현재 기록
    mapping(address => uint256) private _lastLPT;
    mapping(address => uint256) private _currentLPT;
    // last대비 상승한 current LPT
    mapping(address => uint256) private _increasedLPT;


    // testMintToLPs 용 test amount
    uint256 private _testAmount = 1000000000000000000;
    
    /**
      * test: testMintToLPs(): 컨트랙트 내에 등록된 address에 민트
      */
    function testMintToLPs() public onlyOwner {
        require(exchangeCount > 0, "testMintToLPs: no Exchange exists");
        // 전체 Exchange 탐색
        for(uint256 i = 0; i < exchangeCount; i++) {
            // Exchange 하나 선택
            Exchange exchange = Exchange(exchangeList[i]);
            for(uint256 j = 0; j < exchange.getAddrCount(); j++) {
                // Exchange 내의 address 하나 선택, 민팅
                _mint(exchange.getAddr(j), _testAmount);
            }
        }
    }

    // override Factory:createExchange
    function createExchange(address _tokenAddress) public onlyOwner returns (address) {
        address temp = super.createExchange(_tokenAddress);
        _lastLPT[temp] = 0;
        return temp;
    }

    /** 
     * mintToLPs() : 하루 발행량을 계산, 각 Exchange에서 rewardamount를 가져와서 과거의 reward amount 변화율을 측정, 
     * rewardamount 변화율을 통해 각 exchange에 airdrop할 토큰수 결정,
     * 각 exchange에 등록된 총 address 측정
     * 각 address의 balace를 탐색해 
     */
    function mintToLPs() public onlyOwner {
        require(exchangeCount > 0, "mintToLPs: no Exchange exists");

        uint256 LPTsum = 0;
        // 각 Exchange의 LPT 검색해서 currentLPT, increasedLPT 갱신, increasedLPT sum 도 구함
        for(uint256 i = 0; i < exchangeCount; i++) {
            address exchangeAddr = exchangeList[i];
            _currentLPT[exchangeAddr] = Exchange(exchangeAddr).getLiquidityPerToken();
            _increasedLPT[exchangeAddr] = _currentLPT[exchangeAddr] / _lastLPT[exchangeAddr] - 1;
            LPTsum += _increasedLPT[exchangeAddr];
        }
    }

     
}