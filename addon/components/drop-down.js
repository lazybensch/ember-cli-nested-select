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

  listVisible: false,
  showList: function() {
    this.set('listVisible', true);
    var _this = this;
    Ember.run.schedule('afterRender', function() {
      _this.$().find('input').focus();
    });
  },

  bindClickHandler: function() {
    if (this.get('listVisible')) {
      Ember.$('body').bind('click.drop-down', {component: this}, this.clickHandler );
    } else {
      Ember.$('body').unbind('click.drop-down');
    }
  }.observes('listVisible').on('didInsertElement'),

  clickHandler: function(event) {
    var target = Ember.$(event.target);
    var component = event.data.component;

    if (!target.hasClass('keep-drop-down') && !target.parents().hasClass('keep-drop-down')) {
      component.set('selectedContent', null);
      component.set('listVisible', false);
    }
  },

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
    var list = el.find('.drop-down-list');
    list.appendTo('body');
    list.css({
      'position': 'absolute',
      'top': el.offset().top + el.height(),
      'left': el.offset().left,
      'width': el.width()
    });
  },

  mouseEnter: function() {
    this.set('showRevert', true);
  },

  mouseLeave: function() {
    this.set('showRevert', false);
  },

  select: function(entry) {
    this.set('query', null);
    if (entry.children) {
      this.set('selectedContent', entry.children);
    } else {
      this.set('selectedContent', null);
      this.set('selected', entry);
      this.set('listVisible', false);
    }
  },

  actions: {

    showList: function() {
      this.showList();
    },

    revert: function() {
      this.set('selectedContent', null);
      this.set('selected', null);
      this.set('query', null);
    },

    quickSelect: function() {
      this.select( this.get('filteredContent.firstObject') );
    },

    select: function(entry) {
      this.select(entry);
    }
  }

});
