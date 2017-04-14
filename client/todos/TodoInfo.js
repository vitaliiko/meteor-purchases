Template.TodoInfo.events({
    'click .delete': function() {
        Todos.remove(this.todo._id);
    }
});
