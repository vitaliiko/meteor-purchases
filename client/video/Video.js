const actionId = '4RQ6wY9LYKcdCSgJX';
const displayMessage = new ReactiveVar(false);
const message = new ReactiveVar('');
const fullScreen = new ReactiveVar(false);

let initFlag = false;
let isLiveEditMode;
let actions;
let events;

Template.Video.onCreated(function () {
    this.autorun(() => {
        this.subscribe('actions', actionSubscriptionCallback);
        this.subscribe('events', eventsSubscriptionCallback);
    });
});

let actionSubscriptionCallback = function () {
    let actionsCursor = Action.find({});
    actions = actionsCursor.fetch();
    applyChangesInAction(actions[0]);
    actionsCursor.observeChanges({
        changed() {
            actions = actionsCursor.fetch();
            applyChangesInAction(actions[0]);
        }
    })
};

let eventsSubscriptionCallback = function () {
    let eventsCursor = Event.find({});
    events = eventsCursor.fetch();
    eventsCursor.observeChanges({
        added() {
            events = eventsCursor.fetch();
        },
        changed() {
            events = eventsCursor.fetch();
        }
    })
};

Template.Video.helpers({
    isLoggedIn: () => {
        return isLoggedIn();
    },

    displayMessage: () => {
        return displayMessage.get();
    },

    fullScreen: () => {
        return fullScreen.get();
    },

    getMessage: () => {
        return message.get();
    }
});

function isLoggedIn() {
    return Meteor.userId();
}

function applyChangesInAction(action) {
    if (action) {
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
}

Template.Video.events({
    'click .apply': () => {
        applyState(actionId);
    },
    'change #live-edit-mode-checkbox': () => {
        isLiveEditMode = document.getElementById('live-edit-mode-checkbox').checked;
    },
    'click #submit-message-button': () => {
        let message = document.getElementById('message-input').value;
        let duration = document.getElementById('duration-input').value;
        if (message && duration) {
            addMessage(actionId, message, duration);
        }
    },
    'click .full-screen': () => {
        getPlayer().requestFullscreen();
    }
});
function addMessage(actionId, message, duration) {
    Meteor.call('events.insert.message', {
        actionId: actionId,
        message: message,
        duration: duration,
    });
}

function applyState(actionId) {
    let player = getPlayer();
    Meteor.call('actions.update', {
        _id: actionId,
        play: !player.paused(),
        videoTimestamp: player.currentTime()
    });
}

Meteor.setInterval(() => {
    events.forEach((event) => {
        if (isTimeToShowEvent(event)) {
            switch (event.type) {
                case 'message':
                    showMessage(event.message, true);
                    break;
            }
        }
    });

    if (!haveEventsToShow()) {
        showMessage('', false);
    }
}, 1000);

function showMessage(messageText, isChecked) {
    displayMessage.set(isChecked);
    message.set(messageText);
}

function isTimeToShowEvent(event) {
    return Math.floor(Date.now() / 1000) - (Math.floor(Date.parse(event.timestamp) / 1000) + event.duration) < 0
}

function haveEventsToShow() {
    let haveEventsToShow = false;
    events.forEach((event) =>{
        if (isTimeToShowEvent(event)) {
            haveEventsToShow = true;
        }
    });
    return haveEventsToShow;
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
    ).ready(function () {
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

        this.on('seeked', function () {
            if (isLiveEditMode
                && this.currentTime().toFixed() != actions[0].videoTimestamp.toFixed()) { //prevent of start-stop loop when set current time to video

                Meteor.call('actions.update', {
                    _id: actionId,
                    videoTimestamp: this.currentTime()
                });
            }
        });

        this.on('click', function () {
            if (isLiveEditMode && !this.paused() != actions[0].play) {
                Meteor.call('actions.update', {
                    _id: actionId,
                    play: !this.paused(),
                    videoTimestamp: this.currentTime()
                });
            }
        });

        this.on('fullscreenchange', function () {
            fullScreen.set(this.isFullscreen());
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
