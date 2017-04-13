import label = ts.ScriptElementKind.label;

class Todo {

    @label('Name')
    name: string;

    whatTodo: string;

}

export const Todos = new Mongo.Collection<Todo>('todos');

Todos.allow({
    insert: function () {
        return true;
    }
});

TodoSchema = new SimpleSchema({
    name: {
        type: String,
        label: "Name"
    },
    whatTodo: {
        type: String,
        label: "WhatTodo"
    }
});

Todos.attachSchema(TodoSchema);