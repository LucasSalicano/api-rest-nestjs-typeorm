import { IsNumber, IsString } from "class-validator"


export class CreateCourseDto {
    @IsString()
    readonly name: string

    @IsString()
    readonly descripton: string

    @IsString({ each: true })
    readonly tags: string[]

    @IsNumber()
    readonly price: number
}