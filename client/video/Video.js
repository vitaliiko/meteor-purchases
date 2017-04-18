Template.Video.onCreated(function() {
    this.autorun(() => {
        this.subscribe('playVideo');
    });
});

Template.Video.helpers({
    action: () => {
        var actions = Action.find({}).fetch();
        return actions[0];
    }
});

Template.Video.events({
    'click .play': () => {
        Action.update({_id: '4RQ6wY9LYKcdCSgJX'}, {$set: {play: true}});
    },

    'click .stop': () => {
        Action.update({_id: '4RQ6wY9LYKcdCSgJX'}, {$set: {play: false}});
    }
});