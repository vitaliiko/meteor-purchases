var initFlag = false;

Template.Video.onCreated(function () {
    this.autorun(() => {
        this.subscribe('playVideo');
    });
});

Template.Video.helpers({
    action: () => {
        var actions = Action.find({}).fetch();
        var lastActionVideoTimestamp = actions[0].videoTimestamp;
        if (!initFlag) {
            initPlayer();
            initPlayerState(actions);
            initFlag = true;
        }
        reloadPlayerState(getPlayer(), actions);
        synchronizeVideo(lastActionVideoTimestamp);
        return actions[0];
    }
});

Template.Video.events({
    'click .apply': () => {
        var player = videojs('video');
        Meteor.call('actions.update', {_id: '4RQ6wY9LYKcdCSgJX', play: !player.paused(), videoTimestamp: player.currentTime()});
    }
});

function initPlayerState(actions) {
    var player = getPlayer();
    if (actions[0].play) {
        player.currentTime(actions.videoTimestamp);
        player.play();
    }
}

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
    })
}

function getPlayer() {
    return videojs('video');
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