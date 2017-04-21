Template.Video.onCreated(function () {
    this.autorun(() => {
        this.subscribe('playVideo');
    });
    this.data.player = null;
    this.data.videoTimestamp = null;
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
    return videojs('video').ready(function () {
        this.preload(true);
        this.on('timeupdate', function () {
            synchronizeVideo(this.currentTime(), this);
        })
    })
}

function getPlayer() {
    return Template.instance().data.player;
}

function synchronizeVideo(videoTimestamp, player) {
    if (!player) {
        player = getPlayer();
    }
    if (videoTimestamp != player.currentTime().toFixed(0)) {
        if (Meteor.user()) {
            Meteor.call('actions.updateVideoTimestamp', '4RQ6wY9LYKcdCSgJX', player.currentTime().toFixed(0));
        } else {
            getPlayer().currentTime(videoTimestamp)
        }
    }
}