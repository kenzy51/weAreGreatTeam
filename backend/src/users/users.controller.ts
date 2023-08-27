import { Body, Controller, Post, Get, Param, Delete,Put, UseGuards } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UsersService } from "./users.service";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { User } from "./users.model";
import { UpdateUserDto } from "./dto/update-user.dto";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
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
  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiBearerAuth('access-token') 
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
  
  @Delete("/:id")
  deleteUser(@Param("id") id: number) {
    return this.usersService.deleteUserById(id);
  }
  @Put("/:id")
  updateUser(@Param("id") id: number, @Body() updateUserDto:UpdateUserDto) {
    return this.usersService.updateUser(id, updateUserDto);
  }
}
