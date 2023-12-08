import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class MachineHealthStateValues {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @OneToOne(() => User, (u) => u.machine_health_state_values)
  user_id: User;

  @Column("json")
  data: any;

  @Column("timestamp with time zone")
  updated_at: Date;
}
