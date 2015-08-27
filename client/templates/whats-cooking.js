Template.feed.helpers({
  activities: function() {
    return Activities.find({}, {sort: {date: 'desc'}});
  },
  ready: function() {
    return Router.current().feedSubscription.ready();
  }
})