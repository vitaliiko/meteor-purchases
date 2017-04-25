Template.ReloadButton.helpers({
    isMobile: () => {
        return Meteor.isCordova;
    }
});

Template.ReloadButton.events({
    'click .reload': function () {
        location.reload();
    }
});
