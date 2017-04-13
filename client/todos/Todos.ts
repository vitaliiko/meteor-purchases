Meteor.subscribe('todos');

Template.Todos.helpers({
    todos: () => {
        return Todos.find({});
    }
});

Template.Todos.events({
    'submit #new-todo'(event, template) {
        event.preventDefault();
        var target = event.target;
        var name = target.name.value;
        var whatTodo = target.whatTodo.value;

        Todos.insert({
           name, whatTodo
        });

        template.find('#new-todo').reset();
    }
});
