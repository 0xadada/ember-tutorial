import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['list-filter'],
  value: '',

  init() {
    this._super(...arguments);
    this.get('filter')('').then( (results) => this.set('results', results) );
  },

  actions: {
    handleFilterEntry() {
      // get the <input> value (bound to an Ember property)
      let filterInputValue = this.get('value');

      // get the components 'filter' property, which is assigned to
      // an Ember action defined in the views controller
      let filterAction = this.get('filter');
      // call the Ember action and update its result to this components
      // `results` property
      filterAction(filterInputValue).then(
        (filterResults) => this.set('results', filterResults)
      );
    },
  }
});
