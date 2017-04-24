import {Meteor} from 'meteor/meteor';

Meteor.methods({
    'actions.activate'({actionId}) {
        console.log('play2');
        Action.update({_id: actionId}, {$set: {play: true, timestamp: Date.now()}});
    },

    'actions.deactivate'(actionId) {
        console.log('stop2');
        Action.update({_id: actionId}, {$set: {play: false, timestamp: Date.now()}});
    },

    'actions.updateVideoTimestamp'(actionId, videoTimestamp) {
        Action.update({_id: actionId}, {$set: {videoTimestamp: videoTimestamp, timestamp: Date.now()}});
    },

    'actions.startPlay'(actionId) {
        let startAt = new Date();
        startAt.setSeconds(startAt.getSeconds() + 10);
        Action.update({_id: actionId}, {$set: {play: true, startAt: startAt}});
    }
});
