FlowRouter.route('/', {
    name: 'home',
    action() {
        BlazeLayout.render('HomeLayout');
    }
});

FlowRouter.route('/todo', {
    name: 'todo',
    action() {
        BlazeLayout.render('MainLayout', {main: 'Todos'});
    }
});
