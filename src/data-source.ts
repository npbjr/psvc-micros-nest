import { DataSource } from "typeorm";
import { DrawSchedule } from "src/lotto/lotto.drawschedule.schema";
import { AddDrawSchedule1738962776753 } from "src/migrations/1738962776753-AddDrawSchedule";
import { LottoResult } from "./lotto/lotto.results.schema";
import { LottoType } from "./lotto/lotto.lottotype.schema";
import { AddLottoType1738972901606 } from "./migrations/1738972901606-AddLottoType";
import { LottoResultEntries1738989820733 } from "./migrations/1738989820733-LottoResultEntries";
export const AppDataSource = new DataSource({
    type: "postgres",
    host: "127.0.0.1",
    port: 5432,
    username: "postgres",
    password: "admin",
    database: "psvc",
    entities: [DrawSchedule, LottoType, LottoResult],
    migrations: [AddDrawSchedule1738962776753, AddLottoType1738972901606, LottoResultEntries1738989820733],
    migrationsRun: false,
    logging: true,
    synchronize: true
});
