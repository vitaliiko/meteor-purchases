import {Meteor} from 'meteor/meteor';

Meteor.methods({
    'events.insert.message'(event) {
        Event.insert({
            actionId: event.actionId,
            type: 'message',
            message: event.message,
            duration: event.duration,
            timestamp: Date.now()
        });
    },
});
