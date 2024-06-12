import { MigrationInterface, QueryRunner } from "typeorm";

export class Entities1718224590771 implements MigrationInterface {
    name = 'Entities1718224590771'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_cb8486eaad7a292ff78b37d7610"`);
        await queryRunner.query(`ALTER TABLE "order_details_products" DROP CONSTRAINT "FK_a1010200c2a1e00e22761db03cc"`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_cb8486eaad7a292ff78b37d7610" FOREIGN KEY ("orderDetailsId") REFERENCES "orders_detail"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_details_products" ADD CONSTRAINT "FK_a1010200c2a1e00e22761db03cc" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_details_products" DROP CONSTRAINT "FK_a1010200c2a1e00e22761db03cc"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_cb8486eaad7a292ff78b37d7610"`);
        await queryRunner.query(`ALTER TABLE "order_details_products" ADD CONSTRAINT "FK_a1010200c2a1e00e22761db03cc" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_cb8486eaad7a292ff78b37d7610" FOREIGN KEY ("orderDetailsId") REFERENCES "orders_detail"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
