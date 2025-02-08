import { MigrationInterface, QueryRunner } from "typeorm";

export class LottoResultEntries1738989820733 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO lotto_result (numbers, drawdate, "lottoTypeId", "scheduleId")
            VALUES 
                ('1,2,3,4,5', '2025-01-01 00:00:00', 1, 1),
                ('6,7,8,9,10', '2025-01-02 00:00:00', 1, 2),
                ('11,12,13,14,15', '2025-01-03 00:00:00', 2, 1),
                ('16,17,18,19,20', '2025-01-04 00:00:00', 2, 3),
                ('21,22,23,24,25', '2025-01-05 00:00:00', 3, 1),
                ('26,27,28,29,30', '2025-01-06 00:00:00', 3, 2),
                ('31,32,33,34,35', '2025-01-07 00:00:00', 4, 3),
                ('36,37,38,39,40', '2025-01-08 00:00:00', 4, 1),
                ('41,42,43,44,45', '2025-01-09 00:00:00', 5, 2),
                ('46,47,48,49,50', '2025-01-10 00:00:00', 5, 3);
        `);
    
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
