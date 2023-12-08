declare type MachineHealthRequestBody = any;

declare type MachineHealthResponseBody = {
  factory: number;
  machineScores: MachineScores;
};

declare type MachineHealthStateResponseBody =
  | MachineHealthResponseBody
  | undefined
  | null;

declare type MachineValuesStateResponseBody = MachineValues | undefined | null;
