import Route from '@ioc:Adonis/Core/Route';

Route.group(() => {
    Route.post('', 'DevsController.store').middleware('auth');
    Route.get('', 'DevsController.index').middleware('auth');
    Route.get(':id', 'DevsController.show').middleware('auth');
    Route.route(':id', ['PUT', 'PATCH'],'DevsController.update').middleware('auth');
    Route.delete(':id', 'DevsController.destroy').middleware('auth');
}).prefix('/service/v1/dev')