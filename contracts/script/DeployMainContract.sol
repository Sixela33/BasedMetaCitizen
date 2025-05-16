// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {Script} from "forge-std/Script.sol";
import {IdentityFactory} from "../src/onchainID/IdentityFactory.sol";
import {ClaimManager} from "../src/onchainID/ClaimManager.sol";

contract DeployMainContract is Script {

    function run() public {
        vm.startBroadcast();

        ClaimManager claimManager = new ClaimManager();

        new IdentityFactory(address(claimManager));

        vm.stopBroadcast();
    }

}
