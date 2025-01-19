import {
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
  Index,
  DeleteDateColumn,
} from "typeorm";

@Entity("cron_registry")
@Index(["id", "started", "stopped"])
export class cron_registry {
  @PrimaryColumn("uuid", { nullable: false, unique: true })
  id: string;

  @Column("varchar", { nullable: false })
  worker: string;

  @Column("jsonb", { nullable: false })
  cron_setting: string;

  @Column("jsonb", { nullable: true })
  worker_data: string;

  @Column("boolean", { default: false })
  started: boolean;

  @Column("boolean", { default: false })
  stopped: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
