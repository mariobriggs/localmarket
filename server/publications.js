Meteor.publish('bookmarkCounts', function() {
  return BookmarkCounts.find();
});

Meteor.publish('news', function() {
  return News.find({date: {$gt: '0'}}, {sort: {date: 'desc'},  limit: 1});
});

Meteor.publish('latestActivity', function () {
  return Activities.latest();
});

Meteor.publish('feed', function() {
  return Activities.find({date: {$gt: '0'}}, {sort: {date: 'desc'}, limit: 10});
});

Meteor.publish('recipe', function(name) {
  check(name, String);
  return [
    BookmarkCounts.find({recipeName: name}),
    Activities.find({recipeName: name})
  ];
});

// autopublish the user's bookmarks and admin status
Meteor.publish(null, function() {
  return Meteor.users.find(this.userId, {
    fields: {
      admin: 1,
      bookmarkedRecipeNames: 1,
      'services.twitter.profile_image_url_https': 1
    }
  });
})