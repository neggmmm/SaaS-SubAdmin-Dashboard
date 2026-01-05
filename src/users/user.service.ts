import { User } from "@/users/entities/user.entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from "typeorm";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepo: Repository<User>) {}
    async getAllUsers(): Promise<User[]> {
        return this.userRepo.find();
    }
    async findUserById(userId: string): Promise<User | null> {
        return this.userRepo.findOne({ where: { id: userId } });
    }
    async findUserByUsername(username: string): Promise<User | null> {
        return this.userRepo.findOne({ where: { username } });
    }
    async createUser(userData: Partial<User>): Promise<User> {
        const user = this.userRepo.create(userData);
        return this.userRepo.save(user);
    }
    async updateUser(
        userId: string,
        updateData: Partial<User>,
    ): Promise<User | null> {
        const user = await this.findUserById(userId);
        if (!user) return null;

        Object.assign(user, updateData);
        return this.userRepo.save(user);
    }
    async deleteUser(userId: string): Promise<boolean> {
        const result = await this.userRepo.delete(userId);
        return result.affected === 1;
    }
}
