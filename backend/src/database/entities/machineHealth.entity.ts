import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { MachineScore } from "./machineScore.entity";

@Entity()
export class MachineHealth {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @OneToOne(() => MachineScore, (ms) => ms.machine_health)
  @JoinColumn()
  machine_score: MachineScore;

  @Column("real", { nullable: true })
  factory?: number;
}
