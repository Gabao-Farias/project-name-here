import { axiosInstance } from "./request";

const baseAuthURL = "/machine";

export class MachineAxios {
  static async machineHealth(props: any): Promise<MachineHealthResponseBody> {
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
}
