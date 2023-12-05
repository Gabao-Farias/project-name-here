import { datasource } from "../datasource";
import { User } from "../entities";

export const userRepository = datasource.getRepository(User);
