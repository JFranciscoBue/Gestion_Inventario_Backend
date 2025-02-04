import { Body, Controller, Post } from '@nestjs/common';
import { NewEmployeeDto } from 'src/dto/newEmployee.dto';
import { EmployeesService } from './employees.service';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeeService: EmployeesService) {}

  @Post('/new')
  async newEmployee(@Body() data: NewEmployeeDto): Promise<Object> {
    return await this.employeeService.newEmployee(data);
  }
}
