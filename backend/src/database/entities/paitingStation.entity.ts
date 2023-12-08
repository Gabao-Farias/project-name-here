import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { MachineHistory } from "./machineHistory.entity";

@Entity()
export class PaintingStation {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @OneToOne(() => MachineHistory, (mh) => mh.paiting_station, {
    onDelete: "CASCADE",
  })
  machine_history: MachineHistory;

  @Column("real", { nullable: true })
  flow_rate?: number;

  @Column("real", { nullable: true })
  pressure?: number;

  @Column("real", { nullable: true })
  color_consistency?: number;

  @Column("real", { nullable: true })
  nozzle_condition?: number;
}
