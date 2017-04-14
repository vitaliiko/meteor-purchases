Meteor.methods({
    'todos.deactivate'({todoId}) {
        Todos.update(
            { isActive: true },
            { $set: {isActive: false} }
        );

        Todos.update(todoId, {
            $set: {isActive: true}
        });
    }
});
