import { BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/auth/enums/role.enum';
import { Identity } from 'src/blockchain/entities/identity.entity';
import { OneToMany, OneToOne } from 'typeorm';
import { ApiKeys } from './api-keys.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({unique: true})
  did: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.USER,
  })
  role: Role;

  @OneToOne(() => Identity, (identity) => identity.user)
  identity: Identity;

  @OneToMany(() => ApiKeys, (apiKey) => apiKey.user)
  apiKeys: ApiKeys[];
}
