Meteor.methods({
   getServerTime: () => {
       return (new Date).getTime();
   }
});