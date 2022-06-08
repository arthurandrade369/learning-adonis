// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { BaseModel, LucidRow } from '@ioc:Adonis/Lucid/Orm';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { ResponseContract } from '@ioc:Adonis/Core/Response';
import { TypedSchema, RequestValidatorNode, ParsedTypedSchema } from '@ioc:Adonis/Core/Validator';
import AbstractsController from './AbstractsController';


export default class AbstractCrudController extends AbstractsController {

    async listAction(model: typeof BaseModel, ctx: HttpContextContract): Promise<ResponseContract> {
        try {
            const data = await model.all();

            return this.listResponde(ctx, data);
        } catch (error) {
            return this.exceptionResponse(ctx, error);
        }
    }

    async createAction<T extends ParsedTypedSchema<TypedSchema>>(model: typeof BaseModel, ctx: HttpContextContract, validateModel: RequestValidatorNode<T>): Promise<LucidRow|ResponseContract> {
        try {
            const entity = new model;
            const body = ctx.request.body();

            await ctx.request.validate(validateModel);
            await entity.fill(body).save();

            return this.showResponse(ctx, entity);
        } catch (error) {
            return this.exceptionResponse(ctx, error);
        }
    }

    async showAction(model: typeof BaseModel, ctx: HttpContextContract): Promise<ResponseContract> {
        try {
            
            const entity = await model.findOrFail(ctx.request.param('id'));
            
            return this.showResponse(ctx, entity);
        } catch (error) {
            return this.exceptionResponse(ctx, error);
        }
    }

    async updateAction(model: typeof BaseModel, ctx: HttpContextContract): Promise<ResponseContract> {
        try {
            const entity = await model.findOrFail(ctx.request.param('id'));
            const data = ctx.request.body();
    
            await entity.merge(data).save();
    
            return this.showResponse(ctx, entity);
        } catch (error) {
            return this.exceptionResponse(ctx, error);
        }
    }

    async deleteAction(model: typeof BaseModel, ctx: HttpContextContract): Promise<void|ResponseContract>{
        try {
            const entity = await model.findOrFail(ctx.request.param('id'));
            entity.delete();

            return ctx.response.noContent();
        } catch (error) {
            return this.exceptionResponse(ctx, error);
        }
    }
}
