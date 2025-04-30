import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { FirebaseAuthGuard } from './guards/firebase-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
@ApiBearerAuth('access-token')
export class AuthController {
  @Get('me')
  @UseGuards(FirebaseAuthGuard)
  @ApiOperation({ summary: 'Get authenticated user profile' }) 
  @ApiResponse({
    status: 200,
    description: 'Returns authenticated user profile',
  }) 
  @ApiResponse({ status: 401, description: 'Unauthorized' }) 
  getProfile(@Request() req) {
    return { user: req.user };
  }
}
