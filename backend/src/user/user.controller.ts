import {
  Controller,
  Get,
  Post,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { PrivyGuard } from 'src/auth/guards/privy.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  
  @UseGuards(PrivyGuard)
  @Post('api-keys')
  createApiKey(@Req() req) {
    return this.userService.createApiKey(req.user);
  }

  @Get('api-keys')
  getApiKeys(@Req() req) {
    return this.userService.getApiKeys(req.user);
  }

  @UseGuards(PrivyGuard)
  @Get('profile')
  getProfile(@Req() req) {
    return this.userService.findOne(req.user.id);
  }
}
