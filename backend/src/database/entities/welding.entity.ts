import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { MachineHistory } from "./machineHistory.entity";

@Entity()
export class Welding {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @OneToOne(() => MachineHistory, (mh) => mh.welding, { onDelete: "CASCADE" })
  machine_history: MachineHistory;

  @Column("real", { nullable: true })
  error_rate?: number;

  @Column("real", { nullable: true })
  vibration_level?: number;

  @Column("real", { nullable: true })
  electrode_wear?: number;

  @Column("real", { nullable: true })
  shielding_pressure?: number;

  @Column("real", { nullable: true })
  wire_feed_rate?: number;

  @Column("real", { nullable: true })
  arc_stability?: number;

  @Column("real", { nullable: true })
  seam_width?: number;

  @Column("real", { nullable: true })
  cooling_efficiency?: number;
}
