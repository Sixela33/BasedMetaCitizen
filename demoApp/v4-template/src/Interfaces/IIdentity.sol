// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

// This contract is where the identity claims are pointed to
interface IIdentity {
    struct Claims {
        address issuer;
        uint256 claim;
        string data;
    }

    /**
     * @dev Add a claim to the identity
     * @param _claim Claim ID
     * @param _data Claim data
     */
    function addClaim(uint256 _claim, string calldata _data) external;
    
    /**
    * @dev Remove a claim from the identity
    * @param _claim Claim ID
    */
    function removeClaim(uint256 _claim) external;
    
    /**
     * @dev Checks if the identity has a claim
     * @param _claim Claim ID
     * @return bool True if the identity has the claim
     */
    function hasClaim(uint256 _claim) external view returns (bool);

    /**
    * @dev Emitted when a zero-knowledge proof is successfully verified.
    * Can be used to trigger off-chain indexing, frontend feedback,
    * or automated claim verification logic.
    *
    * @param user The address that submitted the proof
    * @param claimId The claim ID that was proven via zk-SNARK
    */
    event ZkProofVerified(address indexed user, uint indexed claimId);
}