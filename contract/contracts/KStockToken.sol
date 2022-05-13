pragma solidity ^0.5.0;

import "./KIP7.sol";
import "./Ownable.sol";

contract KStockToken is KIP7, Ownable {
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

     constructor(string memory name_, string memory symbol_) KIP7() public {
        _name = name_;
        _symbol = symbol_;
        // _mint(msg.sender, 100e18);
    }

    function mint(address recipient, uint256 amount) public onlyOwner {
        _mint(recipient, amount);
    }

    function burn(address recipient, uint256 amount) public onlyOwner {
        _burn(recipient, amount);
    }
}