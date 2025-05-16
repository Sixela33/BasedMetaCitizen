// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import {IIdentity} from "./interfaces/IIdentity.sol";
import {IClaimManager} from "./interfaces/IClaimManager.sol";
import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/*
* @title Identity
* @dev This contract is the implementation of the identity contract that holds the identity claims 
*/
contract Identity is IIdentity, AccessControl, ReentrancyGuard {
    bytes32 public constant IDENTITY_ADMIN = keccak256("IDENTITY_ADMIN");
    uint256 public constant MAX_CLAIMS = 4;

    IClaimManager public claimManager;

    // Mapping of claims by claim ID
    mapping(uint256 => Claims[]) public claims;

    /**
     * @dev Modifier to only allow valid claim issuers to issue claims
     * @param _claim Claim ID
     */
    modifier onlyValidClaimIssuer(uint256 _claim) {
        require(claimManager.isValidClaim(msg.sender, _claim), "Identity: Not a valid claim issuer");
        _;
    }

    constructor(address _claimManager, address _admin) {
        claimManager = IClaimManager(_claimManager);
        _grantRole(IDENTITY_ADMIN, _admin);
        _grantRole(DEFAULT_ADMIN_ROLE, _admin);
    }

    /**
     * @dev Add a claim to the identity
     * @param _claim Claim ID
     * @param _data Claim data
     */
    function addClaim(uint256 _claim, string calldata _data) external nonReentrant onlyValidClaimIssuer(_claim) {
        require(!_identityHasClaimFromIssuer(_claim, msg.sender), "Identity: Claim already issued by this issuer");
        require(claims[_claim].length < MAX_CLAIMS, "Identity: Maximum claims of type reached");

        claims[_claim].push(Claims(msg.sender, _claim, _data)); 
    }

    /**
     * @dev Remove a claim from the identity
     * @param _claim Claim ID
     */
    function removeClaim(uint256 _claim) external nonReentrant onlyValidClaimIssuer(_claim) {
        Claims[] storage _claims = claims[_claim];
        
        for(uint256 i = 0; i < _claims.length; i++) {
            if(_claims[i].issuer == msg.sender) {
                _claims[i] = _claims[_claims.length - 1];
                _claims.pop();
                break;
            }
        }
    }

    /**
     * @dev Checks if the identity has a claim
     * @param _claim Claim ID
     * @return bool True if the identity has the claim
     */
    function hasClaim(uint256 _claim) external view returns (bool) {
        Claims[] storage _claims = claims[_claim];
        
        uint256 length = _claims.length;
        if (length == 0) return false;
    
        /** 
         * Limitar el número de iteraciones para evitar gas limit 
         * (this might be useless because there is a limit in the amount of claims per type)
        */
        uint256 maxIterations = length > 100 ? 100 : length;

        for(uint256 i = 0; i < maxIterations; i++) {
            if(claimManager.isValidClaim(_claims[i].issuer, _claim)) {
                return true;
            }
        }

        return false;
    }

    /**
     * @dev get if an issuer has emited a claim on this identity to prevent double claims 
     */
    function _identityHasClaimFromIssuer(uint256 _claim, address _issuer) internal view returns (bool) {
        Claims[] storage _claims = claims[_claim];
        
        for(uint256 i = 0; i < _claims.length; i++) {
            if(_claims[i].issuer == _issuer) {
                return true;
            }
        }

        return false;
    }



}