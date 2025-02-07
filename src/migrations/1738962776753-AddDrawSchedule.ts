import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDrawSchedule1738962776753 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO draw_schedule (time, description) VALUES
            ('2pm', 'Afternoon Draw'),
            ('5pm', 'Evening Draw'),
            ('9pm', 'Night Draw');
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DELETE FROM draw_schedule WHERE time IN ('2pm', '5pm', '9pm');
        `);
    }
}
