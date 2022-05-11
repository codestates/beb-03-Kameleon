pragma solidity ^0.5.0;

import "./KIP7.sol";

contract MyKIP7 is KIP7 {
     constructor() KIP7() public {
        _mint(msg.sender, 10000000000000);
    }
}