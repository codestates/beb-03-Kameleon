// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.5.6;

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

    function createKStock(string memory name_, string memory symbol_) public onlyOwner returns (address) {
        // require(_tokenAddress != address(0), "Factory: invalid token address");

        // 해당 KStock 컨트랙트 생성
        KStockToken kStockToken = new KStockToken(name_, symbol_);
        // 오너 변경
        kStockToken.transferOwnership(msg.sender);

        // kStock list 에 추가
        _kStockIndex[address(kStockToken)] = _kStockCount;
        _kStockList[_kStockCount].kStockAddress = address(kStockToken);
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
    function getStockList() public view {

    }

    function getKStockCount() public view returns (uint256) {
        return _kStockCount;
    }

    // Oracle 가격 설정하는 함수
    function setOraclePrice(uint256[] memory priceArr) public onlyOwner {
        require (_kStockCount == priceArr.length, "Oracle: number of price is wrong");
        for(uint256 i = 0; i < _kStockCount; i++) {
            _kStockList[i].kStockPrice = priceArr[i];
        }
    }

    // function getExchange(address _tokenAddress) public view returns (address) {
    //     return tokenToExchange[_tokenAddress];
    // }
}