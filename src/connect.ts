import { createConnection, Connection } from "typeorm";
import { User } from './entity/user';

let _connect: Connection = null;

export async function connect(): Promise<Connection> {
  if (_connect === null) {
    _connect = await createConnection({
      type: "sqlite",
      database: "linovel.sqlite",
      entities: [User],
      synchronize: true,
      logging: false
    });
  }
  return _connect;
}
