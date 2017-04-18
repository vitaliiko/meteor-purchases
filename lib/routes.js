FlowRouter.route('/', {
    name: 'home',
    action() {
        BlazeLayout.render('MainLayout', {main: 'HomeLayout'});
    }
});

FlowRouter.route('/todo', {
    name: 'todo',
    action() {
        BlazeLayout.render('MainLayout', {main: 'Todos'});
    }
});

FlowRouter.route('/video', {
    name: 'video',
    action() {
        BlazeLayout.render('MainLayout', {main: 'Video'});
    }
});
