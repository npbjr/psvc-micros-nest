import { MigrationInterface, QueryRunner } from "typeorm";

export class AddLottoType1738972901606 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO lotto_type (name) VALUES 
            ('3D'),
            ('2D'),
            ('4D'),
            ('6D'),
            ('6/42'),
            ('6/45'),
            ('6/49'),
            ('6/55'),      
            ('6/58');`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
