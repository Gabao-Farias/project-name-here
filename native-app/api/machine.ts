import { axiosInstance } from "./request";

const baseAuthURL = "/machine";

export class MachineAxios {
  static async machineHealth(
    props: MachineHealthRequestBody
  ): Promise<MachineHealthResponseBody> {
    try {
      const { data } = await axiosInstance.post<MachineHealthResponseBody>(
        `${baseAuthURL}/health`,
        props
      );

      return data;
    } catch (error) {
      throw error;
    }
  }

  static async machineHealthHistory(): Promise<MachineHealthHistoryResponseBody> {
    try {
      const { data } =
        await axiosInstance.get<MachineHealthHistoryResponseBody>(
          `${baseAuthURL}/health`
        );

      return data;
    } catch (error) {
      throw error;
    }
  }

  static async machineHealthState(): Promise<MachineHealthStateResponseBody> {
    try {
      const { data } = await axiosInstance.get<MachineHealthStateResponseBody>(
        `${baseAuthURL}/health-values`
      );

      return data;
    } catch (error) {
      throw error;
    }
  }

  static async machineValuesState(): Promise<MachineValuesStateResponseBody> {
    try {
      const { data } = await axiosInstance.get<MachineValuesStateResponseBody>(
        `${baseAuthURL}/values`
      );

      return data;
    } catch (error) {
      throw error;
    }
  }
}
