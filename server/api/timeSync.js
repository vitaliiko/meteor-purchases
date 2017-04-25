Meteor.methods({
   getServerTime: () => {
       var time = (new Date).getTime();
       return time;
   }
});