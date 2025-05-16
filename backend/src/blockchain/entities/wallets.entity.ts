import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Identity } from "./identity.entity";

@Entity()
export class Wallet {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    address: string;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => Identity, (identity) => identity.wallets)
    identity: Identity;
    
}