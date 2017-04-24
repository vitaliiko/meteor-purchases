import {Meteor} from 'meteor/meteor';

Meteor.methods({
    'actions.update'(action) {
        Action.update({_id: action._id}, {$set: {play: action.play, videoTimestamp: action.videoTimestamp, actionTimestamp: Date.now()}});
    },
    'actions.sync'(actionId) {
        return Action.findOne({_id: actionId});
    },
});
