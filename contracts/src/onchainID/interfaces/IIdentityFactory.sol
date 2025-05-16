// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

// This contract is in charge of issuing identities, assigning them to wallets and managing the claims
interface IIdentityFactory {
    event IdentityCreated(address indexed identityUser, address indexed identityAddress);

    /**
     * @dev Create a new identity
     * @param user The user address
     */
    function createIdentity(address user) external;
    
    /**
     * @dev Get the identity address for a user
     * @param identityUser The user address
     * @return address The identity address
     */
    function getIdentity(address identityUser) external view returns (address);
    
    /**
     * @dev Link wallet to identity
     * @param identity The identity address
     * @param wallet The wallet address
     */
    function linkWallet(address identity, address wallet) external;

}