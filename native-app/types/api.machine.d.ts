declare type MachineHealthRequestBody = any;

declare type MachineHealthResponseBody = {
  factory: number;
  machineScores: MachineScores;
};
