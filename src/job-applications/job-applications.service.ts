import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateJobApplicationDto } from './dto/create-job-application.dto';
import { UpdateJobApplicationDto } from './dto/update-job-application.dto';
import { JobApplication, Prisma } from '@prisma/client';

@Injectable()
export class JobApplicationsService {
  constructor(private prisma: PrismaService) {}

  create(
    userId: string,
    dto: CreateJobApplicationDto,
  ): Promise<JobApplication> {
    const data: Prisma.JobApplicationCreateInput = {
      companyName: dto.companyName,
      position: dto.position,
      jobUrl: dto.jobUrl,
      location: dto.location,
      jobType: dto.jobType,
      source: dto.source,
      salaryRange: dto.salaryRange,
      status: dto.status,
      notes: dto.notes,
      contactPerson: dto.contactPerson,
      contactEmail: dto.contactEmail,
      appliedDate: dto.appliedDate ? new Date(dto.appliedDate) : undefined,
      interviewDate: dto.interviewDate
        ? new Date(dto.interviewDate)
        : undefined,
      user: { connect: { id: userId } },
    };

    return this.prisma.jobApplication.create({ data });
  }

  findAll(userId: string): Promise<JobApplication[]> {
    return this.prisma.jobApplication.findMany({
      where: { userId },
      orderBy: { appliedDate: 'desc' },
    });
  }

  async findOne(userId: string, id: string): Promise<JobApplication> {
    const job = await this.prisma.jobApplication.findUnique({ where: { id } });

    if (!job) throw new NotFoundException('Job application not found');
    if (job.userId !== userId) throw new ForbiddenException('Access denied');

    return job;
  }

  async update(
    userId: string,
    id: string,
    dto: UpdateJobApplicationDto,
  ): Promise<JobApplication> {
    await this.findOne(userId, id); // ownership check

    const data: Prisma.JobApplicationUpdateInput = {
      companyName: dto.companyName,
      position: dto.position,
      jobUrl: dto.jobUrl,
      location: dto.location,
      jobType: dto.jobType,
      source: dto.source,
      salaryRange: dto.salaryRange,
      status: dto.status,
      notes: dto.notes,
      contactPerson: dto.contactPerson,
      contactEmail: dto.contactEmail,
      appliedDate: dto.appliedDate ? new Date(dto.appliedDate) : undefined,
      interviewDate: dto.interviewDate
        ? new Date(dto.interviewDate)
        : undefined,
    };

    return this.prisma.jobApplication.update({ where: { id }, data });
  }

  async remove(userId: string, id: string): Promise<JobApplication> {
    await this.findOne(userId, id); // ownership check

    return this.prisma.jobApplication.delete({ where: { id } });
  }
}
