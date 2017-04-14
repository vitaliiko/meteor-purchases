Template.TodoInfo.events({
    'click .delete': function() {
        Todos.remove(this.todo._id);
    },

    'click #done': function() {
        Todos.update(this.todo._id, {
            $set: {done: !this.todo.done}
        });
    }
});
