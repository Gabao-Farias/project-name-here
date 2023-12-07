import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { MachineHistory } from "./machineHistory.entity";
import { MachineScore } from "./machineScore.entity";

@Entity()
export class MachineHealth {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @OneToOne(() => MachineHistory, (ms) => ms.machine_health)
  machine_history: MachineHistory;

  @OneToOne(() => MachineScore, (ms) => ms.machine_health)
  @JoinColumn()
  machine_score: MachineScore;

  @Column("real", { nullable: true })
  factory?: number;
}
