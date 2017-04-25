let initFlag = false;

Template.Video.onCreated(function() {
    this.autorun(() => {
        this.subscribe('playVideo');
    });
});

Template.Video.helpers({
    action: () => {
        let actions = Action.find({}).fetch();
        if (actions.length) {
            applyChangesInAction(actions[0]);
            return actions[0];
        }
    }
});

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
        let player = getPlayer();
        Meteor.call('actions.update', {
            _id: '4RQ6wY9LYKcdCSgJX', 
            play: !player.paused(), 
            videoTimestamp: player.currentTime()});
    }
});

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
        {controls: true, preload: true, width: 760, height: 330}
    )
}

function getPlayer() {
    return videojs('video');
}

function synchronizeVideo(videoTimestamp) {
    if (videoTimestamp != getPlayer().currentTime().toFixed(0)) {
        getPlayer().currentTime(videoTimestamp);
    }
}