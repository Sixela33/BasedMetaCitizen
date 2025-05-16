// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import {IClaimManager} from "./interfaces/IClaimManager.sol";
import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";

contract ClaimManager is IClaimManager {
    // This mapping determinates who can issue claims
    mapping(address => bool) public activeClaimIssuers;
    /*
    * issuer => claim => bool
    * This mapping determinates who can issue wich claims
    */
    mapping(address => mapping(uint256 => bool)) public possibleClaims;

    /**
     * @dev Add a claim issuer
     * @param _issuer The issuer address
     * @param _possibleClaims The possible claims the issuer can issue
     */
    function addClaimIssuer(address _issuer, uint256[] calldata _possibleClaims) external {
        activeClaimIssuers[_issuer] = true;
        for(uint256 i = 0; i < _possibleClaims.length ; i++) {
            possibleClaims[_issuer][_possibleClaims[i]] = true;
        }

        emit ClaimIssuerAdded(_issuer, _possibleClaims);
    }

    /**
     * @dev Remove a claim issuer
     * @param _issuer The issuer address
     */
    function removeClaimIssuer(address _issuer) external {
        activeClaimIssuers[_issuer] = false;
        emit ClaimIssuerRemoved(_issuer);
    }

    /**
     * @dev Check if a claim is valid
     * @param _issuer The issuer address
     * @param _claim The claim ID
     * @return bool True if the claim is valid
     */
    function isValidClaim(address _issuer, uint256 _claim) external view returns (bool) {
        return activeClaimIssuers[_issuer] && possibleClaims[_issuer][_claim];
    }
}
