import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('tasks')
export class Task {
    @PrimaryGeneratedColumn('uuid') 
    id: string;
    @Column() 
    title: string;
    @Column({type: 'enum', enum: ['active', 'completed'], default: 'active'}) 
    status: string;
    @Column({type: 'timestamptz', nullable: true }) 
    completedAt: Date | null;
    @Column({default: 0}) 
    count: number;
    @CreateDateColumn({type: 'timestamptz'}) 
    createdAt: Date;
    @UpdateDateColumn({type: 'timestamptz'}) 
    updatedAt: Date;
}