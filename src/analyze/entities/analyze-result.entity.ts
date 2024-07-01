import { User } from "src/auth/entities/user.entity";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class AnalyzeResult extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.analyzeResults, { onDelete: "CASCADE" })
  user: User;

  @Column()
  decibelScore: number;

  @Column("text", { nullable: true })
  decibelComment: string;

  @Column()
  pitchScore: number;

  @Column("text", { nullable: true })
  pitchComment: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updatedAt: Date;
}
