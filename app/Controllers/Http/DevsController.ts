// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { Dev } from "App/Models/Dev";
import AbstractCrudController from './AbstractsCrudController';
import CreateDevValidator from '../../Validators/CreateDevValidator';

export default class DevsController extends AbstractCrudController {

    async index(ctx: HttpContextContract) {
        return await this.listAction(Dev, ctx);
    }

    async store(ctx: HttpContextContract) {
        return await this.createAction(Dev, ctx, CreateDevValidator);
    }

    async show(ctx: HttpContextContract) {
        return await this.showAction(Dev, ctx);
    }

    async update(ctx: HttpContextContract) {
        return await this.updateAction(Dev, ctx);
    }

    async destroy(ctx: HttpContextContract) {
        return await this.deleteAction(Dev, ctx);
    }
}
