// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.5.6;

import "./Exchange.sol";

// uniswap v1  KIP-7 <> Klaytn
contract Factory {
    mapping(address => address) public tokenToExchange;
    
    // Exchange list 추가하기
    mapping (uint256 => address) public exchangeList;
    uint256 public exchangeCount = 0;

    function getExchangeCount() public view returns (uint256) {
        return exchangeCount;
    }

    function getExchangeList(uint256 index) public view returns (address) {
        return exchangeList[index];
    }

    function createExchange(address _tokenAddress) public returns (address) {
        require(_tokenAddress != address(0), "Factory: invalid token address");
        require(
            tokenToExchange[_tokenAddress] == address(0),
            "Factory: exchange already exists"
        );

        // 해당 Exchange 컨트랙트 생성
        Exchange exchange = new Exchange(_tokenAddress);
        tokenToExchange[_tokenAddress] = address(exchange);

        // Exchange list 에 추가
        exchangeList[exchangeCount] = address(exchange);
        exchangeCount++;

        return address(exchange);
    }

    function getExchange(address _tokenAddress) public view returns (address) {
        return tokenToExchange[_tokenAddress];
    }
}
// lp mint

// swap

// lp 소각