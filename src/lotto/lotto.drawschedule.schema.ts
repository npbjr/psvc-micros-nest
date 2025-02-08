import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { LottoResult } from './lotto.results.schema';

@Entity()
export class DrawSchedule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  time: string; 

  @Column()
  name: string; 

  @OneToMany(()=> LottoResult, (lottoResult)=>lottoResult.schedule)
  lottoResults:LottoResult[]
}
