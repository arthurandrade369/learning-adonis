import Route from '@ioc:Adonis/Core/Route';

Route.group(() => {
    Route.get('', 'AuthController.me');
    Route.post('', 'AuthController.login');
    Route.delete('', 'AuthController.logout').middleware('auth');
}).prefix('/service/v1/auth')