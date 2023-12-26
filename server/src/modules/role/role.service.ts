import { Injectable } from '@nestjs/common';
import { RolesRepository } from './role.repository';
import { RoleInterface } from '../../types/role.type';

@Injectable()
export class RolesService {
  constructor(private readonly roleRepo: RolesRepository) {}

  async getRoles(): Promise<RoleInterface[]> {
    const roles = await this.roleRepo.getRoles();
    return roles;
  }

  async createRole(body): Promise<RoleInterface> {
    return await this.roleRepo.createRole(body);
  }

  async deleteRole(idd) {
    const role = await this.roleRepo.findRole(idd);
    if (!role) {
      return { msg: 'Role not found' };
    }
    return this.roleRepo.deleteRole(idd);
  }
}
