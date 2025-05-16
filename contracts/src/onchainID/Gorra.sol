// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {IIdentityFactory} from "./interfaces/IIdentityFactory.sol";
import {ITokenCompliance} from "./interfaces/ITokenCompliance.sol";
import {IGorra} from "./interfaces/IGorra.sol";

abstract contract Gorra is IGorra, ERC20 {

    IIdentityFactory public identityFactory;
    ITokenCompliance public tokenCompliance;

    constructor(address _identityFactory, address _tokenCompliance) {
        identityFactory = IIdentityFactory(_identityFactory);
        tokenCompliance = ITokenCompliance(_tokenCompliance);
    }

    function setIdentityFactory(address _identityFactory) external override {
        require(_identityFactory != address(0), "Gorra: Invalid identity factory address");
        identityFactory = IIdentityFactory(_identityFactory);
    }

    function setTokenCompliance(address _tokenCompliance) external override {
        require(_tokenCompliance != address(0), "Gorra: Invalid token compliance address");
        tokenCompliance = ITokenCompliance(_tokenCompliance);
    }

    function _update(address from, address to, uint256 value) internal virtual override {
        address toIdentity = identityFactory.getIdentity(to);
        address fromIdentity = identityFactory.getIdentity(from);

        require(toIdentity != address(0), GorraInvalidIdentity(toIdentity));
        require(fromIdentity != address(0), GorraInvalidIdentity(fromIdentity));

        require(tokenCompliance.canTransfer(fromIdentity, toIdentity, value), GorraTransferNotAllowed());
        
        super._update(from, to, value);

        tokenCompliance.tokensTransfered(fromIdentity, toIdentity, value);
    }
    
}