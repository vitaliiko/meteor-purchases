export const serverClock = new ReactiveVar(new Date());
export const clientClock = new ReactiveVar(new Date());
export const serverTimeOffset = new ReactiveVar(0);

export const startClock = () => {
    Meteor.setInterval(() => {
        serverClock.set(formatDate(new Date(getServerTime())));
        clientClock.set(formatDate(new Date()));
    }, 500);
};

export const setTimeOffset = () => {
    let requestTime = (new Date).getTime();
    Meteor.call('getServerTime', (err, serverTime) => {
        let offset = calculateTimeOffset(serverTime, requestTime);
        serverTimeOffset.set(offset);
    });
};

const calculateTimeOffset = (serverTime, requestTime) => {
    let localTime = (new Date).getTime();
    return Math.round(((serverTime - requestTime) + (serverTime - localTime)) / 2);
};

const formatDate = (date) => {
    return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}:${date.getMilliseconds()}`;
};

const getServerTime = () => {
    return (new Date).getTime() + serverTimeOffset.get();
};