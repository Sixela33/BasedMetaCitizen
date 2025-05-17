import { Column, CreateDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, JoinColumn } from "typeorm";
import { User } from "../../user/entities/user.entity";
import { Wallet } from "./wallets.entity";

@Entity()
export class Identity {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    address: string;
    
    @CreateDateColumn()
    createdAt: Date;
    
    @OneToOne(() => User, (user) => user.identity)
    @JoinColumn()
    user: User;
    
    @OneToMany(() => Wallet, (wallet) => wallet.identity)
    wallets: Wallet[];
}