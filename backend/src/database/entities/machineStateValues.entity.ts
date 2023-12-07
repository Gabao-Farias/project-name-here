import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class MachineStateValues {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @OneToOne(() => User, (ms) => ms.machine_state_values)
  user_id: User;

  @Column("json")
  data: any;

  @Column("timestamp with time zone")
  updated_at: Date;
}
