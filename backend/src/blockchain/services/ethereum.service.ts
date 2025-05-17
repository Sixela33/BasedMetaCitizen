import { Injectable, Logger } from '@nestjs/common';
import { ethers } from 'ethers';

// Import ABIs
import IdentityFactoryABI from '../../abis/IdentityFactory.json';
import IdentityABI from '../../abis/Identity.json';
import ClaimManagerABI from '../../abis/ClaimManager.json';
import TokenFactoryABI from '../../abis/TokenFactory.json';
import TokenComplianceABI from '../../abis/TokenCompliance.json';
import TokenABI from '../../abis/Token.json';

import { IdentityService } from './Identity.service';
import { DeployTokenDto } from '../dto/DeployToken.dto';

@Injectable()
export class EthereumService {
    private provider: ethers.Provider;
    private signer: ethers.Signer;
    private managedSigner: ethers.NonceManager;
    private identityFactoryAddress: string;
    private identityService: IdentityService;

    async onModuleInit() {
        const rpcUrl = process.env.BLOCKCHAIN_RPC_URL;
        const privateKey = process.env.BLOCKCHAIN_PRIVATE_KEY;
        const identityFactoryAddress = process.env.IDENTITY_FACTORY_ADDRESS;

        if(!privateKey) {
            throw new Error('BLOCKCHAIN_PRIVATE_KEY is not set');
        }
        if(!rpcUrl) {
            throw new Error('BLOCKCHAIN_RPC_URL is not set');
        }
        if(!identityFactoryAddress) {
            throw new Error('IDENTITY_FACTORY_ADDRESS is not set');
        }

        this.provider = new ethers.JsonRpcProvider(rpcUrl);
        
        // Initialize signer with private key from configuration
        this.signer = new ethers.Wallet(privateKey, this.provider);
        
        // Create a NonceManager to handle nonces automatically
        this.managedSigner = new ethers.NonceManager(this.signer);

        this.identityFactoryAddress = identityFactoryAddress;

    }

    getIdentityFactoryAddress() {
        return this.identityFactoryAddress;
    }

    // Get contract instances with managed signer
    private getIdentityFactoryContract() {
        return new ethers.Contract(this.identityFactoryAddress, IdentityFactoryABI.abi, this.managedSigner);
    }

    private getIdentityContract(contractAddress: string) {
        return new ethers.Contract(contractAddress, IdentityABI.abi, this.managedSigner);
    }

    private getClaimManagerContract(contractAddress: string) {
        return new ethers.Contract(contractAddress, ClaimManagerABI.abi, this.managedSigner);
    }

    private getTokenFactoryContract(contractAddress: string) {
        return new ethers.Contract(contractAddress, TokenFactoryABI.abi, this.managedSigner);
    }

    private getTokenComplianceContract(contractAddress: string) {
        return new ethers.Contract(contractAddress, TokenComplianceABI.abi, this.managedSigner);
    }

    private getTokenContract(contractAddress: string) {
        return new ethers.Contract(contractAddress, TokenABI.abi, this.managedSigner);
    }

    /**
     * Create a new identity for a user that passed KYC and AML checks
     */
    async createIdentity(userAddress: string) {
        const identityFactory = this.getIdentityFactoryContract();
        console.log(userAddress)
        const tx = await identityFactory.createIdentity(userAddress);
        await tx.wait();
        
        // Return the identity address
        return await identityFactory.getIdentity(userAddress);
    }

    /**
     * Get a user's identity address
     */
    async getIdentity(userAddress: string) {
        const identityFactory = this.getIdentityFactoryContract();
        return await identityFactory.getIdentity(userAddress);
    }

    /**
     * Add a claim to a user's identity
     */
    async addClaim(
        identityAddress: string, 
        claimId: number, 
        claimData?: string
    ) {
        const identity = this.getIdentityContract(identityAddress);
        const tx = await identity.addClaim(claimId, claimData);
        return await tx.wait();
    }

    /**
     * Remove a claim from a user's identity
     */
    async removeClaim(
        identityAddress: string, 
        claimId: number
    ) {
        const identity = this.getIdentityContract(identityAddress);
        const tx = await identity.removeClaim(claimId);
        return await tx.wait();
    }

    /**
     * Check if a user's identity has a specific claim
     */
    async hasClaim(
        identityAddress: string, 
        claimId: number
    ): Promise<boolean> {
        const identity = this.getIdentityContract(identityAddress);
        return await identity.hasClaim(claimId);
    }

