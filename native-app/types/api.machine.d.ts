declare type MachineHealthRequestBody = any;

declare type MachineHealthResponseBody = {
  factory: number;
  machineScores: MachineScores;
};

declare type MachineHealthHistoryResponseBody = {
  id: string;
  created_at: string;
  assembly_line: {
    id: string;
    alignment_accuracy: number | null;
    speed: number | null;
    fitting_tolerance: number | null;
    belt_speed: number | null;
  };
  machine_health: {
    id: string;
    factory: number | null;
    machine_score: {
      id: string;
      welding: number | null;
      painting_station: number | null;
      assembly_line: number | null;
      quality_control: number | null;
    };
  };
  paiting_station: {
    id: string;
    flow_rate: number | null;
    pressure: number | null;
    color_consistency: number | null;
    nozzle_condition: number | null;
  };
  quality_control: {
    id: string;
    camera_calibration: number | null;
    light_intensity: number | null;
    software_version: string | null;
    criteria_settings: number | null;
  };
  welding: {
    id: string;
    error_rate: number | null;
    vibration_level: number | null;
    electrode_wear: number | null;
    shielding_pressure: number | null;
    wire_feed_rate: number | null;
    arc_stability: number | null;
    seam_width: number | null;
    cooling_efficiency: number | null;
  };
}[];

declare type MachineHealthStateResponseBody =
  | MachineHealthResponseBody
  | undefined
  | null;

declare type MachineValuesStateResponseBody = MachineValues | undefined | null;
