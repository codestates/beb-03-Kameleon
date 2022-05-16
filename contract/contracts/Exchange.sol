// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.5.6;

import "./KIP7.sol";
import "./IFactory.sol";


interface IExchange {
    function ethToTokenSwap(uint256 _minTokens) external payable;

    function ethToTokenTransfer(uint256 _minTokens, address _recipient)
        external
        payable;
}

// interface IFactory {
//     function getExchange(address _tokenAddress) external returns (address);
// }

// uniswap v1 only KIP-7 to Klaytn
contract Exchange is KIP7 {
    address public tokenAddress;
    address public factoryAddress;

    // address list에 추가
    mapping (address => bool) private _isAddrExist;
    mapping (uint256 => address) private _addrList;
    uint256 private _addrCount = 0;

    constructor(address _token) KIP7() public {
        require(_token != address(0), "invalid token address");

        tokenAddress = _token;
        factoryAddress = msg.sender;
    }

    // address 탐색을 쉽게 하기 위해 LP에 한번이상 참여한 address를 기록
    modifier checkAddr {
        if (_isAddrExist[msg.sender]) {
            _;
        } else {
            _addrList[_addrCount] = msg.sender;
            _addrCount++;
            _isAddrExist[msg.sender] = true;
            _;
        }
    }

    // 전체 등록된 addr 수
    function getAddrCount() public view returns (uint256) {
        return _addrCount;
    }

    // 각 index의 address
    function getAddr(uint256 index) public view returns (address) {
        require (index < _addrCount, "Exchange getAddr(index): exceeded index");
        return _addrList[index];
    }

    // index에 있는 주소의 balance
    function getIndexBalance(uint256 index) public view returns (uint256) {
        require (index < _addrCount, "Exchange getAddrAndBalance(index): exceeded index");
        return balanceOf(_addrList[index]);
    }

    // addLiquidity 하기 위해 필요한 클레이 대비 필요한 토큰 수
    function getMinimumTokenAmountToAddLiquidity(uint256 _ethAmount) public view returns (uint256) {
        if (getReserve() == 0) {
            return 0;
        } else {
            uint256 ethReserve = address(this).balance - _ethAmount;
            uint256 tokenReserve = getReserve();
            uint256 tokenAmount = (_ethAmount * tokenReserve) / ethReserve;
            return tokenAmount;
        }
    }

    // checkAddr modifier 추가
    function addLiquidity(uint256 _tokenAmount) checkAddr
        public
        payable
        returns (uint256)
    {
        if (getReserve() == 0) {
            KIP7 token = KIP7(tokenAddress);
            require(_tokenAmount > 0, "Exchange: invalid token amount");
            token.transferFrom(msg.sender, address(this), _tokenAmount);

            uint256 liquidity = address(this).balance;
            _mint(msg.sender, liquidity);

            return liquidity;
        } else {
            uint256 ethReserve = address(this).balance - msg.value;
            uint256 tokenReserve = getReserve();
            uint256 tokenAmount = (msg.value * tokenReserve) / ethReserve;
            require(_tokenAmount >= tokenAmount, "insufficient token amount");

            KIP7 token = KIP7(tokenAddress);
            token.transferFrom(msg.sender, address(this), tokenAmount);

            uint256 liquidity = (msg.value * totalSupply()) / ethReserve;
            _mint(msg.sender, liquidity);

            return liquidity;
        }
    }

    function removeLiquidity(uint256 _amount)
        public
        returns (uint256, uint256)
    {
        require(_amount > 0, "invalid amount");

        uint256 ethAmount = (address(this).balance * _amount) / totalSupply();
        uint256 tokenAmount = (getReserve() * _amount) / totalSupply();

        _burn(msg.sender, _amount);
        (msg.sender).transfer(ethAmount);
        KIP7(tokenAddress).transfer(msg.sender, tokenAmount);

        return (ethAmount, tokenAmount);
    }

    function getReserve() public view returns (uint256) {
        return KIP7(tokenAddress).balanceOf(address(this));
    }

    function getTokenAmount(uint256 _ethSold) public view returns (uint256) {
        require(_ethSold > 0, "ethSold is too small");

        uint256 tokenReserve = getReserve();

        return getAmount(_ethSold, address(this).balance, tokenReserve);
    }

    function getEthAmount(uint256 _tokenSold) public view returns (uint256) {
        require(_tokenSold > 0, "tokenSold is too small");

        uint256 tokenReserve = getReserve();

        return getAmount(_tokenSold, tokenReserve, address(this).balance);
    }

    function ethToToken(uint256 _minTokens, address recipient) private {
        uint256 tokenReserve = getReserve();
        uint256 tokensBought = getAmount(
            msg.value,
            address(this).balance - msg.value,
            tokenReserve
        );

        require(tokensBought >= _minTokens, "insufficient output amount");

        IKIP7(tokenAddress).transfer(recipient, tokensBought);
    }

    function ethToTokenTransfer(uint256 _minTokens, address _recipient)
        public
        payable
    {
        ethToToken(_minTokens, _recipient);
    }

    function ethToTokenSwap(uint256 _minTokens) public payable {
        ethToToken(_minTokens, msg.sender);
    }

    function tokenToEthSwap(uint256 _tokensSold, uint256 _minEth) public {
        uint256 tokenReserve = getReserve();
        uint256 ethBought = getAmount(
            _tokensSold,
            tokenReserve,
            address(this).balance
        );

        require(ethBought >= _minEth, "insufficient output amount");

        IKIP7(tokenAddress).transferFrom(
            msg.sender,
            address(this),
            _tokensSold
        );
        (msg.sender).transfer(ethBought);
    }

    function tokenToTokenSwap(
        uint256 _tokensSold,
        uint256 _minTokensBought,
        address _tokenAddress
    ) public {
        address exchangeAddress = IFactory(factoryAddress).getExchange(
            _tokenAddress
        );
        require(
            exchangeAddress != address(this) && exchangeAddress != address(0),
            "invalid exchange address"
        );

        uint256 tokenReserve = getReserve();
        uint256 ethBought = getAmount(
            _tokensSold,
            tokenReserve,
            address(this).balance
        );

        IKIP7(tokenAddress).transferFrom(
            msg.sender,
            address(this),
            _tokensSold
        );

        IExchange(exchangeAddress).ethToTokenTransfer.value(ethBought)(
            _minTokensBought,
            msg.sender
        );
    }

    function getAmount(
        uint256 inputAmount,
        uint256 inputReserve,
        uint256 outputReserve
    ) private pure returns (uint256) {
        require(inputReserve > 0 && outputReserve > 0, "invalid reserves");

        // 수수료 0.3%
        uint256 inputAmountWithFee = inputAmount * 997;
        uint256 numerator = inputAmountWithFee * outputReserve;
        uint256 denominator = (inputReserve * 1000) + inputAmountWithFee;

        return numerator / denominator;
    }

    // LP당 유동성 공급된 유동성이 없을 경우 0
    // 제곱근하면 좋은데 일단 진행
    // LPT 공식) klay pool * token pool / totalLPtoken^2
    function getLiquidityPerToken () public view returns (uint256) {
        uint256 numerator = address(this).balance * KIP7(tokenAddress).balanceOf(address(this)) * 1000000; // 1000000은 계산을 위한 가중치

        // LP의 제곱으로 나눈다
        uint256 denominator = totalSupply() * totalSupply();
        if (numerator != 0) {
            return numerator / denominator;
        } else {
            return 0;
        }
    }
}