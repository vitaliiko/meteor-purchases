import {Template} from 'meteor/templating';

import {Tasks} from '../../../api/tasks/tasks';

import './tasks.html';

Template.body.onCreated(function bodyOnCreated() {
    Meteor.subscribe('tasks');
});

Template.App_todos.helpers({
    tasks() {
        return Tasks.find({});
    },
});