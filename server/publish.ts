import Todos from "../collections/Todos"

Meteor.publish('todos', function() {
    return Todos.find({});
});
