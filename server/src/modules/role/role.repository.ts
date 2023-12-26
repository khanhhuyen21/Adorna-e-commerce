import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Roles } from './entity/role.entity';
import { Repository } from 'typeorm';
import { RoleInterface } from '../../types/role.type';

@Injectable()
export class RolesRepository {
  constructor(
    @InjectRepository(Roles) private rolesRepository: Repository<Roles>,
  ) {}

  async getRoles(): Promise<RoleInterface[]> {
    return await this.rolesRepository.find();
  }

  async createRole(body): Promise<RoleInterface> {
    const role = Number(body.role);
    return await this.rolesRepository.save({ role: role });
  }

  async findRole(idd) {
    const role = await this.rolesRepository.findOne({ where: { id: idd } });
    return role;
  }

  async deleteRole(idd) {
    return await this.rolesRepository.delete(idd);
  }
}
