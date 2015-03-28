import Ember from "ember";

export default Ember.ArrayController.extend({
  // this is to get a new rant to go to the top

  needs: ['application', 'rant'],

  sortProperties: ['createdAt'],
  sortAscending: false,

  itemController: 'rant'

});
