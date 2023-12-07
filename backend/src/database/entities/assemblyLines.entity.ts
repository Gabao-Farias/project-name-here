import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { MachineHistory } from "./machineHistory.entity";

@Entity()
export class AssemblyLines {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @OneToOne(() => MachineHistory, (mh) => mh.assembly_line, {
    onDelete: "CASCADE",
  })
  machine_history: MachineHistory;

  @Column("real", { nullable: true })
  alignment_accuracy?: number;

  @Column("real", { nullable: true })
  speed?: number;

  @Column("real", { nullable: true })
  fitting_tolerance?: number;

  @Column("real", { nullable: true })
  belt_speed?: number;
}