    /**
     * Add a claim issuer to the system
     */
    async addClaimIssuer(
        claimManagerAddress: string,
        issuerAddress: string,
        possibleClaims: number[]
    ) {
        const claimManager = this.getClaimManagerContract(claimManagerAddress);
        const tx = await claimManager.addClaimIssuer(issuerAddress, possibleClaims);
        return await tx.wait();
    }

    /**
     * Remove a claim issuer from the system
     */
    async removeClaimIssuer(
        claimManagerAddress: string,
        issuerAddress: string
    ) {
        const claimManager = this.getClaimManagerContract(claimManagerAddress);
        const tx = await claimManager.removeClaimIssuer(issuerAddress);
        return await tx.wait();
    }

    /**
     * Link a wallet to an existing identity
     */
    async linkWallet(
        identityAddress: string,
        walletAddress: string,
    ) {
        const identityFactory = this.getIdentityFactoryContract();
        const identity = await this.getIdentity(identityAddress);
        if (!identity) {
            throw new Error('Identity not found');
        }
        const tx = await identityFactory.linkWallet(identityAddress, walletAddress);
        this.identityService.linkWallet(identity, walletAddress);
        return await tx.wait();
    }

    /**
     * Check if a claim issuer is allowed to issue a specific claim
     */
    async isValidClaim(
        claimManagerAddress: string,
        issuerAddress: string, 
        claimId: number
    ): Promise<boolean> {
        const claimManager = this.getClaimManagerContract(claimManagerAddress);
        return await claimManager.isValidClaim(issuerAddress, claimId);
    }

    async getIdentityFromUser(userAddress: string) {
        const identityFactory = this.getIdentityFactoryContract();
        return await identityFactory.getIdentity(userAddress);
    }

    async deployFactory(requiredClaims: string[], transferComplianceModules: string[]): Promise<string> {
        try {
            console.log("Deploying factory with claims:", requiredClaims);
            console.log("And modules:", transferComplianceModules);

            // Convertir los claims de string a números (asumiendo que "KYC" = 1)
            const numericClaims = requiredClaims.map(claim => {
                switch(claim) {
                    case "KYC": return 1;
                    default: return 0;
                }
            });

            // Convertir los módulos a direcciones (asumiendo que "Chainalysis" tiene una dirección específica)
            const moduleAddresses = transferComplianceModules.map(module => {
                switch(module) {
                    case "Chainalysis": return "0x0000000000000000000000000000000000000000"; // Reemplazar con la dirección real
                    default: return "0x0000000000000000000000000000000000000000";
                }
            });

            console.log("Numeric claims:", numericClaims);
            console.log("Module addresses:", moduleAddresses);

            const tokenFactory = new ethers.ContractFactory(TokenFactoryABI.abi, TokenFactoryABI.bytecode, this.signer);
            const factory = await tokenFactory.deploy(this.identityFactoryAddress, numericClaims, moduleAddresses);
            const deployedFactory = await factory.waitForDeployment();
            const address = await deployedFactory.getAddress();
            console.log("Factory deployed at:", address);
            return address;
        } catch (error) {
            console.error("Error deploying factory:", error);
            throw error;
        }
    }

    async deployTokenCompliance(requiredClaims: number[], transferComplianceModules: string[]): Promise<string> {
        const tokenCompliance = new ethers.ContractFactory(TokenComplianceABI.abi, TokenComplianceABI.bytecode, this.signer);
        const compliance = await tokenCompliance.deploy('0x0000000000000000000000000000000000000000', requiredClaims, transferComplianceModules);
        return (await compliance.waitForDeployment()).getAddress();
    }

    async deployToken(factoryAddress: string, deployTokenDto: DeployTokenDto): Promise<string> {
        /**
         * Deploy a token to the blockchain and set the token compliance contract address
        */
        const tokenFactory = this.getTokenFactoryContract(factoryAddress);
        const tx = await tokenFactory.deployToken(deployTokenDto.fileUris, deployTokenDto.jsonUri);
        
        // Wait for transaction to be mined
        const receipt = await tx.wait();
        
        // Get the token address from the transaction logs
        // The deployToken function in the contract returns the token address
        const tokenAddress = await tokenFactory.deployToken.staticCall(
            deployTokenDto.fileUris, 
            deployTokenDto.jsonUri
        );
        console.log("tokenAddress", tokenAddress)
        
        return tokenAddress;
    }
}
