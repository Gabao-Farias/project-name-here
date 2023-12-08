import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { MachineHistory } from "./machineHistory.entity";

@Entity()
export class QualityControlStation {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @OneToOne(() => MachineHistory, (mh) => mh.quality_control, {
    onDelete: "CASCADE",
  })
  machine_history: MachineHistory;

  @Column("real", { nullable: true })
  camera_calibration?: number;

  @Column("real", { nullable: true })
  light_intensity?: number;

  @Column("text", { nullable: true })
  software_version?: string;

  @Column("real", { nullable: true })
  criteria_settings?: number;
}
