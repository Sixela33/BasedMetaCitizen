// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import {IIdentityFactory} from "./interfaces/IIdentityFactory.sol";
import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";
import {Identity} from "./Identity.sol";
import {IClaimManager} from "./interfaces/IClaimManager.sol";

contract IdentityFactory is IIdentityFactory, AccessControl {
    bytes32 public constant ISSUER_ROLE = keccak256("ISSUER_ROLE");
    bytes32 public constant TOKEN_FACTORY_ROLE = keccak256("TOKEN_FACTORY_ROLE");
    
    mapping(address => address) public identityByUser;

    IClaimManager public claimManager;

    constructor(address _claimManager) {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(ISSUER_ROLE, msg.sender);

        claimManager = IClaimManager(_claimManager);
    }

    /**
     * @dev Link wallet to identity
     * @param identity The identity address
     * @param wallet The wallet address
     */
    function linkWallet(address identity, address wallet) external {
        Identity _identity = Identity(identity);
        require(address(identity) != address(0), "IdentityFactory: Identity does not exist");

        require(_identity.hasRole(_identity.IDENTITY_ADMIN(), msg.sender), "IdentityFactory: Wallet must have IDENTITY_ADMIN role");

        identityByUser[wallet] = address(identity);
    }

    /**
     * @dev Create a new identity
     * @param user The user address
     */
    function createIdentity(address user) external onlyRole(ISSUER_ROLE) {
        require(identityByUser[user] == address(0), "IdentityFactory: Identity already exists");

        Identity newIdentity = new Identity(address(claimManager), user);
        identityByUser[user] = address(newIdentity);

        emit IdentityCreated(user, address(newIdentity));
    }

    /**
     * @dev Get the identity address for a user
     * @param identityUser The user address
     * @return address The identity address
     */
    function getIdentity(address identityUser) external view returns (address) {
        return identityByUser[identityUser];
    }

}