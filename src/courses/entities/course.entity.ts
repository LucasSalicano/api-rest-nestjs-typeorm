import { Tag } from './tag.entity';
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm"

@Entity('courses')
export class Course {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    descripton: string

    @JoinTable()
    @ManyToMany((type) => Tag, (tag) => tag.courses, {
        cascade: true
    })
    tags: Tag[]

    @Column('decimal', { precision: 10, scale: 2 })
    price: number
}