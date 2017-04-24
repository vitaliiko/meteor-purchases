let videoPlayer = null;

Template.Video.onCreated(function() {
    this.autorun(() => {
        this.subscribe('playVideo');
    });
    this.data.player = null;
    this.data.videoTimestamp = null;
    Meteor.setInterval(() => {
        Template.Video.__helpers.get('action').call();
    }, 500)
});

Template.Video.helpers({
    action: () => {
        var actions = Action.find({}).fetch();
        var lastActionVideoTimestamp = actions[0].videoTimestamp;
        if (!getPlayer()) {
            videoPlayer = initPlayer();
        }
        reloadPlayerState(getPlayer(), actions);
        synchronizeVideo(lastActionVideoTimestamp);
        return actions[0];
    }
});

Template.Video.events({
    'click .play': () => {
        Meteor.call('actions.startPlay', '4RQ6wY9LYKcdCSgJX');
    },

    'click .stop': () => {
        Action.update({_id: '4RQ6wY9LYKcdCSgJX'}, {$set: {play: false}});
    }
});

function reloadPlayerState(player, actions) {
    let currentTime = (new Date).getTime();
    let startAt = (new Date(actions[0].startAt).getTime());
    if (actions[0].play && startAt - currentTime < 1) {
        player.play();
    }
    if (!actions[0].play) {
        player.pause();
    }
}

function initPlayer() {
    return videojs('video').ready(function() {
        this.preload(true);
        this.on('timeupdate', function() {
            synchronizeVideo(this.currentTime(), this);
        })
    })
}

function getPlayer() {
    return videoPlayer;
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