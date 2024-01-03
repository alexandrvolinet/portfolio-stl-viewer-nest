import { Controller, Get, UseGuards } from '@nestjs/common';
import { AdminGuard } from './admin.guard';

@Controller('adminDashboard')
export class AdminController {
  @UseGuards(AdminGuard)
  @Get()
  getDashboardData() {
    return { message: 'Admin dashboard data' };
  }
}
