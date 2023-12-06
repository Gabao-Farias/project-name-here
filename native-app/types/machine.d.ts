declare type MachineTypeKeys =
  | "weldingRobot"
  | "paintingStation"
  | "assemblyLine"
  | "qualityControlStation";

declare type MachineScores = {
  [x in MachineTypeKeys]?: number;
};
