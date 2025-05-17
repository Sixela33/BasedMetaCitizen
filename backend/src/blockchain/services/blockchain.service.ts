import { Injectable } from "@nestjs/common";
import { EthereumService } from "./ethereum.service";
import { User } from "src/user/entities/user.entity";
import { IdentityService } from "./Identity.service";
import { DeployTokenDto } from "../dto/DeployToken.dto";

@Injectable()
export class BlockchainService {
    constructor(
        private readonly ethereumService: EthereumService,
        private readonly identityService: IdentityService
    ) {}

    async getOrCreateIdentity(userAddress: string, user: User): Promise<string> {
        const identity = await this.ethereumService.getIdentity(userAddress)
        if (identity !== "0x0000000000000000000000000000000000000000") {
            return identity
        }
        console.log("identity",identity)
        const newIdentity = await this.ethereumService.createIdentity(userAddress)
        console.log("newIdentity",newIdentity)
        const dbIdentity = await this.identityService.createIdentity(user, newIdentity)
        console.log("dbIdentity",dbIdentity)

        await this.ethereumService.addClaim(newIdentity, 1, undefined)
        console.log("newIdentity",newIdentity)
        return newIdentity
    }

    async linkWallet(user: User, walletAddress: string) {
        const identity = await this.getOrCreateIdentity(walletAddress, user)
        return this.ethereumService.linkWallet(identity, walletAddress)
    }

    async deployFactory(requiredClaims: string[], transferComplianceModules: string[]): Promise<string> {
        if(!requiredClaims) requiredClaims = []
        if(!transferComplianceModules) transferComplianceModules = []
        const response = await this.ethereumService.deployFactory(requiredClaims, transferComplianceModules);
        return response;
    }

    async deployToken(factoryAddress: string, deployTokenDto: DeployTokenDto): Promise<string> {
        console.log(deployTokenDto)
        const response = await this.ethereumService.deployToken(factoryAddress, deployTokenDto);
        console.log(response)
        return response;
    }

    
}