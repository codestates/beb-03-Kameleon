// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.5.6;
pragma experimental ABIEncoderV2;

import "./KStockToken.sol";
import "./Ownable.sol";

// uniswap v1  KIP-7 <> Klaytn
contract Oracle is Ownable {
    struct kStock {
        address kStockAddress;
        uint256 kStockPrice;
    }
    address private _owner;
    
    // Exchange list 추가하기
    mapping (uint256 => kStock) private _kStockList;
    mapping (address => uint256) private _kStockIndex;
    uint256 private _kStockCount = 0;

    constructor () public {
        _owner = msg.sender;
    }

    function createKStock(string memory name_, string memory symbol_, uint256 stockCode_) public onlyOwner returns (address) {
        // require(_tokenAddress != address(0), "Factory: invalid token address");

        // 해당 KStock 컨트랙트 생성
        KStockToken kStockToken = new KStockToken(name_, symbol_, stockCode_);
        // 오너 변경
        kStockToken.transferOwnership(msg.sender);

        // kStock list 에 추가
        _kStockIndex[address(kStockToken)] = _kStockCount;
        _kStockList[_kStockCount].kStockAddress = address(kStockToken);
        _kStockList[_kStockCount].kStockPrice = 2000e18;
        _kStockCount++;

        return address(kStockToken);
    }


    function getKStockAddressByIndex(uint256 index) public view returns (address) {
        return _kStockList[index].kStockAddress;
    }

    function getIndexByAddress(address kStockAddr) public view returns (uint256) {
        // 0주의?
        require(_kStockList[_kStockIndex[kStockAddr]].kStockAddress == kStockAddr, "Oracle: kStock address is not exists");
        return _kStockIndex[kStockAddr];
    }

    function getPriceByAddress(address kStockAddr) public view returns (uint256) {
        return _kStockList[getIndexByAddress(kStockAddr)].kStockPrice;
    }

    // StockList 출력
    function getStockCodeList() public view returns (uint256[] memory){
        uint256[] memory stockCodeList = new uint256[](_kStockCount);
        for(uint256 i = 0; i < _kStockCount; i++) {
            stockCodeList[i] = KStockToken(_kStockList[i].kStockAddress).stockCode();
        }
        return stockCodeList;
    }

    function getKStockCount() public view returns (uint256) {
        return _kStockCount;
    }

    // Oracle 가격 설정하는 함수 1kStock 이 몇 peb인지 설정 (string으로 보낼것)
    function setOraclePrice(uint256[] memory priceArr) public onlyOwner {
        require (_kStockCount == priceArr.length, "Oracle: number of price is wrong");
        for(uint256 i = 0; i < _kStockCount; i++) {
            require(priceArr[i] > 0, "Oracle: price should be more than 0");
            _kStockList[i].kStockPrice = priceArr[i];
        }
    }

    function getOraclePrice() public view returns (uint256[] memory) {
        uint256[] memory priceArr = new uint256[](_kStockCount);
        for(uint256 i = 0; i < _kStockCount; i++) {
            priceArr[i] = _kStockList[i].kStockPrice;
        }
        return priceArr;
    }

    // function getExchange(address _tokenAddress) public view returns (address) {
    //     return tokenToExchange[_tokenAddress];
    // }
}