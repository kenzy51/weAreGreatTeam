import { ApiProperty } from "@nestjs/swagger";

export class CreateRoleDto{
    @ApiProperty({example:'ADMIN', description:'Создание админа'})
     readonly value:string;
    @ApiProperty({example:'Description', description:'описание Создание админа'})
     readonly description:string;
}