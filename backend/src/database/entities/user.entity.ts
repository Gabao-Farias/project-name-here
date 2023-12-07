import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { MachineHistory } from "./machineHistory.entity";

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
}
