// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import AbstractCrudController from './AbstractsCrudController';
import User from '../../Models/User';
import CreateUserValidator from '../../Validators/CreateUserValidator';

export default class UsersController extends AbstractCrudController {
    async index(ctx: HttpContextContract) {
        return await this.listAction(User, ctx);
    }

    async store(ctx: HttpContextContract) {
        return await this.createAction(User, ctx, CreateUserValidator);
    }

    async show(ctx: HttpContextContract) {
        return await this.showAction(User, ctx)
    }

    async update(ctx: HttpContextContract) {
        return await this.updateAction(User, ctx);
    }

    async destroy(ctx: HttpContextContract) {
        return await this.deleteAction(User, ctx);
    }
}
