Meteor.subscribe('activeTodo');

Template.Video.helpers({
    activeTodo: () => {
        return Todos.findOne({isActive: true});
    },

    showVideo: () => {
        return Session.get('showVideo');
    }
});

Template.Video.events({
    'click .hide': function() {
        Session.set('showVideo', false);
    }
});
