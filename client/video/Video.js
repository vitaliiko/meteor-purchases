Template.Video.onCreated(function () {
    this.autorun(() => {
        this.subscribe('playVideo');
    });
    this.data.videoTimestamp = null;
});

Template.Video.helpers({
    action: () => {
        let actions = Action.find({}).fetch();
        let videoTimestamp = actions[0].videoTimestamp;
        let timePass = Date.now() - actions[0].actionTimestamp;
        initPlayer();
        reloadPlayerState(getPlayer(), actions);
        synchronizeVideo(videoTimestamp + timePass / 1000);
        return actions[0];
    }
});

Template.Video.events({
    'click .play': () => {
        Meteor.call('actions.update', {_id: '4RQ6wY9LYKcdCSgJX', play: true, videoTimestamp: getPlayer().currentTime()});
    },

    'click .stop': () => {
        Meteor.call('actions.update', {_id: '4RQ6wY9LYKcdCSgJX', play: false, videoTimestamp: getPlayer().currentTime()});
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
    if (!getPlayer()) {
        return videojs('video').ready(function() {
            this.preload(true);
        });
    }
}

function getPlayer() {
    return videojs('video');
}

function synchronizeVideo(videoTimestamp) {
    if (videoTimestamp != getPlayer().currentTime().toFixed(0)) {
        getPlayer().currentTime(videoTimestamp);
    }
}