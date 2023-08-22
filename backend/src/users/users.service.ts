import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { User } from "./users.model";
import { InjectModel } from "@nestjs/sequelize";
import { CreateUserDto } from "./dto/create-user.dto";
import { RolesService } from "src/roles/roles.service";
import { UpdateUserDto } from "./dto/update-user.dto";

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
    (await user).roles = [role];
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
    if (!user) {
      throw new HttpException("cannot find such ID", HttpStatus.BAD_REQUEST);
    }
    return user;
  }
  // Удаление юзера
  async deleteUserById(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new HttpException("User not found", HttpStatus.NOT_FOUND);
    }
    await user.destroy();
    return { message: "User deleted succesfully" };
  }
  // Обновление юзера по ID
  async updateUser(id: number, dto: UpdateUserDto) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new HttpException("User not found", HttpStatus.NOT_FOUND);
    }

    if (dto.email) {
      user.email = dto.email;
    }
    if (dto.password) {
      user.password = dto.password;
    }

    await user.save();
    return user;
  }
}
