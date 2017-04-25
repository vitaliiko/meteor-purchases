Meteor.publish('actions', function () {
    return Action.find({});
});
