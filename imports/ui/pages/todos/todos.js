import './todos.html';
import {addTask} from '../../../api/tasks/tasks';

import '../../components/posts/tasks';

Template.body.events({
    'submit .new-task'(event) {
        // Prevent default browser form submit
        event.preventDefault();

        // Get value from form element
        const target = event.target;
        const text = target.text.value;

        // Insert a task into the collection
        // Meteor.call('tasks.insert', text);
        addTask.call({text: text});

        // Clear form
        target.text.value = '';
    },
});