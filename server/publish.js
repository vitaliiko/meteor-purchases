Meteor.publish('todos', function() {
    return Todos.find({});
});

Meteor.publish('activeTodo', function() {
    return Todos.find({isActive: true});
});

Meteor.publish('playVideo', function () {
    return Action.find({});
});
