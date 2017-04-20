Template.Video.onCreated(function () {
    this.autorun(() => {
        this.subscribe('playVideo');
    });
    this.data.player = null;
});

Template.Video.helpers({
    action: () => {
        var actions = Action.find({}).fetch();
        var lastActionVideoTimestamp = actions[0].videoTimestamp;
        if (!getPlayer()) {
            Template.instance().data.player = initPlayer();
        }
        reloadPlayerState(getPlayer(), actions);
        synchronizeVideo(lastActionVideoTimestamp);
        return actions[0];
    }
});

Template.Video.events({
    'click .play': () => {
        Action.update({_id: '4RQ6wY9LYKcdCSgJX'}, {$set: {play: true}});
    },

    'click .stop': () => {
        Action.update({_id: '4RQ6wY9LYKcdCSgJX'}, {$set: {play: false}});
    }
});

function reloadPlayerState(player, actions) {
    if (actions[0].play) {
        player.play();
    } else {
        player.pause();
    }
}

function initPlayer() {
    return videojs('video')
}

function getPlayer() {
    return Template.instance().data.player;
}

var synchronizeVideo = function (videoTimestamp) {
    if (videoTimestamp != getPlayer().currentTime().toFixed(0)) {
        if (Meteor.user()) {
            Meteor.call('actions.updateVideoTimestamp', '4RQ6wY9LYKcdCSgJX', getPlayer().currentTime().toFixed(0));
        } else {
            getPlayer().currentTime(videoTimestamp)
        }
    }
};