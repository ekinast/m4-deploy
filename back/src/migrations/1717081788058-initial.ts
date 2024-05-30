import { MigrationInterface, QueryRunner } from 'typeorm';

export class Initial1717081788058 implements MigrationInterface {
  name = 'Initial1717081788058';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "categories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "email" character varying(50) NOT NULL, "password" character varying(20) NOT NULL, "phone" bigint NOT NULL, "country" character varying(50) NOT NULL, "address" character varying NOT NULL, "city" character varying(50) NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "orders" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "total" numeric(10,2) NOT NULL, CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "orders_detail" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "price" numeric(10,2) NOT NULL, "orderId" uuid, CONSTRAINT "PK_893f1d90444c486c31023ff1d8e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "description" character varying NOT NULL, "price" numeric(10,2) NOT NULL, "stock" integer NOT NULL, "imgUrl" character varying DEFAULT 'default_image_url', "categoryId" uuid, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "order_details_products" ("orderDetailId" uuid NOT NULL, "productId" uuid NOT NULL, CONSTRAINT "PK_6fd256742906739d58b0e404dcd" PRIMARY KEY ("orderDetailId", "productId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_cae788a387f0f0be5e4d576e8e" ON "order_details_products" ("orderDetailId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_a1010200c2a1e00e22761db03c" ON "order_details_products" ("productId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" ADD CONSTRAINT "FK_151b79a83ba240b0cb31b2302d1" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders_detail" ADD CONSTRAINT "FK_cd077a930dde58cfd231806a0bc" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "products" ADD CONSTRAINT "FK_ff56834e735fa78a15d0cf21926" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_details_products" ADD CONSTRAINT "FK_cae788a387f0f0be5e4d576e8e3" FOREIGN KEY ("orderDetailId") REFERENCES "orders_detail"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_details_products" ADD CONSTRAINT "FK_a1010200c2a1e00e22761db03cc" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "order_details_products" DROP CONSTRAINT "FK_a1010200c2a1e00e22761db03cc"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_details_products" DROP CONSTRAINT "FK_cae788a387f0f0be5e4d576e8e3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "products" DROP CONSTRAINT "FK_ff56834e735fa78a15d0cf21926"`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders_detail" DROP CONSTRAINT "FK_cd077a930dde58cfd231806a0bc"`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" DROP CONSTRAINT "FK_151b79a83ba240b0cb31b2302d1"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_a1010200c2a1e00e22761db03c"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_cae788a387f0f0be5e4d576e8e"`,
    );
    await queryRunner.query(`DROP TABLE "order_details_products"`);
    await queryRunner.query(`DROP TABLE "products"`);
    await queryRunner.query(`DROP TABLE "orders_detail"`);
    await queryRunner.query(`DROP TABLE "orders"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "categories"`);
  }
}
