import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { AssemblyLines } from "./assemblyLines.entity";
import { MachineHealth } from "./machineHealth.entity";
import { PaintingStation } from "./paitingStation.entity";
import { QualityControlStation } from "./qualityControlStation.entity";
import { User } from "./user.entity";
import { Welding } from "./welding.entity";

@Entity()
export class MachineHistory {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => User, (user) => user.machine_history)
  user_id: string;

  @OneToOne(() => Welding, (w) => w.machine_history)
  @JoinColumn()
  welding: Welding;

  @OneToOne(() => PaintingStation, (ps) => ps.machine_history)
  @JoinColumn()
  paiting_station: PaintingStation;

  @OneToOne(() => AssemblyLines, (al) => al.machine_history)
  @JoinColumn()
  assembly_line: AssemblyLines;

  @OneToOne(() => QualityControlStation, (qcs) => qcs.machine_history)
  @JoinColumn()
  quality_control: QualityControlStation;

  @OneToOne(() => MachineHealth, (mh) => mh.machine_history, {
    onDelete: "CASCADE",
  })
  @JoinColumn()
  machine_health: MachineHealth;

  @Column("timestamp with time zone")
  created_at: Date;
}
