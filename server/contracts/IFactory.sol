// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.5.6;

// import "./Exchange.sol";

// uniswap v1  KIP-7 <> Klaytn
contract IFactory {
    mapping(address => address) public tokenToExchange;
    
    // Exchange list 추가하기
    mapping (uint256 => address) public exchangeList;
    uint256 public exchangeCount = 0;

    function getExchangeCount() public view returns (uint256);

    function getExchangeList(uint256 index) public view returns (address);

    function createExchange(address _tokenAddress) public returns (address);

    function getExchange(address _tokenAddress) public view returns (address);
}
// lp mint

// swap

// lp 소각