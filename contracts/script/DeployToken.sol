// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {Script} from "forge-std/Script.sol";
import {Token} from "../src/Token.sol";
import {TokenCompliance} from "../src/onchainID/TokenCompliance.sol";

contract DeployToken is Script {
    uint256[] public requiredClaims = [1];
    address[] public transferComplianceModules;
    address public claimManager = 0x555b56DDBe70E95bf797Cc7d906Dd9fFBb803d0d;

    function run() public {
        vm.startBroadcast();

        requiredClaims = new uint256[](1);
        requiredClaims[0] = 1;

        TokenCompliance tokenCompliance = new TokenCompliance(
            address(0),
            requiredClaims, 
            transferComplianceModules
        );

        string[] memory images = new string[](1);   
        images[0] = "https://example.com/images";

        Token token = new Token(
            address(claimManager),
            address(tokenCompliance),
            images,
            "https://example.com/json"
        );

        tokenCompliance.setToken(address(token));
        vm.stopBroadcast();
    }
}