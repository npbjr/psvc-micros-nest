import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

import { GameType } from './lotto.gametype.schema';

@Entity()
export class LottoResult {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({name:'combinations'})
  combinations: string;

  @Column({name:'drawDate'})
  drawDate: string; 

  @Column({name:'jackpot'})
  jackpot: string; 

  @Column({name:"winners"})
  winners: string

  @ManyToOne(() => GameType, (gameType) => gameType.lottoResults)
  gameType: GameType;

}
