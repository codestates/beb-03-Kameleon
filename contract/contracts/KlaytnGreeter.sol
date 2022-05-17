// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.5.6;
contract Mortal {
    /* Define variable owner of the type address */
    address payable owner;
    /* This function is executed at initialization and sets the owner of the contract */
    constructor () public { owner = msg.sender; }
    /* Function to recover the funds on the contract */
    function kill() public payable { if (msg.sender == owner) selfdestruct(owner); }
}

contract KlaytnGreeter is Mortal {
    /* Define variable greeting of the type string */
    string greeting = "Hello, Klaytn";
    /* This runs when the contract is executed */
    constructor () public {

    }
    /* Main function */
    function greet() public view returns (string memory) {
        return greeting;
    }
}