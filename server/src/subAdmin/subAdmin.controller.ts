import { Controller, Get, Patch, Post } from "@nestjs/common";
import { SubAdminService } from "./subAdmin.service";


@Controller('sub-admins')

export class SubAdminController {
    constructor(
        private readonly subAdminService: SubAdminService,
    ) {}
    // Controller methods would go here
    @Get()
    getAllSubAdmins() {
        return this.subAdminService.getAllSubAdmins();
    }

    @Get(':id')
    getSubAdminById(id: string) {
        return this.subAdminService.getSubAdminById(id);
    }

    @Get('phone/:phoneNumber')
    findSubAdminByPhoneNumber(phoneNumber: string) {
        return this.subAdminService.findSubAdminByPhoneNumber(phoneNumber);
    }

    @Post('create')
    createSubAdmin() {
        return this.subAdminService.createSubAdmin({});
    }

    @Post('delete/:id')
    deleteSubAdmin(id: string) {
        return this.subAdminService.deleteSubAdmin(id);
    }

    @Patch('update/:id')
    updateSubAdmin(id: string) {
        return this.subAdminService.updateSubAdmin(id, {});
    }
}