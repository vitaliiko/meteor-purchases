Meteor.methods({
   getServerTime: () => {
       var time = (new Date).getTime();
       console.log(time);
       return time;
   }
});