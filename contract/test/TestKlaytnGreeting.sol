pragma solidity ^0.5.6;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/KlaytnGreeter.sol";

contract TestKlaytnGreeter {

    // function testGreetingMessage() public {
    //     // DeployedAddresses.KlaytnGreeter()는 컨트랙트 주소를 다룹니다.
    //     KlaytnGreeter greeter = KlaytnGreeter(DeployedAddresses.KlaytnGreeter());

    //     string memory expectedGreet = "Hello Klaytn";

    //     string memory greet = greeter.greet();

    //     Assert.equal(greet, expectedGreet, "greeting message should match");
    // }
    function testGreetingMessage() public {
            KlaytnGreeter greeter = new KlaytnGreeter();
            string memory greet = greeter.greet();
            Assert.equal(greet, "Hello Klaytn", "greeting message should match");
    }
}