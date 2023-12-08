declare type MachineTypeKeys =
  | "weldingRobot"
  | "paintingStation"
  | "assemblyLine"
  | "qualityControlStation";

declare type MachineScores = {
  [x in MachineTypeKeys]?: string;
};

declare type MachineHealthType = {
  error?: string;
  factory?: string;
  machineScores?: MachineScores;
};

declare type WeldingRobotParts = {
  errorRate?: number;
  vibrationLevel?: number;
  electrodeWear?: number;
  shieldingPressure?: number;
  wireFeedRate?: number;
  arcStability?: number;
  seamWidth?: number;
  coolingEfficiency?: number;
};

declare type PaintingStationParts = {
  flowRate: number;
  pressure: number;
  colorConsistency: number;
  nozzleCondition: number;
};

declare type AssemblyLinePartParts = {
  alignmentAccuracy: number;
  speed: number;
  fittingTolerance: number;
  beltSpeed: number;
};

declare type QualityControlStationPart = {
  cameraCalibration: number;
  lightIntensity: number;
  softwareVersion: string;
  criteriaSettings: number;
};

declare type MachineValues = {
  machines: {
    weldingRobot?: WeldingRobotParts;
    paintingStation?: PaintingStationParts;
    assemblyLine?: AssemblyLinePartParts;
    qualityControlStation?: QualityControlStationPart;
  };
};
