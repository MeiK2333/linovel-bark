import { createConnection } from "typeorm";
import { User } from './entity/User';

export async function connect() {
  return await createConnection({
    type: "sqlite",
    database: "linovel.sqlite",
    entities: [User],
    synchronize: true,
    logging: false
  });
}
