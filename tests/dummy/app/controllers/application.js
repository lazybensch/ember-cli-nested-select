import Ember from 'ember';

export default Ember.Controller.extend({
  list: [
    {id: 1, label: 'eins'},
    {id: 2, label: 'zwei', children: [
      {id: 3, label: '1 - eins'},
      {id: 4, label: '1 - zwei'},
      {id: 5, label: '1 - drei', children: [
        {id: 6, label: '1-3 - eins' },
        {id: 7, label: '1-3 - zwei' },
        {id: 8, label: '1-3 - drei' },
      ]},
    ]},
    {id: 9, label: 'drei'},
  ]
});
