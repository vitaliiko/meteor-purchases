import * as ClockGuardian from "./clock/clock-guardian";

Meteor.startup(() => {
    ClockGuardian.setTimeOffset();
});
