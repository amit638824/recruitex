import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "applied_jobs" })
export class AppliedJobTbl extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: any;

  @Column({ type: "int" })
  job_id: any;

  @Column({ type: "int" })
  seeker_id: any;

  @Column({ type: "varchar", length: 50, default: "pending" })
  status: any;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: any;

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updated_at: any;
}