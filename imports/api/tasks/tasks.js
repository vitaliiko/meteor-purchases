import {Mongo} from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

export const Tasks = new Mongo.Collection('tasks');

if (Meteor.isServer) {
    Meteor.publish('tasks', function tasksPublication() {
        return Tasks.find();
    });
}

export const addTask = {
    name: 'tasks.insert',
    validate(args) {
        new SimpleSchema({
            text: {type: String},
            createdAt: {type: Date, required: false}
        }).validate(args)
    },
    run(args) {
        Tasks.insert({
            text: args.text,
            createdAt: new Date()
        });
    },
    call(args, callback) {
        const options = {
            returnStubValue: true,     // (5)
            throwStubExceptions: true  // (6)
        };
        Meteor.apply(this.name, [args], options, callback);
    }
};


Meteor.methods({
    [addTask.name]: function (args) {
        addTask.validate.call(this, args);
        addTask.run.call(this, args);
    }
});
