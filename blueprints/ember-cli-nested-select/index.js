module.exports = {
  normalizeEntityName: function() {},
  afterInstall: function() {
    return this.addBowerPackageToProject('sifter', '~0.4.1');
    return this.addPackageToProject('ember-cli-filter-by-query', '1.0.2');
  }
};
