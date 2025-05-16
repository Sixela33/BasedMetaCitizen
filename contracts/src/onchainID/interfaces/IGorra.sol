// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.22;

interface IGorra {
    error GorraTransferNotAllowed();
    error GorraInvalidIdentity(address userIdentity);
    function setIdentityFactory(address _identityFactory) external;
    function setTokenCompliance(address _tokenCompliance) external;
}