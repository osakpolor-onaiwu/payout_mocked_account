import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, Index, OneToOne,JoinColumn } from "typeorm";
import { merchant_bank_details } from "./merchant_bank_details";


@Entity('account')
@Index(["parent_account_id", "f4b_account_id"], { unique: true })
export class Account {
    @PrimaryGeneratedColumn()
    id: number

    @Column("varchar", { nullable: false, unique: true })
    business_name: string;

    @Column("int", { nullable: false })
    @Index()
    f4b_account_id: number;

    //should be composite unique with account id should be 1 for f4b
    @Column("int", { nullable: false, default:1 })
    parent_account_id: number;
    
    @Column("json", { nullable: true })
    meta: string

    @Column("varchar", { nullable: false, default: 'owner' })
    role: string;

    @Column("varchar", { nullable: true })
    password: string;

    @OneToOne(() => merchant_bank_details)
    @JoinColumn()
    bank_detail: merchant_bank_details

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    @DeleteDateColumn()
    deleted_at: Date

}