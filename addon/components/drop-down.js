import Ember from 'ember';
import layout from '../templates/components/drop-down';
import computedFilterByQuery from 'ember-cli-filter-by-query';

export default Ember.Component.extend({
  layout: layout,
  classNames: 'drop-down',

  idKey: 'id',
  infoKey: 'info',
  labelKey: 'label',
  childrenKey: 'children',

  _content: function() {
    return this.get('selectedContent') || this.get('content');
  }.property('content', 'selectedContent').readOnly(),

  convertedContent: Ember.computed.map('_content', function(entry) {
    return this.wrap(entry);
  }).readOnly(),

  filteredContent: computedFilterByQuery('convertedContent', 'label', 'query').readOnly(),

  preview: function() {
    var preview = this.get('filteredContent.firstObject.label');
    var query = this.get('query');

    if (!preview) { return query; }
    preview = preview.split(query).join('<b>'+ query +'</b>');
    return Ember.String.htmlSafe(preview);
  }.property('filteredContent.firstObject.label', 'query'),

  wrap: function(entry) {
    return {
      id: Ember.get(entry, this.get('idKey')),
      info: Ember.get(entry, this.get('infoKey')),
      label: Ember.get(entry, this.get('labelKey')),
      children: Ember.get(entry, this.get('childrenKey'))
    };
  },

  didInsertElement: function() {
    var el = this.$();
    var list = el.find('.list');
    list.appendTo('body');
    list.css({
      'position': 'absolute',
      'top': el.offset().top + el.height(),
      'left': el.offset().left,
    });
  },

  actions: {
    revert: function() {
      this.set('selectedContent', null);
      this.set('selected', null);
    },

    select: function(entry) {
      if (entry.children) {
        this.set('selectedContent', entry.children);
      } else {
        this.set('selected', entry);
      }
    }
  }

});
