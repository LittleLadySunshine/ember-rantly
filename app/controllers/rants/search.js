import Ember from "ember";

export default Ember.ArrayController.extend({
  queryParams: ['term'],
  term: null,

  results: function() {
    return this.store.find('rant', { find: this.get('term') });
  }.property('term'),

  actions: {
    editRant: function(){
      this.set('isEditing', true);
    },

    saveRant: function(rant) {
      var title = this.get('title');
      var body = this.get('body');
      if (body && title) {
        rant.set('title', title);
        rant.set('body', body);
        rant.save().then(function() {
          this.transitionToRoute('rants');
        }.bind(this));
      }
      this.set('isEditing', false);
    },

    cancelRant: function(){
      this.set('isEditing', false);
      this.transitionToRoute('rants');
    },

    deleteRant: function(rant) {
      rant.deleteRecord();
      rant.save().then(function(){
        this.transitionToRoute('rants');
      }.bind(this));
    }
  }

});
