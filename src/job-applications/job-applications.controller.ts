import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { JobApplicationsService } from './job-applications.service';
import { CreateJobApplicationDto } from './dto/create-job-application.dto';
import { UpdateJobApplicationDto } from './dto/update-job-application.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard/jwt-auth.guard';
import { GetUser } from 'src/auth/decorators/get-user/get-user.decorator';

@UseGuards(JwtAuthGuard)
@Controller('job-application')
export class JobApplicationsController {
  constructor(
    private readonly jobApplicationsService: JobApplicationsService,
  ) {}

  @Post()
  create(
    @GetUser('id') userId: string,
    @Body() createJobApplicationDto: CreateJobApplicationDto,
  ) {
    return this.jobApplicationsService.create(userId, createJobApplicationDto);
  }

  @Get()
  findAll(@GetUser('id') userId: string) {
    return this.jobApplicationsService.findAll(userId);
  }

  @Get(':id')
  findOne(@GetUser('id') userId: string, @Param('id') id: string) {
    return this.jobApplicationsService.findOne(userId, id);
  }

  @Patch(':id')
  update(
    @GetUser('id') userId: string,
    @Param('id') id: string,
    @Body() updateJobApplicationDto: UpdateJobApplicationDto,
  ) {
    return this.jobApplicationsService.update(
      userId,
      id,
      updateJobApplicationDto,
    );
  }

  @Delete(':id')
  remove(@GetUser('id') userId: string, @Param('id') id: string) {
    return this.jobApplicationsService.remove(userId, id);
  }
}
