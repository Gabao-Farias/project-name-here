import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
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
}
