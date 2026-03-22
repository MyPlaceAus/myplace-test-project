import { fetcher, endpoints } from 'src/lib/axios';

export type CreateProjectInput = {
  userId: number;
  title: string;
  image: string;
};

export type ProjectResponse = {
  id: number;
  title: string;
  image: string;
  userId?: number;
  createdAt?: string;
};

export async function createNewProject(input: CreateProjectInput): Promise<ProjectResponse> {
  return (await fetcher.post(endpoints.projects.base, input)) as ProjectResponse;
}

export async function getProjectsByUser(userId: number): Promise<ProjectResponse[]> {
  return (await fetcher.get(endpoints.projects.base, {
    params: { userId },
  })) as ProjectResponse[];
}
