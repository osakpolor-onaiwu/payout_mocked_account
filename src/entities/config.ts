import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('config')
export class Config {
    @PrimaryGeneratedColumn()
    id: number

    @Column("varchar", { length: 40, nullable: false, unique:true })
    key: string;

    @Column("json", { nullable: false })
    data: string


}