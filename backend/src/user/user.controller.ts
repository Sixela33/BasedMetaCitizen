import {
  Controller,
  Get,
  Post,
  UseGuards,
  Req,
  Body,
  Delete,
  Param,
  Patch,
} from '@nestjs/common';
import { UserService } from './user.service';
import { PrivyGuard } from 'src/auth/guards/privy.guard';
import { CreateApiKeyDto, UpdateApiKeyDto } from './dto/apiKey.dto';
import { ApiKeysService } from './apiKeys.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly apiKeysService: ApiKeysService,
  ) {}
  
  @UseGuards(PrivyGuard)
  @Post('api-keys')
  createApiKey(@Req() req, @Body() createApiKeyDto: CreateApiKeyDto) {
    return this.apiKeysService.createApiKey(req.user, createApiKeyDto);
  }

  @UseGuards(PrivyGuard)
  @Get('profile')
  getProfile(@Req() req) {
    return this.userService.findOne(req.user.id);
  }

  @UseGuards(PrivyGuard)
  @Get('identity')
  getIdentity(@Req() req) {
    return this.userService.getIdentity(req.user, req.user_wallet);
  }

  @UseGuards(PrivyGuard)
  @Get('api-keys')
  getApiKeys(@Req() req) {
    return this.apiKeysService.getApiKeys(req.user);
  }

  @Patch('api-keys/:id')
  updateApiKey(@Req() req, @Param('id') id: string, @Body() updateApiKeyDto: UpdateApiKeyDto) {
    return this.apiKeysService.updateApiKey(req.user, id, updateApiKeyDto);
  }

  @UseGuards(PrivyGuard)
  @Delete('api-keys/:id')
  deleteApiKey(@Req() req, @Param('id') id: string) {
    return this.apiKeysService.deleteApiKey(req.user, id);
  }

  @Get('api-keys/:id')
  getApiKey(@Param('id') id: string) {
    return this.apiKeysService.getApiKey(id);
  }
}
