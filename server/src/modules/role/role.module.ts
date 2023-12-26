import { Module } from '@nestjs/common';
import { RolesController } from './role.controller';
import { RolesService } from './role.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Roles } from './entity/role.entity';
import { RolesRepository } from './role.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Roles])],
  controllers: [RolesController],
  providers: [RolesService, RolesRepository],
})
export class RoleModule {}
