import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "users" })
export class UserTbl extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: any;

  @Column({ type: "varchar", length: 50, nullable: true })
  name: any;

  @Column({ type: "varchar", length: 100, nullable: true })
  email: any;

  @Column({ type: "varchar", length: 20, nullable: true })
  contact: any;

  @Column({ type: "varchar", length: 255, nullable: true })
  password: any;

  @Column({ type: "varchar", length: 100, nullable: true })
  location: any;

  @Column({ type: "varchar", length: 255, nullable: true })
  img: any;

  @Column({ type: "varchar", length: 30, nullable: true })
  user_type: any;

  @Column({ type: "varchar", length: 100, nullable: true })
  qualification: any;

  @Column({ type: "varchar", length: 255, nullable: true })
  preference: any;

  @Column({ type: "varchar", length: 255, nullable: true })
  resume: any;

  @Column({ type: "varchar", length: 255, nullable: true })
  company_logo: any;

  @Column({ type: "boolean", default: false })
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