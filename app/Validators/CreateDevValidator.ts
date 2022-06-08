import { schema } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateDevValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    first_name: schema.string(),
    last_name: schema.string.nullableAndOptional(),
    status: schema.string(),
    age: schema.number()
  })

  public messages = {
    required: 'The {{ field }} is required'
  }
}