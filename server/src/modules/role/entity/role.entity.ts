import { Users } from '../../user/entity/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('roles')
export class Roles {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  role: number;

  @OneToMany(() => Users, (user) => user.role, { cascade: true })
  user: Users[];
}
