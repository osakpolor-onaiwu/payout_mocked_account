import { Column, Entity, PrimaryGeneratedColumn,Index, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm";

@Entity('merchant_bank_details')
export class merchant_bank_details {
    @PrimaryGeneratedColumn()
    id: number

    @Column("varchar", { nullable: false })
    bank_code: string;

    @Column("varchar", { nullable: false})
    bank_name: string;

    @Column("int", { nullable: false, unique: true })
    @Index()
    f4b_account_id: number;

    @Column("varchar", { nullable: false })
    nuban: string;

    @Column("json", { nullable: true })
    meta: string;

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    @DeleteDateColumn()
    deleted_at: Date

}