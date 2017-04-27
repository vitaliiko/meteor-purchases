import SimpleSchema from 'simpl-schema';

Event = new Meteor.Collection('events');

Event.allow({
    insert: function () {
        return true;
    },
    update: function () {
        return true;
    }
});

EventSchema = new SimpleSchema({
    actionId: {
        type: String,
        defaultValue: false
    },
    type: {
        type: String,
    },
    message: {
        type: String,
    },
    duration: {
        type: Number,
    },
    timestamp: {
        type: Date,
    }
});

Event.attachSchema(EventSchema);