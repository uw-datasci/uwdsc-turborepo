import { config } from "@uwdsc/eslint-config/base";

export default [...config, { ignores: ["src/prisma/**"] }];
