// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import {IComplianceModule} from "./interfaces/IComplianceModule.sol";
import {IIdentity} from "./interfaces/IIdentity.sol";
import {ITokenCompliance} from "./interfaces/ITokenCompliance.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract TokenCompliance is ITokenCompliance, Ownable {

    uint256[] public requiredClaims;
    address[] public transferComplianceModules;
    address public token;

    modifier onlyToken() {
        require(msg.sender == token, "TokenCompliance: Only the token can call this function");
        _;
    }

    constructor(
        address _token, 
        uint256[] memory _requiredClaims, 
        address[] memory _transferComplianceModules
    ) 
    Ownable(msg.sender) {
        token = _token;
        requiredClaims = _requiredClaims;
        transferComplianceModules = _transferComplianceModules;
    }


    /**
     * @dev Notify the compliance modules that a transfer has been made so they can update their state
     * @param _fromIdentity The sender identity address
     * @param _toIdentity The reciever identity address
     * @param _amount The amount to transfer
     */
    function tokensTransfered(address _fromIdentity, address _toIdentity, uint256 _amount) external onlyToken {
        for(uint256 i = 0; i < transferComplianceModules.length; i++) {
            IComplianceModule module = IComplianceModule(transferComplianceModules[i]);
            module.tokensTransfered(_fromIdentity, _toIdentity, _amount);
        }
    }

    /**
     * @dev Check if a transfer can be made
     * This function checks the identity of the sender and checks if the transfer is allowed
     * @param _fromIdentity The sender identity address
     * @param _toIdentity The reciever identity address
     * @param _amount The amount to transfer
     */
    function canTransfer(address _fromIdentity, address _toIdentity, uint256 _amount) public view onlyToken returns (bool) {
        IIdentity fromIdentity = IIdentity(_fromIdentity);
        IIdentity toIdentity = IIdentity(_toIdentity);

        // Checking each compliance module if the transfer is allowed
        for(uint256 i = 0; i < transferComplianceModules.length; i++) {
            IComplianceModule module = IComplianceModule(transferComplianceModules[i]);
            if(!module.canTransfer(_fromIdentity, _toIdentity, _amount)) {
                return false;
            }
        }

        // Checking if both reciever and sender have the required claims
        for (uint256 i = 0; i < requiredClaims.length; i++) {
            if(!fromIdentity.hasClaim(requiredClaims[i])|| !toIdentity.hasClaim(requiredClaims[i])) {
                return false;
            }
        }
        return true;
    }

    function setToken(address _token) external onlyOwner {
        token = _token;
    }
}