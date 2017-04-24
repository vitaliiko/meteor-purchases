Template.TodoInfo.events({
    'click .delete': function() {
        Todos.remove(this.todo._id);
    },

    'click .play': function() {
        Meteor.call('todos.activate', {
            todoId: this.todo._id
        }, () => {
            var options = {};

            var player = videojs('todoDemo', options, function onPlayerReady() {
                videojs.log('Your videoPlayer is ready!');

                this.play();

                this.on('ended', function() {
                    videojs.log('Awww...over so soon?!');
                });
            });
        });
    },

    'click .done': function() {
        Todos.update(this.todo._id, {
            $set: {done: !this.todo.done}
        });
    }
});
