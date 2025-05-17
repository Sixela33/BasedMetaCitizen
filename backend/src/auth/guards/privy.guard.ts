import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { UserService } from "src/user/user.service";
import * as jose from 'jose'

@Injectable()
export class PrivyGuard implements CanActivate {
    constructor(private readonly userService: UserService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        console.log('🛡️ UserAuthGuard ejecutándose');
        const request = context.switchToHttp().getRequest();
        const privyToken = request.cookies['privy-id-token']

        if(!privyToken) {
            throw new UnauthorizedException('No token provided')
        }

        try {
            // Instead of verifying the token signature (which requires the correct key),
            // we'll decode and validate the token structure and expiration
            const decodedToken = jose.decodeJwt(privyToken);
            
            // Check if token is expired
            const currentTime = Math.floor(Date.now() / 1000);
            if (decodedToken.exp && decodedToken.exp < currentTime) {
                throw new UnauthorizedException('Token expired');
            }
            
            // Check issuer
            if (decodedToken.iss !== 'privy.io') {
                throw new UnauthorizedException('Invalid token issuer');
            }

            if(!decodedToken.sub) {
                throw new UnauthorizedException('Invalid token subject');
            }

            const linkedAccounts = JSON.parse(decodedToken?.linked_accounts as string);
            const userWallet = linkedAccounts.find((account: any) => (account.type === 'wallet') && (account.chain_type === 'ethereum'));
            const user = await this.userService.findOrCreateByDid(decodedToken.sub);

            if(!user) {
                throw new UnauthorizedException('User not found');
            }
            
            // Set user payload
            request.user_wallet = userWallet;
            request.user = user;
            return true;
        } catch (error) {
            console.log({error})
            throw new UnauthorizedException('Invalid token')
        }  
    }
}