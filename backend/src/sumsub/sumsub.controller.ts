import { Controller, Get, Query, Request, UseGuards } from '@nestjs/common';
import { SumsubService } from './services/sumsub.service';
import { PrivyGuard } from 'src/auth/guards/privy.guard';

@Controller('sumsub')
export class SumsubController {
  constructor(private readonly sumsubService: SumsubService) {}

  @UseGuards(PrivyGuard)
  @Get('access-token')
  async getAccessToken(@Request() req: any) {
    const user = req.user;
    
    const accessToken = await this.sumsubService.generateAccessToken(user.id, 'id-and-liveness', 600);
        
    return accessToken;
  }
  
  @UseGuards(PrivyGuard)
  @Get('kyc-status')
  async getKycStatus(@Request() req: any) {
    const user = req.user;
    const applicantData = await this.sumsubService.getApplicantData(user.id);
    return applicantData
  }
}
