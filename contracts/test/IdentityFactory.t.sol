// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import {Test} from "forge-std/Test.sol";
import {IdentityFactory} from "../src/onchainID/IdentityFactory.sol";
import {ClaimManager} from "../src/onchainID/ClaimManager.sol";
import {Identity} from "../src/onchainID/Identity.sol";

contract IdentityFactoryTest is Test {
    IdentityFactory public identityFactory;
    ClaimManager public claimManager;
    address public admin = address(1);
    address public user = address(2);
    address public issuer = address(3);

    
    function setUp() public {
        vm.startPrank(admin);
        claimManager = new ClaimManager();
        identityFactory = new IdentityFactory(address(claimManager));
        vm.stopPrank();
    }
    
    function testCreateIdentity() public {
        vm.startPrank(admin);
        identityFactory.createIdentity(user);
        vm.stopPrank();
        
        address identityAddress = identityFactory.getIdentity(user);
        assertNotEq(identityAddress, address(0));
        
        Identity identity = Identity(identityAddress);
        assertTrue(identity.hasRole(identity.IDENTITY_ADMIN(), user));
    }
    
    function testCreateDuplicateIdentity() public {
        vm.startPrank(admin);
        identityFactory.createIdentity(user);
        
        vm.expectRevert("IdentityFactory: Identity already exists");
        identityFactory.createIdentity(user);
        vm.stopPrank();
    }
    
    function testOnlyIssuerCanCreateIdentity() public {
        vm.startPrank(user);
        vm.expectRevert();
        identityFactory.createIdentity(user);
        vm.stopPrank();
    }
    
    function testLinkWallet() public {
        vm.startPrank(admin);
        identityFactory.createIdentity(user);
        address identityAddress = identityFactory.getIdentity(user);
        
        address newWallet = address(4);
        Identity identity = Identity(identityAddress);
        
        // Grant IDENTITY_ADMIN role to the newWallet
        vm.startPrank(user);
        identity.grantRole(identity.IDENTITY_ADMIN(), newWallet);
        vm.stopPrank();
        
        // Now link the wallet
        vm.startPrank(admin);
        identityFactory.linkWallet(identityAddress, newWallet);
        vm.stopPrank();
        
        // Verify the wallet is linked
        assertEq(identityFactory.getIdentity(newWallet), identityAddress);
    }
    
    function testLinkWalletWithoutPermission() public {
        vm.startPrank(admin);
        identityFactory.createIdentity(user);
        address identityAddress = identityFactory.getIdentity(user);
        
        address newWallet = address(4);
        // Trying to link a wallet that doesn't have IDENTITY_ADMIN role should fail
        vm.expectRevert("IdentityFactory: Wallet must have IDENTITY_ADMIN role");
        identityFactory.linkWallet(identityAddress, newWallet);
        vm.stopPrank();
    }
} 