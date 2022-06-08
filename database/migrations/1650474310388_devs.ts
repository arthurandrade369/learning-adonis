import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Devs extends BaseSchema {
  protected tableName = 'devs'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('first_name', 64).notNullable()
      table.string('last_name', 64)
      table.string('status', 12).notNullable()
      table.integer('age').notNullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
