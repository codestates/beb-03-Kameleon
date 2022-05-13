pragma solidity ^0.5.0;

import "./KIP7.sol";

contract MyKIP7 is KIP7 {
    string private _name;
    string private _symbol;

    function name() public view returns (string memory) {
        return _name;
    }

    function symbol() public view returns (string memory) {
        return _symbol;
    }

     constructor(string memory name_, string memory symbol_) KIP7() public {
        _name = name_;
        _symbol = symbol_;
        _mint(msg.sender, 100e18);
    }
}