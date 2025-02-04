import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { EmployeeAuthDto } from 'src/dto/employeeAuth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/employee/signin')
  async authEmployee(@Body() data: EmployeeAuthDto): Promise<Object> {
    return await this.authService.employeeSign(data);
  }
}
