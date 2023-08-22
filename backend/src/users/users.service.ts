import { Injectable,HttpException,HttpStatus } from "@nestjs/common";
import { User } from "./users.model";
import { InjectModel } from "@nestjs/sequelize";
import { CreateUserDto } from "./dto/create-user.dto";
import { RolesService } from "src/roles/roles.service";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private roleService: RolesService
  ) {}
  // Создание юзера
  async createUser(dto: CreateUserDto) {
    const user = this.userRepository.create(dto);
    const role = await this.roleService.getRoleByValue("USER");
    (await user).$set("roles", [role.id]);
    return user;
  }
  // Получение юзеров
  async getAllUsers() {
    const users = this.userRepository.findAll({ include: { all: true } });
    return users;
  }
  // Получение юзера по EMAIL
  async getUsersByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
      include: {
        all: true,
      },
    });
    return user;
  }
  // Получение юзера по ID
  async getUserById(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      include: {
        all: true,
      },
    });
    if( !id){
        throw new HttpException(
            "cannot find such ID",
            HttpStatus.BAD_REQUEST
        )
    }
    return user;
    
  }
}
