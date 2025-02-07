import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { DrawSchedule } from './lotto.drawschedule.schema';

@Entity()
export class LottoResult {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string; // e.g. '3D', '2D', '4D', etc.

  @Column()
  numbers: string; // e.g. '123', '12', '1234', etc.

  @Column()
  drawDate: Date; // Date of the draw

  @ManyToOne(() => DrawSchedule, (schedule) => schedule.lottoResults)
  schedule: DrawSchedule; // Relationship to DrawSchedule
}
