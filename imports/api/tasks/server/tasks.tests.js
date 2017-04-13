// Tests for the links publications
//
// https://guide.meteor.com/testing.html

import {assert} from 'meteor/practicalmeteor:chai';
import {Tasks, addTask} from '../tasks';
import StubCollections from 'meteor/hwillson:stub-collections';
import {PublicationCollector} from 'meteor/johanbrook:publication-collector';

describe('Tasks', function () {
    beforeEach(function () {
        StubCollections.stub(Tasks);
    });

    afterEach(function () {
        StubCollections.restore();
    });

    describe('tasks.all', function () {
        it('get all tasks', function (done) {
            Tasks.insert({a: 'document'});

            assert.equal(Tasks.find().count(), 1);
            done();
        });
    });

    describe('tasks.insert', function () {
        it('Insert tasks', function (done) {
            addTask.call({text: 'newTask'});

            assert.equal(Tasks.find().count(), 1);
            assert.equal(Tasks.find().fetch()[0].text, 'newTask');
            done();
        });
    });
});
