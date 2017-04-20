import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';

Meteor.methods({
    'actions.activate'({actionId}) {
        console.log('play2');
        Action.update({_id: actionId}, {$set: {play: true}});
    },

    'actions.deactivate'(actionId) {
        console.log('stop2');
        Action.update({_id: actionId}, {$set: {play: false}});
    },

    'actions.updateVideoTimestamp'(actionId, videoTimestamp) {
        Action.update({_id: actionId}, {$set: {videoTimestamp: videoTimestamp}});
    }
});
