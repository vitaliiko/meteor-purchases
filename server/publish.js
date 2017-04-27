Meteor.publish('actions', function () {
    return Action.find({});
});

Meteor.publish('events', function () {
    return Event.find({});
});
