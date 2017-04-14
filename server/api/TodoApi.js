Meteor.methods({
    'todos.activate'({todoId}) {
        Todos.update(
            { isActive: true },
            { $set: {isActive: false} }
        );

        Todos.update(todoId, {
            $set: {isActive: true}
        });
    },

    'todos.deactivate'() {
        Todos.update(
            { isActive: true },
            { $set: {isActive: false} }
        );
    }
});
