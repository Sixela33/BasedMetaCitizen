// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import {Token} from "../Token.sol";
import {TokenCompliance} from "../onchainID/TokenCompliance.sol";
import {IdentityFactory} from "../onchainID/IdentityFactory.sol";

contract TokenFactory {

    address public identityFactory;
    uint256[] public requiredClaims;
    address[] public transferComplianceModules;

    constructor(address _identityFactory, uint256[] memory _requiredClaims, address[] memory _transferComplianceModules) {
        identityFactory = _identityFactory;
        requiredClaims = _requiredClaims;
        transferComplianceModules = _transferComplianceModules;
    }

    function deployToken(string[] memory images, string memory json) public returns (address) {
        TokenCompliance tokenCompliance = new TokenCompliance(address(0), requiredClaims, transferComplianceModules);
        Token token = new Token(identityFactory, address(tokenCompliance), images, json);
        //IdentityFactory(identityFactory).createIdentity(address(token));
        return address(token);
    }
}