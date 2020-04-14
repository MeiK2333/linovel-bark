import { createConnection, Connection } from "typeorm";
import { User } from './entity/user';
import { Nickname } from './entity/nickname';
import { Subscribe } from './entity/subscribe';

let _connect: Connection = null;

export async function connect(): Promise<Connection> {
  if (_connect === null) {
    _connect = await createConnection({
      type: "sqlite",
      database: "linovel.sqlite",
      entities: [User, Nickname, Subscribe],
      synchronize: true,
      logging: false
    });
  }
  return _connect;
}
