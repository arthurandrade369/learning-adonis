import Route from '@ioc:Adonis/Core/Route';

Route.group(() => {
    Route.post('', 'UsersController.store');
    Route.get('', 'UsersController.index').middleware('auth');
    Route.get(':id', 'UsersController.show').middleware('auth');
    Route.route(':id', ['PUT', 'PATCH'], 'UsersController.update').middleware('auth');
    Route.delete(':id', 'UsersController.destroy').middleware('auth');
}).prefix('/service/v1/user');