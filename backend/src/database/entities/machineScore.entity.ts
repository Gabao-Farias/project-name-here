import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { MachineHealth } from "./machineHealth.entity";

@Entity()
export class MachineScore {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @OneToOne(() => MachineHealth, (mh) => mh.machine_score, {
    onDelete: "CASCADE",
  })
  machine_health: MachineHealth;

  @Column("real", { nullable: true })
  welding?: number;

  @Column("real", { nullable: true })
  painting_station?: number;

  @Column("real", { nullable: true })
  assembly_line?: number;

  @Column("real", { nullable: true })
  quality_control?: number;
}
