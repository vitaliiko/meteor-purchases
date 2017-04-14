Meteor.subscribe('activeTodo');

Template.Video.helpers({
    activeTodo: () => {
        return Todos.findOne({isActive: true});
    }
});

Template.Video.events({
    'click .hide': function() {
        Meteor.call('todos.deactivate', {}, () => {});
    }
});
