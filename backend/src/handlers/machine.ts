import {
  User,
  assemblyLinesRepository,
  machineHealthRepository,
  machineHealthStateValuesRepository,
  machineHistoryRepository,
  machineScoreRepository,
  machineStateValuesRepository,
  paitingStationRepository,
  qualityControlStationRepository,
  userRepository,
  weldingRepository,
} from "../database";
import { AssemblyLines } from "../database/entities/assemblyLines.entity";
import { MachineHealth } from "../database/entities/machineHealth.entity";
import { MachineHealthStateValues } from "../database/entities/machineHealthStateValues.entity";
import { MachineHistory } from "../database/entities/machineHistory.entity";
import { MachineScore } from "../database/entities/machineScore.entity";
import { MachineStateValues } from "../database/entities/machineStateValues.entity";
import { PaintingStation } from "../database/entities/paitingStation.entity";
import { QualityControlStation } from "../database/entities/qualityControlStation.entity";
import { Welding } from "../database/entities/welding.entity";

export const storeMachineStateValues = async (
  user_id: string,
  machineValues: MachineValues
) => {
  const userFound = await userRepository.findOne({
    where: { user_id },
    relations: {
      machine_state_values: true,
    },
  });

  if (!userFound) {
    throw new Error();
  }

  const newMachineStateValues = new MachineStateValues();
  newMachineStateValues.id = user_id;
  newMachineStateValues.data = machineValues;
  newMachineStateValues.updated_at = new Date();

  await machineStateValuesRepository.upsert(newMachineStateValues, [
    "id" as keyof MachineStateValues,
  ]);

  const updatedUser: User = {
    ...userFound,
    machine_state_values: newMachineStateValues,
  };

  await userRepository.update({ user_id }, { ...updatedUser });
};

export const storeMachineHealthStateValues = async (
  user_id: string,
  machineHealth: MachineHealthType
) => {
  const userFound = await userRepository.findOne({
    where: { user_id },
    relations: {
      machine_health_state_values: true,
    },
  });

  if (!userFound) {
    throw new Error();
  }

  const newMachineHealthStateValues = new MachineHealthStateValues();
  newMachineHealthStateValues.id = user_id;
  newMachineHealthStateValues.data = machineHealth;
  newMachineHealthStateValues.updated_at = new Date();

  await machineHealthStateValuesRepository.upsert(newMachineHealthStateValues, [
    "id" as keyof MachineHealthStateValues,
  ]);

  const updatedUser: User = {
    ...userFound,
    machine_health_state_values: newMachineHealthStateValues,
  };

  await userRepository.update({ user_id }, { ...updatedUser });
};

