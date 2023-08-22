import { Body, Controller, Post, Get, Param } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UsersService } from "./users.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { User } from "./users.model";

@ApiTags("Users")
@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {}
  //
  @ApiOperation({ summary: "User creation" })
  @ApiResponse({ status: 200, type: User })
  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.usersService.createUser(userDto);
  }
  //
  @ApiOperation({ summary: "Get all users" })
  @ApiResponse({ status: 200, type: User })
  @Get()
  getAll() {
    return this.usersService.getAllUsers();
  }
  //
  @ApiOperation({ summary: "Get user by ID" })
  @ApiResponse({ status: 200, type: User })
  @Get("/:id")
  getUserById(@Param("id") id: number) {
    return this.usersService.getUserById(id);
  }
}
