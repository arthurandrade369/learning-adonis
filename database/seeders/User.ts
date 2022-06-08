import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class UserSeeder extends BaseSeeder {
  public async run () {
    await User.createMany([
      {
        email: 'virk@adonisjs.com',
        username: 'virk',
        password: 'secret',
        role: 'USER',
      },
      {
        email: 'romain@adonisjs.com',
        username: 'romain',
        password: 'supersecret',
        role: 'USER',
      },
      {
        email: 'admin@admin.com',
        username: 'admin',
        password: 'admin',
        role: 'ADMIN',
      }
    ])
  }
}
