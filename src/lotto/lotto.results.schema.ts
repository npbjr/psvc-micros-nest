import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { DrawSchedule } from './lotto.drawschedule.schema';
import { LottoType } from './lotto.lottotype.schema';

@Entity()
export class LottoResult {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({name:'numbers'})
  numbers: string;

  @Column({name:'drawdate'})
  drawdate: string; 

  @ManyToOne(() => DrawSchedule, (schedule) => schedule.lottoResults)
  schedule: DrawSchedule;

  @ManyToOne(() => LottoType, (lottoType) => lottoType.lottoResults)
  lottoType: LottoType;

}
