import { Exception } from '@adonisjs/core/build/standalone';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { ResponseContract } from '@ioc:Adonis/Core/Response'
import { LucidModel } from '@ioc:Adonis/Lucid/Orm';
import View from 'App/Models/View';
import { ResponseCode } from 'Config/ResponseCode';
import ExceptionHandler from 'App/Exceptions/Handler';

export default class AbstractsController extends ExceptionHandler {
    /**
     * Create a instance of View class
     * 
     * @param body any 
     * @param header array
     * @returns view View instance
     */
    public view(body: any, header: Array<any> = []): View {
        const view = new View(body, header);
        return view;
    }

    /**
     * Handle a View instance to return a response
     * 
     * @param view View
     * @param ctx HttpContextContract
     * @returns Promise
     */
    public async handleView(view: View, ctx: HttpContextContract): Promise<ResponseContract> {
        const mData = JSON.stringify(view.body)

        const response = ctx.response;

        response.lazyBody = [mData];
        response.append('Content-Type', view.getContentType());

        return response;
    }

    /**
     * Exception response handled "automatically" by framework
     * 
     * @param ctx HttpContextContract
     * @param exception any
     * @returns Promise
     */
    public exceptionResponse(ctx: HttpContextContract, exception: any): Promise<ResponseContract> {
        return this.handle(exception, ctx);
    }

    /**
     * Response function made for handle with Objects itself
     * 
     * @param ctx HttpContextContract
     * @param data Object
     * @returns Promise
     */
    public showResponse(ctx: HttpContextContract, data: Object): Promise<ResponseContract> {
        try {
            const view = this.view(data);

            return this.handleView(view, ctx);
        } catch (error: unknown) {
            return this.exceptionResponse(ctx, error);
        }
    }

    /**
     * Response function made for handle with Arrays of Objects
     * 
     * @param ctx HttpContextContract
     * @param data Array
     * @returns Promise
     */
    public listResponde(ctx: HttpContextContract, data: Array<object>): Promise<ResponseContract> {
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

    /**
     * @param entity LucidModel
     * @throws Exception
     */
    public static errorNotFoundResponse(entity: LucidModel) {
        const message = `${entity.name} Not Found`;
        throw new Exception(message, ResponseCode.HTTP_NOT_FOUND);
    }

    /**
     * @param message String
     * @throws Exception
     */
    public static errorUnProcessableEntityResponse(message: string) {
        throw new Exception(message, ResponseCode.HTTP_UNPROCESSABLE_ENTITY);
    }

    /**
     * @param entity LucidModel
     * @throws Exception
     */
    public static errorInternalServerErrorResponse(entity: LucidModel) {
        const message = `Expected a instance of ${entity.name} class`;
        throw new Exception(message, ResponseCode.HTTP_INTERNAL_SERVER_ERROR);
    }
}
