// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.22;

interface IComplianceModule {
    function addModule(address moduleAddress) external;
    function removeModule(address moduleAddress) external;
    function canTransfer(address _from,address _to,uint256 _amount) external view returns (bool);
    function tokensTransfered(address _from, address _to, uint256 _amount) external;
}