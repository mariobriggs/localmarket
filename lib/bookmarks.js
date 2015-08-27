BookmarkCounts = new CouchDB.Database('bookmarkcounts');
if (Meteor.isServer) {
  BookmarkCounts._ensureIndex({recipeName: 'asc'});
}

Meteor.methods({
  'bookmarkRecipe': function(recipeName) {
    check(this.userId, String);
    check(recipeName, String);

    var affected = Meteor.users.update({
      _id: this.userId,
      bookmarkedRecipeNames: {$ne: recipeName}
    }, {
      $addToSet: {bookmarkedRecipeNames: recipeName}
    });

    if (affected) {
      var recipe = BookmarkCounts.findOne({recipeName: recipeName});
      if(recipe) {
        recipe.count += 1;
        BookmarkCounts.update(recipe);
      }
    }
      
  },

  'unbookmarkRecipe': function(recipeName) {
    check(this.userId, String);
    check(recipeName, String);

    var affected = Meteor.users.update({
      _id: this.userId,
      bookmarkedRecipeNames: recipeName
    }, {
      $pull: {bookmarkedRecipeNames: recipeName}
    });

    if (affected) {
      var recipe = BookmarkCounts.findOne({recipeName: recipeName});
      if(recipe) {
        recipe.count -= 1;
        BookmarkCounts.update(recipe);
      }
    }
  }
});

// Initialize bookmark counts. We could use upsert instead.
if (Meteor.isServer && BookmarkCounts.find().count() === 0) {
  Meteor.startup(function() {
    _.each(RecipesData, function(recipe, recipeName) {
      BookmarkCounts.insert({recipeName: recipeName, count: 0});
    });
  });
}