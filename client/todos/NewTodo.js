Template.NewTodo.events({
    'submit #newTodo': function(event) {
        event.preventDefault();

        var todo = event.target;
        var name = todo.name.value;
        var whatTodo = todo.whatTodo.value;

        Todos.insert({
            name,
            whatTodo
        });

        todo.reset();
    }
});
