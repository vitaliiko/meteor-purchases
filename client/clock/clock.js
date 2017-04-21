import * as ClockGuardian from "./clock-guardian";

Template.Clock.onCreated(() => {
    ClockGuardian.startClock();
});

Template.Clock.helpers({
    serverTime: () => {
        return ClockGuardian.serverClock.get();
    },

    clientTime: () => {
        return ClockGuardian.clientClock.get();
    }
});