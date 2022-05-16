pragma solidity ^0.5.6;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Govern.sol";
import "../contracts/MyKIP7.sol";

contract TestGovern {

    function testGovern() public {
        // DeployedAddresses.KlaytnGreeter()는 컨트랙트 주소를 다룹니다.
        Govern govern = Govern(DeployedAddresses.Govern());
        MyKIP7 myKIP7 = MyKIP7(DeployedAddresses.MyKIP7());

        govern.setToken(DeployedAddresses.MyKIP7());
        myKIP7.setGovernAddress(DeployedAddresses.Govern());
        Assert.equal(1000, govern.getPollCreationFee(), "getPollCreationFee === 1000");

        // Govern.createPoll("title", "content", 3);
        // String temp = Govern.pollState(0);
        // Assert.equal(temp, "asdf", "create poll");
    }
}