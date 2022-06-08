import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { ResponseContract } from '@ioc:Adonis/Core/Response';
import AbstractsController from './AbstractsController';

export default class AuthController extends AbstractsController {
    /**
     * @param ctx HttpContextContract
     * @returns Promise
     */
    public async login(ctx: HttpContextContract): Promise<ResponseContract> {
        try {
        const email = ctx.request.input('email');
        const password = ctx.request.input('password');
            const token = await ctx.auth.use('api').attempt(email, password);

            return this.showResponse(ctx, token)
        } catch (error) {
            return this.exceptionResponse(ctx, error);
        }
    }

    /**
     * @param ctx HttpContextContract
     * @returns Promise
     */
    public async logout(ctx: HttpContextContract): Promise<ResponseContract> {
        try {
            await ctx.auth.use('api').revoke();

            const data = {
                logout: ctx.auth.use('api').isGuest
            };

            return this.showResponse(ctx, data);
        } catch (error) {
            return this.exceptionResponse(ctx, error);
        }
    }

    /**
     * Return the user who is logged
     * 
     * @param ctx HttpContextContract
     * @returns Promise
     */
    public async me(ctx: HttpContextContract): Promise<ResponseContract> {
        try {
            const user = await ctx.auth.use('api').authenticate();
            return this.showResponse(ctx, user);
        } catch (error) {
            return this.exceptionResponse(ctx, error);
        }
    }
}
