import Ember from 'ember';

export default Ember.ObjectController.extend({
  isEditing: false,
  needs: ['application'],

  belongsToUser: function() {
    var rantUser = this.model._data.user;
    var appUser = localStorage.currentUser ? localStorage.currentUser: null;
    if ((appUser != null) && (rantUser != null)) {
      if (rantUser.id === appUser) {
        return true;
      }
    }
  }.property().volatile(),

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
      var control = this;

      Ember.$('.new-rant').addClass('fade-out');
      Ember.run.later(function(){
        rant.destroyRecord();
        control.transitionToRoute('rants');
      }, 400);
    }


  }
});
