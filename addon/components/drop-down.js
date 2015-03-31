import Ember from 'ember';
import layout from '../templates/components/drop-down';

export default Ember.Component.extend({
  layout: layout,
  classNames: 'drop-down',

  didInsertElement: function() {
    var el = this.$()
    var list = el.find('.list');
    list.appendTo('body');
    list.css({
      'position': 'absolute',
      'top': el.offset().top + el.height(),
      'left': el.offset().left,
    });
  }
});
