import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { EmployeeAuthDto } from 'src/dto/employeeAuth.dto';
import { NewCadetDto } from 'src/dto/newCadet.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/cadet/signin")
  async authCadet (@Body() data: Partial<NewCadetDto>) {
    return await this.authService.cadetSign(data.email)
  }

  @Post('/employee/signin')
  async authEmployee(@Body() data: EmployeeAuthDto): Promise<Object> {
    return await this.authService.employeeSign(data);
  }
}
