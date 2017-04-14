import SimpleSchema from 'simpl-schema';

Todos = new Meteor.Collection('todos');

Todos.allow({
    insert: function () {
        return true;
    },
    update: function () {
        return true;
    }
});

TodoSchema = new SimpleSchema({
    name: {
        type: String,
    },
    whatTodo: {
        type: String,
    },
    videoSource: {
        type: String,
        optional: true
    },
    done: {
        type: Boolean,
        optional: true,
        defaultValue: false
    }
});

Todos.attachSchema(TodoSchema);
