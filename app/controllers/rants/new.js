import Ember from "ember";

export default Ember.Controller.extend({
  actions: {
    newRant: function() {
      var title = this.get('newTitle');
      var body = this.get('newBody');
      Ember.$(".errors").html('');

      if (((title == null) || (title.length === 0) ) && ((body == null) || (body.length === 0) || (body.length < 144))) {
        Ember.$(".errors").append("<p>" + "Your rant must have a title." + "</p");
        Ember.$(".errors").append("<p>" + "Your rant must be at least 144 characters." + "</p");
      } else if ((title == null) || (title.length === 0)) {
        Ember.$(".errors").append("<p>" + "Your rant must have a title." + "</p");
      } else if (body == null || body.length < 144) {
        Ember.$(".errors").append("<p>" + "Your rant must be at least 144 characters." + "</p");
      } else if (body && title && body.trim() && title.trim()) {
        var rant = this.store.createRecord('rant', { title: title, body: body });
        this.set('newTitle', '');
        this.set('newBody', '');
        rant.save().then(function(){
          this.transitionToRoute('rants');
        }.bind(this));
      }
    }
  }
});
