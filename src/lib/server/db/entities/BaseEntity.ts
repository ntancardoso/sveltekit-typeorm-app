import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, Column } from "typeorm";

export abstract class BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn({ name: 'created_on' })
    createdOn: Date;

    @Column({ name: 'created_by', type: 'varchar', length: 50, nullable: true, default: 'system' })
    createdBy: string;

    @UpdateDateColumn({ name: 'modified_on' })
    modifiedOn: Date;

    @Column({ name: 'modified_by', type: 'varchar', length: 50,  nullable: true, default: 'system' })
    modifiedBy: string;

    @DeleteDateColumn({ name: 'deleted_on', nullable: true })
    deletedOn: Date;

    @Column({ name: 'deleted_by', type: 'varchar', length: 50,  nullable: true })
    deletedBy: string;
}