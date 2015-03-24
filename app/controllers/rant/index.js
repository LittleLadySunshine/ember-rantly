import Ember from 'ember';

export default Ember.ObjectController.extend({
  isEditing: false,

  actions: {
    editRant: function(){
      this.set('isEditing', true);
    },

    saveRant: function(rant) {
      var title = this.get('title');
      var body = this.get('body');
      Ember.$(".errors").html('');

      if (((title == null) || (title.length === 0) ) && ((body == null) || (body.length < 144))) {
        Ember.$(".errors").append("<p>" + "Your rant must have a title." + "</p");
        Ember.$(".errors").append("<p>" + "Your rant must be at least 144 characters." + "</p");
      } else if ((title == null) || (title.length === 0)) {
        Ember.$(".errors").append("<p>" + "Your rant must have a title." + "</p");
      } else if (body == null || body.length < 144) {
        Ember.$(".errors").append("<p>" + "Your rant must be at least 144 characters." + "</p");
      } else if (body && title && body.trim() && title.trim()) {
        rant.set('title', title);
        rant.set('body', body);
        rant.save().then(function() {
          this.set('isEditing', false);
          this.transitionToRoute('rants');
        }.bind(this));
      }
    },

    cancelRant: function(){
      this.set('isEditing', false);
      this.transitionToRoute('rant');
    },

    deleteRant: function(rant) {
      Ember.$('.new-rant').fadeOut();
      var timing = 3000;

      Ember.run.later(function() {
        rant.deleteRecord();
        rant.save().then(function(){
          this.transitionToRoute('rants');
        }.bind(this));
      }, timing);
    }


  }
});
