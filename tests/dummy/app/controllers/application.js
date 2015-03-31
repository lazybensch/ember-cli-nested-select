import Ember from 'ember';

export default Ember.Controller.extend({
  list: [
    {id: 1, label: 'eins'},
    {id: 2, label: 'zwei', children: [
        {id: 3, label: '1 - eins'},
        {id: 4, label: '1 - zwei'},
        {id: 5, label: '1 - drei'},
    ]},
    {id: 6, label: 'drei'},
  ]
});
