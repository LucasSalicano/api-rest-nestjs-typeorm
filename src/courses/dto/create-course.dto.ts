import { IsNotEmpty, IsNumber, IsString } from "class-validator"


export class CreateCourseDto {
    @IsString()
    @IsNotEmpty()
    readonly name: string

    @IsString()
    readonly description: string

    @IsString({ each: true })
    readonly tags: string[]

    @IsNumber()
    readonly price: number
}