import { Exception } from '@adonisjs/core/build/standalone';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { ResponseContract } from '@ioc:Adonis/Core/Response'
import { LucidModel } from '@ioc:Adonis/Lucid/Orm';
import View from 'App/Models/View';
import { ResponseCode } from 'Config/ResponseCode';
import ExceptionHandler from 'App/Exceptions/Handler';

export default class AbstractsController extends ExceptionHandler {
    public view(body: any, header: Array<any> = []) {
        const view = new View(body, header);
        return view;
    }

    public handleView(view: View, contexthttp: HttpContextContract): ResponseContract {
        const mData = JSON.stringify(view.body)

        const response = contexthttp.response;

        response.lazyBody = [mData];
        response.append('Content-Type', view.getContentType());

        return response;
    }

    public exceptionResponse(ctx: HttpContextContract, exception: any): Promise<ResponseContract> {
        return this.handle(exception, ctx);
    }

    public showResponse(ctx: HttpContextContract, data: Object) {
        try {
            const view = this.view(data);

            return this.handleView(view, ctx);
        } catch (error: unknown) {
            return this.exceptionResponse(ctx, error);
        }
    }

    public listResponde(ctx: HttpContextContract, data: Array<object>) {
        try {
            const body = {
                'iTotalRecords': data.length,
                'aData': data,
            };

            const view = this.view(body);

            return this.handleView(view, ctx);
        } catch (error: unknown) {
            return this.exceptionResponse(ctx,error);
        }
    }

    public static errorNotFoundResponse(entity: LucidModel) {
        const message = `${entity.name} Not Found`;
        throw new Exception(message, ResponseCode.HTTP_NOT_FOUND);
    }

    public static errorUnProcessableEntityResponse(message: string) {
        throw new Exception(message, ResponseCode.HTTP_UNPROCESSABLE_ENTITY);
    }

    public static errorInternalServerErrorResponse(entity: LucidModel) {
        const message = `Expected a instance of ${entity.name} class`;
        throw new Exception(message, ResponseCode.HTTP_INTERNAL_SERVER_ERROR);
    }
}
