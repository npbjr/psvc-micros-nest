import { MigrationInterface, QueryRunner } from "typeorm";

export class AddLottoType1738972901606 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO "game_type" (name) VALUES 
            ('Grand Lotto 6/55'),
            ('Lotto 6/42'),
            ('6D Lotto'),
            ('3D Lotto 2PM'),
            ('3D Lotto 5PM'),
            ('3D Lotto 9PM'),
            ('2D Lotto 2PM'),
            ('2D Lotto 5PM'),
            ('2D Lotto 9PM'),
            ('Ultra Lotto 6/58'),
            ('Megalotto 6/45'),
            ('4D Lotto'),
            ('Superlotto 6/49')`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
