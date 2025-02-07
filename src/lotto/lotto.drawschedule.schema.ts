import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { LottoResult } from './lotto.results.schema';
    
@Entity()
export class DrawSchedule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  time: string; // e.g. '2pm', '5pm', '9pm'

  @Column()
  description: string; // Optional field for additional info

  @OneToMany(() => LottoResult, (lottoResult) => lottoResult.schedule)
  lottoResults: LottoResult[]; // Relationship to LottoResult
}
