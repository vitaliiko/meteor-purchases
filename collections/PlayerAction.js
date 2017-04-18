import SimpleSchema from 'simpl-schema';

Action = new Meteor.Collection('action');

Action.allow({
    insert: function () {
        return true;
    },
    update: function () {
        return true;
    }
});

TodoSchema = new SimpleSchema({
    play: {
        type: Boolean,
        defaultValue: false
    }
});

Action.attachSchema(TodoSchema);