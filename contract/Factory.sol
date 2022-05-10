// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.5.6;

import "./Exchange.sol";

// uniswap v1  KIP-7 <> Klaytn
contract Factory {
    mapping(address => address) public tokenToExchange;

    function createExchange(address _tokenAddress) public returns (address) {
        require(_tokenAddress != address(0), "invalid token address");
        require(
            tokenToExchange[_tokenAddress] == address(0),
            "exchange already exists"
        );

        // 해당 Exchange 컨트랙트 생성
        Exchange exchange = new Exchange(_tokenAddress);
        tokenToExchange[_tokenAddress] = address(exchange);

        return address(exchange);
    }

    function getExchange(address _tokenAddress) public view returns (address) {
        return tokenToExchange[_tokenAddress];
    }
}
// lp mint

// swap

// lp 소각