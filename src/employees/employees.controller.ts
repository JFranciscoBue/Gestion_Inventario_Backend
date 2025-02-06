import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { NewEmployeeDto } from 'src/dto/newEmployee.dto';
import { EmployeesService } from './employees.service';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeeService: EmployeesService) {}

  @Post('/new')
  async newEmployee(@Body() data: NewEmployeeDto): Promise<Object> {
    return await this.employeeService.newEmployee(data);
  }

  @Get('/orders/:id')
  async getEmployeeOrders(@Param('id') id: number): Promise<Object> {
    return await this.employeeService.employeeOrders(Number(id));
  }
}
