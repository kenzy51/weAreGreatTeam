import { Injectable } from '@nestjs/common';
import { User } from './users.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {

    constructor(@InjectModel(User) private userRepository:typeof User){}

    async createUser(dto:CreateUserDto){
        const user = this.userRepository.create(dto);
        return user;

    }
    async getAllUsers(){
        const users = this.userRepository.findAll();
        return users;

    }
}
