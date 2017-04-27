FlowRouter.route('/', {
    name: 'home',
    action() {
        BlazeLayout.render('HomeLayout');
    }
});

FlowRouter.route('/video', {
    name: 'video',
    action() {
        BlazeLayout.render('MainLayout', {main: 'Video'});
    }
});

FlowRouter.route('/slides', {
    name: 'slides',
    action() {
        BlazeLayout.render('MainLayout', {main: 'Slides'});
    }
});
