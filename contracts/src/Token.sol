// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {Gorra} from "./onchainID/Gorra.sol";

contract Token is ERC20, Gorra {

    string[] public images;
    string public json;

    constructor(
        address _identityFactory, 
        address _tokenCompliance,
        string[] memory _images,
        string memory _json
    ) 
    ERC20("ExampleToken", "EXT")
    Gorra(_identityFactory, _tokenCompliance) {
        images = _images;
        json = _json;
    }

    function _update(address from, address to, uint256 value) internal virtual override(ERC20, Gorra) {
        super._update(from, to, value);
    }

    function getImages() public view returns (string[] memory) {
        return images;
    }

    function getJson() public view returns (string memory) {
        return json;
    }
}