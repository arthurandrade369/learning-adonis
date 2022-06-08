import { schema } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateUserValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    username: schema.string(),
    email: schema.string(),
    password: schema.string()
  })

  public messages = {
    required: 'The {{ field }} is required'
  }
}