import {
  IsString,
  IsOptional,
  IsDateString,
  IsEmail,
  IsIn,
} from 'class-validator';

export class CreateJobApplicationDto {
  @IsString()
  companyName: string;

  @IsString()
  position: string;

  @IsOptional()
  @IsString()
  jobUrl?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsString()
  jobType?: string; // "remote" | "onsite" | "hybrid"

  @IsString()
  source: string;

  @IsOptional()
  @IsDateString()
  appliedDate?: string;

  @IsOptional()
  @IsString()
  salaryRange?: string;

  @IsOptional()
  @IsIn(['applied', 'interview', 'offer', 'rejected', 'accepted', 'withdrawn'])
  status?: string;

  @IsOptional()
  @IsDateString()
  interviewDate?: string;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsString()
  contactPerson?: string;

  @IsOptional()
  @IsEmail()
  contactEmail?: string;
}
