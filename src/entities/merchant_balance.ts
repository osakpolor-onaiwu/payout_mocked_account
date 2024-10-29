import { Column, Entity, PrimaryGeneratedColumn,Index, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne } from "typeorm";
import { merchant_bank_details } from "./merchant_bank_details";

@Entity('merchant_balance')
export class merchant_balance {
    @PrimaryGeneratedColumn()
    id: number

    @Column("double precision", { nullable: false, default:0 })
    balance_before: number;

    @Column("double precision", { nullable: false, default:0})
    balance_after: number;

    @Column("double precision", { nullable: false, default:0})
    amount: number;

    @Column("int", { nullable: false})
    @Index()
    f4b_account_id: number;

    @ManyToOne(() => merchant_bank_details, (bank) => bank.id)
    merchantBankDetail: merchant_bank_details;

    @Column("json", { nullable: true })
    meta: string;

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    @DeleteDateColumn()
    deleted_at: Date

}