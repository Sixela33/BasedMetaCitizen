// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

interface ITokenCompliance {
    function canTransfer(address _fromIdentity, address _toIdentity, uint256 _amount) external view returns (bool);
    function tokensTransfered(address _fromIdentity, address _toIdentity, uint256 _amount) external;
}