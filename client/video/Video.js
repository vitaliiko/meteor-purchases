let initFlag = false;

Template.Video.onCreated(function() {
    this.autorun(() => {
        this.subscribe('playVideo');
    });
});

Template.Video.helpers({
    action: () => {
        let actions = Action.find({}).fetch();
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
        let player = videojs('video');
        Meteor.call('actions.update', {
            _id: '4RQ6wY9LYKcdCSgJX', 
            play: !player.paused(), 
            videoTimestamp: player.currentTime()});
    }
});

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
                videoTimestamp: this.currentTime()});
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