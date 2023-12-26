import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { RolesService } from './role.service';
import { RoleInterface } from '../../types/role.type';

@Controller('api/v1/roles')
export class RolesController {
  constructor(private readonly appService: RolesService) {}

  @Get()
  getRoles(): Promise<RoleInterface[]> {
    return this.appService.getRoles();
  }

  @Post()
  createRole(@Body() body): Promise<RoleInterface> {
    return this.appService.createRole(body);
  }

  @Delete('/:id')
  delete(@Param() id) {
    const idd = Number(id.id);
    return this.appService.deleteRole(idd);
  }
}
