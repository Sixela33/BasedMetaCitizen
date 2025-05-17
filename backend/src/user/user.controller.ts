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

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  
  @UseGuards(PrivyGuard)
  @Post('api-keys')
  createApiKey(@Req() req, @Body() createApiKeyDto: CreateApiKeyDto) {
    return this.userService.createApiKey(req.user, createApiKeyDto);
  }

  @UseGuards(PrivyGuard)
  @Get('api-keys')
  getApiKeys(@Req() req) {
    return this.userService.getApiKeys(req.user);
  }

  @Patch('api-keys/:id')
  updateApiKey(@Req() req, @Param('id') id: string, @Body() updateApiKeyDto: UpdateApiKeyDto) {
    return this.userService.updateApiKey(req.user, id, updateApiKeyDto);
  }

  @UseGuards(PrivyGuard)
  @Delete('api-keys/:id')
  deleteApiKey(@Req() req, @Param('id') id: string) {
    return this.userService.deleteApiKey(req.user, id);
  }

  @UseGuards(PrivyGuard)
  @Get('profile')
  getProfile(@Req() req) {
    return this.userService.findOne(req.user.id);
  }
}
