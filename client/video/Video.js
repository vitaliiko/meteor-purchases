let initFlag = false;
let isLiveEditMode;
let actions;

Template.Video.onCreated(function() {
    this.autorun(() => {
        this.subscribe('playVideo');
    });
});

Template.Video.helpers({
    action: () => {
        actions = Action.find({}).fetch();
        let videoTimestamp = actions[0].videoTimestamp;
        let timePass = Date.now() - actions[0].actionTimestamp;
        if (!initFlag) {
            initPlayer();
            initPlayerState(actions);
            initFlag = true;
        }
        reloadPlayerState(getPlayer(), actions);
        synchronizeVideo(videoTimestamp + timePass / 1000);
        return actions[0];
    }
});

Template.Video.events({
    'click .apply': () => {
        applyState('4RQ6wY9LYKcdCSgJX');
    },
    'change #isLiveEditMode': () => {
        isLiveEditMode = document.getElementById('isLiveEditMode').checked;
    },
});

function applyState(actionId) {
    let player = videojs('video');
    Meteor.call('actions.update', {
        _id: actionId,
        play: !player.paused(),
        videoTimestamp: player.currentTime()
    });
}

function initPlayerState(actions) {
    let player = getPlayer();
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
    return videojs('video').ready(function() {
        this.preload(true);
        this.on('ended', function () {
            this.currentTime(0);
            this.play();
            Meteor.call('actions.update', {
                _id: '4RQ6wY9LYKcdCSgJX',
                play: true,
                videoTimestamp: this.currentTime()
            });
        });
        this.on('timeupdate', function () {
            if (isLiveEditMode && !this.paused() != actions[0].play) {
                /*
                * values from video.js - 18491
                * NONE = 0;
                * LOADING = 1;
                * LOADED = 2;
                * ERROR = 3;
                */
                if (this.readyState() == 1) {
                    Meteor.call('actions.update', {
                        _id: '4RQ6wY9LYKcdCSgJX',
                        videoTimestamp: this.currentTime()});
                } else {
                    Meteor.call('actions.update', {
                        _id: '4RQ6wY9LYKcdCSgJX',
                        play: !this.paused(),
                        videoTimestamp: this.currentTime()
                    });
                }
            }
        })
    })
}

function getPlayer() {
    return videojs('video');
}

function synchronizeVideo(videoTimestamp) {
    if (videoTimestamp != getPlayer().currentTime().toFixed(0)) {
        getPlayer().currentTime(videoTimestamp);
    }
}