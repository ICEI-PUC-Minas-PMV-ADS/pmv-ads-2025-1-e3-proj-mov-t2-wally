import { MigrationInterface, QueryRunner } from "typeorm";

export class AdicionarColunaDataTabelaTransacoes1746744108734 implements MigrationInterface {
    name = 'AdicionarColunaDataTabelaTransacoes1746744108734'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transacoes" ADD "data" date`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transacoes" DROP COLUMN "data"`);
    }

}
