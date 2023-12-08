import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { MachineHealthStateValues } from "./machineHealthStateValues.entity";
import { MachineHistory } from "./machineHistory.entity";
import { MachineStateValues } from "./machineStateValues.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  user_id: string;

  @Column("text")
  email: string;

  @Column("text")
  password: string;

  @OneToMany(() => MachineHistory, (mh) => mh.user_id)
  machine_history: MachineHistory[];

  @OneToOne(() => MachineStateValues, (ms) => ms.user_id)
  @JoinColumn()
  machine_state_values: MachineStateValues;

  @OneToOne(() => MachineHealthStateValues, (ms) => ms.user_id)
  @JoinColumn()
  machine_health_state_values: MachineHealthStateValues;
}
