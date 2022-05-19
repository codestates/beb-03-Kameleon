pragma solidity ^0.5.0;

import "./KIP7.sol";
import "./Ownable.sol";

contract MyKIP7 is KIP7, Ownable {
    string private _name;
    string private _symbol;
    address private _governAddress;
    uint private _oraclePrice;

    function updateOraclePrice(uint oraclePrice_) public onlyOwner returns(uint){
        _oraclePrice = oraclePrice_;
        return _oraclePrice;
    }

    function name() public view returns (string memory) {
        return _name;
    }

    function symbol() public view returns (string memory) {
        return _symbol;
    }

    function decimals() public pure returns (uint8) {x
        return 18;
    }

    function setGovernAddress(address governAddress) public onlyOwner {
        require(governAddress != address(0x0)); 
        _governAddress = governAddress;
    }

    modifier onlyGovern() {
        require(_governAddress == msg.sender, "Kameleon: only govern can execute");
        _;
    }
    
    function governTransfer(address from, address to, uint256 amount) public onlyGovern {
        _transfer(from, to, amount);
    }

     constructor(string memory name_, string memory symbol_, address governAddress_) KIP7() public {
        _name = name_;
        _symbol = symbol_;
        _governAddress = governAddress_;
        _mint(msg.sender, 100e18);
    }
}