import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { BlockchainService } from './services/blockchain.service';
import { PrivyGuard } from 'src/auth/guards/privy.guard';
@Controller('blockchain')
export class BlockchainController {
    constructor(private readonly blockchainService: BlockchainService) {}

    @UseGuards(PrivyGuard)
    @Get('get-identity')
    async getIdentity(@Request() req: any) {
        const user = req.user;
        return this.blockchainService.getOrCreateIdentity(user.id, user);
    }

    @UseGuards(PrivyGuard)
    @Post('link-wallet')
    async linkWallet(@Request() req: any, @Body() body: { walletAddress: string }) {
        const user = req.user;
        const { walletAddress } = body;
        return this.blockchainService.linkWallet(user, walletAddress);
    }
}
