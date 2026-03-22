import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Project } from '../project/project.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ unique: true })
  email: string;

  @Column({ type: 'text', nullable: true, select: false })
  passwordHash: string | null;

  @Column({ type: 'text', nullable: true })
  name: string | null;

  @Column({ type: 'text', nullable: true })
  organization: string | null;

  @Column({ default: false })
  isOnboarded: boolean;

  @OneToMany(() => Project, (project) => project.user)
  projects: Project[];
}
