const actionId = '4RQ6wY9LYKcdCSgJX';

let initFlag = false;
let isLiveEditMode;
let actions;

Template.Video.onCreated(function() {
    this.autorun(() => {
        this.subscribe('playVideo', () => {
            actions = Action.find({}).fetch();
            if (actions.length) {
                applyChangesInAction(actions[0]);
                return actions[0];
            }
        });
    });
});

Template.Video.helpers({
    isLoggedIn: () => {
        return isLoggedIn();
    }
});

function isLoggedIn() {
    return Meteor.userId();
}

function applyChangesInAction(action) {
    let videoTimestamp = action.videoTimestamp;
    let timePass = Date.now() - action.actionTimestamp;
    if (!initFlag) {
        initPlayer();
        initPlayerState(action);
        initFlag = true;
    }
    reloadPlayerState(getPlayer(), action);
    synchronizeVideo(videoTimestamp + timePass / 1000);
}

Template.Video.events({
    'click .apply': () => {
        applyState(actionId);
    },
    'change #isLiveEditMode': () => {
        isLiveEditMode = document.getElementById('isLiveEditMode').checked;
    },
});

function applyState(actionId) {
    let player = getPlayer();
    Meteor.call('actions.update', {
        _id: actionId,
        play: !player.paused(),
        videoTimestamp: player.currentTime()
    });
}

function initPlayerState(action) {
    let player = getPlayer();
    if (action.play) {
        player.currentTime(action.videoTimestamp);
        player.play();
    }
}

function reloadPlayerState(player, action) {
    if (action.play) {
        player.play();
    } else {
        player.pause();
    }
}

function initPlayer() {
    return videojs(
        'video',
        {controls: isLoggedIn(), preload: true, width: 760, height: 330}
    ).ready(function() {
        this.preload(true);
        this.on('ended', function () {
            this.currentTime(0);
            this.play();

            Meteor.call('actions.update', {
                _id: actionId,
                play: true,
                videoTimestamp: this.currentTime()
            });
        });

        this.on('seeked', function() {
            if (isLiveEditMode
                && this.currentTime().toFixed() != actions[0].videoTimestamp.toFixed()) { //prevent of start-stop loop when set current time to video

                Meteor.call('actions.update', {
                    _id: actionId,
                    videoTimestamp: this.currentTime()
                });
            }
        });

        this.on('click', function() {
            if (isLiveEditMode && !this.paused() != actions[0].play) {
                Meteor.call('actions.update', {
                    _id: actionId,
                    play: !this.paused(),
                    videoTimestamp: this.currentTime()
                });
            }
        });
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