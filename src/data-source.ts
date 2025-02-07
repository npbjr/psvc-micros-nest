import { DataSource } from "typeorm";
import { DrawSchedule } from "src/lotto/lotto.drawschedule.schema";
import { AddDrawSchedule1738962776753 } from "src/migrations/1738962776753-AddDrawSchedule";
import { LottoResult } from "./lotto/lotto.results.schema";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "127.0.0.1",
    port: 5432,
    username: "postgres",
    password: "admin",
    database: "psvc",
    entities: [LottoResult,DrawSchedule],
    migrations: [AddDrawSchedule1738962776753],
    migrationsRun: false,
    logging: true,
    synchronize: false
});
