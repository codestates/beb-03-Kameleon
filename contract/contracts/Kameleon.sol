pragma solidity ^0.5.6;

import "./KIP7.sol";
import "./Factory.sol";
import "./Ownable.sol";


// KIP7과 Factory역할 통합
contract Kameleon is KIP7, Factory, Ownable {
    string private _name;
    string private _symbol;

    function name() public view returns (string memory) {
        return _name;
    }

    function symbol() public view returns (string memory) {
        return _symbol;
    }

    function decimals() public pure returns (uint8) {
        return 18;
    }

    constructor() KIP7() public {
        _name = "Kameleon";
        _symbol = "KLT";
    }
    /*
     * minimum test 작성
     * 
     */
    // 하루에 airdrop 할 토큰수 정리
    // 5000개
    uint256 private _totalMintAmountPerDay = 5000e18;

    // 가장 최근의 LPT 기록(하루전 정보)과 현재 기록
    mapping(address => uint256) private _lastLPT;
    mapping(address => uint256) private _currentLPT;
    // last대비 상승한 current LPT
    mapping(address => uint256) private _increasedLPT;

    // override Factory:createExchange
    function createExchange(address _tokenAddress) public onlyOwner returns (address) {
        address temp = super.createExchange(_tokenAddress);
        _lastLPT[temp] = 0;
        return temp;
    }

    
    // Exchnage 에 LP 보유량만큼 airdrop -> 
    function mintToExchange(address exchangeAddress, uint256 amount) private {
        Exchange exchange = Exchange(exchangeAddress);
        uint256 mul =  amount / exchange.totalSupply();
        for (uint256 i = 0; i < exchange.getAddrCount(); i++) {
            _mint(exchange.getAddr(i), exchange.getIndexBalance(i) * mul);
        }
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
        for (uint256 i = 0; i < exchangeCount; i++) {
            address exchangeAddr = exchangeList[i];
            _currentLPT[exchangeAddr] = Exchange(exchangeAddr).getLiquidityPerToken();
            
            // lastLPT 가 0이면 새로 만들어진 컨트랙트 혹은 유동성이 0에서 증가한것(increasedLPT = 0)
            if (_lastLPT[exchangeAddr] != 0) {
                _increasedLPT[exchangeAddr] = _currentLPT[exchangeAddr] / _lastLPT[exchangeAddr] - 1;
            } else {
                _increasedLPT[exchangeAddr] = 0;
            }
            LPTsum += _increasedLPT[exchangeAddr];
        }

        // LPTsum, _totalMintAmountPerDay, increasedLPT 를 통해 mintToExchange 실행
        // 추가로 lastLPT 갱신
        for (uint256 i = 0; i < exchangeCount; i++) {
            address exchangeAddr = exchangeList[i];
            uint256 numerator = _totalMintAmountPerDay * _increasedLPT[exchangeAddr];
            mintToExchange(exchangeAddr, numerator / LPTsum);
            _lastLPT[exchangeAddr] = _currentLPT[exchangeAddr];
        }
    }

    function changeTotalMintAmountPerDay(uint256 amount) public onlyOwner {
        _totalMintAmountPerDay = amount;
    }
}