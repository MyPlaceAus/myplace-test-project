import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { Project } from './project.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  getAllProjects(userId: number): Promise<Project[]> {
    return this.projectRepository.find({
      where: { user: { id: userId } },
      order: { id: 'DESC' },
      relations: { user: false },
    });
  }

  async createProject(project: CreateProjectDto): Promise<Project> {
    const createdProject = this.projectRepository.create({
      title: project.title,
      image: project.image,
      user: { id: project.userId },
    });

    return this.projectRepository.save(createdProject);
  }

  getProject(userId: number, projectId: number): Promise<Project | null> {
    return this.projectRepository.findOne({
      where: { id: projectId, user: { id: userId } },
      relations: { user: false },
    });
  }
}
