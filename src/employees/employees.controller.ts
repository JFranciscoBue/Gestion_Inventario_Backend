import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { NewEmployeeDto } from 'src/dto/newEmployee.dto';
import { EmployeesService } from './employees.service';
import { PayloadDataDto } from 'src/dto/payloadData.dto';
import { ValidSalary } from 'src/interceptors/validationSalary.interceptor';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeeService: EmployeesService) {}

  @Get('/all')
  async allEmployees() {
    return await this.employeeService.allEmployees();
  }

  @Get('/providers')
  async allProviders() {
    return await this.employeeService.getAllProviders();
  }

  @Get(':id')
  async employeeById(@Param('id') id: string) {
    return await this.employeeService.employeeById(Number(id));
  }

  @Get('/orders/:id')
  async getEmployeeOrders(@Param('id') id: number): Promise<Object> {
    return await this.employeeService.employeeOrders(Number(id));
  }

  @Post('/new')
  async newEmployee(@Body() data: NewEmployeeDto): Promise<Object> {
    return await this.employeeService.newEmployee(data);
  }

  @Patch('/pay')
  @UseInterceptors(ValidSalary)
  async payEmployeeSalary(@Body() payloadData: PayloadDataDto) {
    return await this.employeeService.payEmployeeSalary(
      payloadData.id,
      payloadData.salary,
    );
  }
}
