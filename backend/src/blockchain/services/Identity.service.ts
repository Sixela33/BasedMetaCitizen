import { Injectable } from "@nestjs/common";
import { Identity } from "../entities/identity.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/user/entities/user.entity";
import { Wallet } from "../entities/wallets.entity";

@Injectable()
export class IdentityService {
    constructor(
        @InjectRepository(Identity)
        private readonly identityRepository: Repository<Identity>,
        @InjectRepository(Wallet)
        private readonly walletRepository: Repository<Wallet>
    ) {}

    async createIdentity(user: User, identityAddress: string) {
        const identity = this.identityRepository.create({
            user: user,
            createdAt: new Date(),
            address: identityAddress
        });
        await this.identityRepository.save(identity);
        return identity;
    }

    async linkWallet(identity: Identity, walletAddress: string) {

        const wallet = this.walletRepository.create({
            address: walletAddress,
            createdAt: new Date(),
            identity: identity
        });
        
        await this.walletRepository.save(wallet);
        return wallet;
    }

    async getIdentityByAddress(address: string) {
        return this.identityRepository.findOne({ where: { address: address } });
    }

    async getIdentityByUser(user: User) {
        return this.identityRepository.findOne({ where: { user: user } });
    }


}