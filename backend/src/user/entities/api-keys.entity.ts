import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity('api_keys')
export class ApiKeys {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({unique: true})
    key: string;

    @Column({default: 'Unknown'})
    name: string

    @Column('simple-array', { default: [] })
    allowedOrigins: string[];

    @Column()
    redirectUrl: string;

    @ManyToOne(() => User, user => user.apiKeys)
    user: User;
}