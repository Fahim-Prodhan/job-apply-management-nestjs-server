import { PartialType } from '@nestjs/mapped-types';
import { CreateJobApplicationDto } from './create-job-application.dto';

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
export class UpdateJobApplicationDto extends PartialType(
  CreateJobApplicationDto,
) {}
