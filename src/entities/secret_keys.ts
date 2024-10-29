import { Column, Entity, PrimaryGeneratedColumn,Index, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm";

@Entity('secret_key')
export class secret_key {
    @PrimaryGeneratedColumn()
    id: number

    @Column("varchar", { nullable: false, unique: true })
    key_name: string;

    @Column("varchar", { nullable: false, unique: true })
    secret_key: string;

    @Column("int", { nullable: false, unique: true })
    @Index()
    f4b_account_id: number;

    @Column("json", { nullable: true })
    meta: string

    @Column("uuid", { nullable: false })
    uuid: string;

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    @DeleteDateColumn()
    deleted_at: Date

}