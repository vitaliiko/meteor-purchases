// Tests for the links publications
//
// https://guide.meteor.com/testing.html

import {assert} from 'meteor/practicalmeteor:chai';
import {Tasks} from '../tasks';
import {PublicationCollector} from 'meteor/johanbrook:publication-collector';

describe('Tasks', function () {
    beforeEach(function () {
        Tasks.remove({});
        Tasks.insert({
            text: "test data",
            createdAt: new Date(),
        });
    });

    describe('tasks.all', function () {
        it('get all tasks', function (done) {
            const collector = new PublicationCollector();
            collector.collect('tasks', (collections) => {
                assert.equal(collections.tasks.length, 1);
                done();
            });
        });
    });

    describe('tasks.insert', function () {
        it('Insert tasks', function (done) {
            Tasks.addTask('newTask');

            assert.equal(Tasks.find().count(), 2);
            assert.equal(Tasks.find().fetch()[1].text, 'newTask');
            done();
        });
    });
});
