// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

// This contract is in charge of managing who can issue claims, wich claims they can issue and what claims are valid
interface IClaimManager {
    event ClaimIssuerAdded(address indexed issuer, uint256[] possibleClaims);
    event ClaimIssuerRemoved(address indexed issuer);

    /**
     * @dev Add a claim issuer
     * @param _issuer The issuer address
     * @param _possibleClaims The possible claims the issuer can issue
     */
    function addClaimIssuer(address _issuer, uint256[] calldata _possibleClaims) external;

    /**
     * @dev Remove a claim issuer
     * @param _issuer The issuer address
     */
    function removeClaimIssuer(address _issuer) external;

    /**
     * @dev Check if a claim is valid
     * @param _issuer The issuer address
     * @param _claim The claim ID
     * @return bool True if the claim is valid
     */
    function isValidClaim(address _issuer, uint256 _claim) external view returns (bool);

}