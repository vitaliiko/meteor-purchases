Template.TodoInfo.events({
    'click .delete': function() {
        Todos.remove(this.todo._id);
    },

    'click .play': function() {
        Meteor.call('todos.deactivate', {
            todoId: this.todo._id
        }, () => {
            Session.set('showVideo', true);
        });
    },

    'click .done': function() {
        Todos.update(this.todo._id, {
            $set: {done: !this.todo.done}
        });
    }
});
