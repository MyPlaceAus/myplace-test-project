import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { ProjectService } from './project.service';

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get()
  findAll(@Query('userId', ParseIntPipe) userId: number) {
    return this.projectService.getAllProjects(userId);
  }

  @Post()
  create(@Body() body: CreateProjectDto) {
    return this.projectService.createProject(body);
  }

  @Get(':projectId')
  findOne(
    @Param('projectId', ParseIntPipe) projectId: number,
    @Query('userId', ParseIntPipe) userId: number,
  ) {
    return this.projectService.getProject(userId, projectId);
  }
}
