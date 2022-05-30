// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.5.6;

import "./KIP7.sol";
import "./Ownable.sol";

interface IOracle {
    function getPriceByAddress(address kStockAddr) external view returns (uint256);
}

contract KStockToken is KIP7, Ownable {
    string private _name;
    string private _symbol;
    address private _oracleAddress;
    uint256 private _tokenPrice;
    string private _stockCode;
    uint256 private _mintFee = 1;

    function name() public view returns (string memory) {
        return _name;
    }

    function symbol() public view returns (string memory) {
        return _symbol;
    }

    function decimals() public pure returns (uint8) {
        return 18;
    }

    function stockCode() public view returns (string memory) {
        return _stockCode;
    }    

    constructor(string memory name_, string memory symbol_, string memory stockCode_) KIP7() public {
        _name = name_;
        _symbol = symbol_;
        _stockCode = stockCode_;
        _oracleAddress = msg.sender; // 오라클 주소 저장
        // _tokenPrice = 4000e18; // 초기값 4000클레이ㅣ(200만원이상)
    }

    // modifier onlyOracle() {
    //     require(msg.sender == _oracleAddress, "KStockToken: caller is not oracle");
    //     _;
    // }

    // 오라클에서 가격을 확인하고 mint 가격 책정
    function getMintAmount(uint256 klayAmount) public view returns (uint256) {
        uint256 price = IOracle(_oracleAddress).getPriceByAddress(address(this));
        // ( klayAmount * 99 / 100 ) * ( 1/ price);
        return (klayAmount * (100 - _mintFee) ) * 1e16 / (price );
    }

    // 오라클에서 가격을 확인하고 burn 가격 책정
    function getBurnAmount(uint256 kStockAmount) public view returns (uint256) {
        uint256 price = IOracle(_oracleAddress).getPriceByAddress(address(this));
        // (kStockAmount * 99 / 100 )* price
        return (kStockAmount * (100 - _mintFee) * price) / 1e20;
    }


    function mint() payable public {
        _mint(msg.sender, getMintAmount(msg.value));
    }

    function burn(uint256 burnAmount) public {
        _burn(msg.sender, burnAmount);
        msg.sender.transfer(getBurnAmount(burnAmount));
    }

    // 관리자함수, 컨트랙트에 몇토큰이 있는지 확인 가능

    function addKlay() payable public onlyOwner {
    }

    function claimKlay(uint256 amount) public onlyOwner {
        msg.sender.transfer(amount);
    }
}