export const storeMachineHistory = async (
  user_id: string,
  machineValues: MachineValues,
  machineHealth: MachineHealthType
) => {
  const newWelding = new Welding();
  newWelding.id = crypto.randomUUID();
  newWelding.error_rate = Number(
    machineValues?.machines?.weldingRobot?.errorRate
  );
  newWelding.vibration_level = Number(
    machineValues?.machines?.weldingRobot?.vibrationLevel
  );
  newWelding.electrode_wear = Number(
    machineValues?.machines?.weldingRobot?.electrodeWear
  );
  newWelding.shielding_pressure = Number(
    machineValues?.machines?.weldingRobot?.shieldingPressure
  );
  newWelding.wire_feed_rate = Number(
    machineValues?.machines?.weldingRobot?.wireFeedRate
  );
  newWelding.arc_stability = Number(
    machineValues?.machines?.weldingRobot?.arcStability
  );
  newWelding.seam_width = Number(
    machineValues?.machines?.weldingRobot?.seamWidth
  );
  newWelding.cooling_efficiency = Number(
    machineValues?.machines?.weldingRobot?.coolingEfficiency
  );

  await weldingRepository.insert(newWelding);

  const newPaintingStation = new PaintingStation();
  newPaintingStation.id = crypto.randomUUID();
  newPaintingStation.flow_rate = Number(
    machineValues?.machines?.paintingStation?.flowRate
  );
  newPaintingStation.pressure = Number(
    machineValues?.machines?.paintingStation?.pressure
  );
  newPaintingStation.color_consistency = Number(
    machineValues?.machines?.paintingStation?.colorConsistency
  );
  newPaintingStation.nozzle_condition = Number(
    machineValues?.machines?.paintingStation?.nozzleCondition
  );

  await paitingStationRepository.insert(newPaintingStation);

  const newAssemblyLine = new AssemblyLines();
  newAssemblyLine.id = crypto.randomUUID();
  newAssemblyLine.alignment_accuracy = Number(
    machineValues?.machines?.assemblyLine?.alignmentAccuracy
  );
  newAssemblyLine.speed = Number(machineValues?.machines?.assemblyLine?.speed);
  newAssemblyLine.fitting_tolerance = Number(
    machineValues?.machines?.assemblyLine?.fittingTolerance
  );
  newAssemblyLine.belt_speed = Number(
    machineValues?.machines?.assemblyLine?.beltSpeed
  );

  await assemblyLinesRepository.insert(newAssemblyLine);

  const newQualityControlStation = new QualityControlStation();
  newQualityControlStation.id = crypto.randomUUID();
  newQualityControlStation.camera_calibration = Number(
    machineValues?.machines?.qualityControlStation?.cameraCalibration
  );
  newQualityControlStation.light_intensity = Number(
    machineValues?.machines?.qualityControlStation?.lightIntensity
  );
  newQualityControlStation.software_version =
    machineValues?.machines?.qualityControlStation?.softwareVersion;
  newQualityControlStation.criteria_settings = Number(
    machineValues?.machines?.qualityControlStation?.criteriaSettings
  );

  await qualityControlStationRepository.insert(newQualityControlStation);

  const newMachineScore = new MachineScore();
  newMachineScore.id = crypto.randomUUID();
  newMachineScore.painting_station = Number(
    machineHealth?.machineScores?.paintingStation
  );
  newMachineScore.assembly_line = Number(
    machineHealth?.machineScores?.assemblyLine
  );
  newMachineScore.quality_control = Number(
    machineHealth?.machineScores?.qualityControlStation
  );
  newMachineScore.welding = Number(machineHealth?.machineScores?.weldingRobot);

  await machineScoreRepository.insert(newMachineScore);

  const newMachineHealth = new MachineHealth();
  newMachineHealth.factory = Number(machineHealth?.factory);
  newMachineHealth.machine_score = newMachineScore;

  await machineHealthRepository.insert(newMachineHealth);

  const newMachineHistory = new MachineHistory();
  newMachineHistory.assembly_line = newAssemblyLine;
  newMachineHistory.paiting_station = newPaintingStation;
  newMachineHistory.quality_control = newQualityControlStation;
  newMachineHistory.welding = newWelding;
  newMachineHistory.machine_health = newMachineHealth;
  newMachineHistory.user_id = user_id;
  newMachineHistory.created_at = new Date();

  await machineHistoryRepository.insert(newMachineHistory);
};

export const getCompleteMachineHistory = async (user_id: string) => {
  const history = await machineHistoryRepository.find({
    where: { user_id },
    relations: {
      assembly_line: true,
      machine_health: {
        machine_score: true,
      },
      paiting_station: true,
      quality_control: true,
      welding: true,
    },
  });

  return history;
};

/**
 * Gets the latest machine values from user calculation requests.
 * @param user_id
 * @returns
 */
export const getMachineValues = async (user_id: string) => {
  const userFound = await userRepository.findOne({
    where: { user_id },
    relations: {
      machine_state_values: true,
    },
  });

  return userFound?.machine_state_values?.data;
};

/**
 * Gets the latest machine health values from user calculation requests.
 * @param user_id
 * @returns
 */
export const getMachineHealthValues = async (user_id: string) => {
  const userFound = await userRepository.findOne({
    where: { user_id },
    relations: {
      machine_health_state_values: true,
    },
  });

  return userFound?.machine_health_state_values?.data;
};
