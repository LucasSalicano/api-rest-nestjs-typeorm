import { Tag } from './tag.entity';
import { BeforeInsert, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm"
import { v4 as uuidv4 } from 'uuid'

@Entity('courses')
export class Course {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string

    @Column()
    description: string

    @JoinTable({ name: 'courses_tags'})
    @ManyToMany((type) => Tag, (tag) => tag.courses, {
        cascade: true
    })
    tags: Tag[]

    @Column('decimal', { precision: 10, scale: 2 })
    price: number

    @CreateDateColumn({
        type: 'timestamp'
    })
    created_at: Date

    @BeforeInsert()
    generatedId() {
        if (this.id) {
            return;
        }

        this.id = uuidv4();
    }

}