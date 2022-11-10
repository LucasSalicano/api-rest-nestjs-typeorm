import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity('courses')
export class Course {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    descripton: string

    @Column('json', { nullable: true })
    tags: string[]

    @Column('decimal', { precision: 10, scale: 2 })
    price: number
}