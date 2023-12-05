import { datasource } from "../datasource";
import { RefreshToken, User } from "../entities";

export const userRepository = datasource.getRepository(User);
export const refreshTokenRepository = datasource.getRepository(RefreshToken);
