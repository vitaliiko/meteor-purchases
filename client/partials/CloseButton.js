Template.CloseButton.helpers({
    isDesktop: () => {
        return Meteor.isDesktop;
    }
});

Template.CloseButton.events({
    'click .close': function () {
        Desktop.send('desktop', 'closeApp');
    }
});
