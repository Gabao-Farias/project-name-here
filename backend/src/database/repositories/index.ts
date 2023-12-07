import { datasource } from "../datasource";
import { RefreshToken, User } from "../entities";
import { AssemblyLines } from "../entities/assemblyLines.entity";
import { MachineHealth } from "../entities/machineHealth.entity";
import { MachineHistory } from "../entities/machineHistory.entity";
import { MachineScore } from "../entities/machineScore.entity";
import { MachineStateValues } from "../entities/machineStateValues.entity";
import { PaintingStation } from "../entities/paitingStation.entity";
import { QualityControlStation } from "../entities/qualityControlStation.entity";
import { Welding } from "../entities/welding.entity";

export const userRepository = datasource.getRepository(User);
export const refreshTokenRepository = datasource.getRepository(RefreshToken);
export const machineHistoryRepository =
  datasource.getRepository(MachineHistory);
export const weldingRepository = datasource.getRepository(Welding);
export const paitingStationRepository =
  datasource.getRepository(PaintingStation);
export const assemblyLinesRepository = datasource.getRepository(AssemblyLines);
export const qualityControlStationRepository = datasource.getRepository(
  QualityControlStation
);

export const machineHealthRepository = datasource.getRepository(MachineHealth);
export const machineScoreRepository = datasource.getRepository(MachineScore);
export const machineStateValuesRepository =
  datasource.getRepository(MachineStateValues);
