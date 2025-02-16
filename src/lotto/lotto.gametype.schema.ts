import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { LottoResult } from "./lotto.results.schema";


@Entity()
export class GameType {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string

    @OneToMany(()=> LottoResult, (lottoResult)=>lottoResult.gameType)
    lottoResults:LottoResult[]
}