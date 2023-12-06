import { initializeDatasources } from "./database/datasource";

export const bootstrap = async () => {
  await initializeDatasources();
};
