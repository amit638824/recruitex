import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "jobs" })
export class JobTbl extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: any;

    @Column({ type: "int" })
    recruiter_id: any;

    @Column({ type: "varchar", length: 100, nullable: true })
    category: any;

    @Column({ type: "varchar", length: 150 })
    job_title: any;

    @Column({ type: "varchar", length: 100, nullable: true })
    experience: any;

    @Column({ type: "varchar", length: 50, nullable: true })
    job_type: any;

    @Column({ type: "int", default: 1 })
    vacancies: any;

    @Column({ type: "varchar", length: 150, nullable: true })
    job_location: any;

    @Column({ type: "varchar", length: 100, nullable: true })
    salary: any;

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