App.Collections.Escrows = Backbone.Collection.extend({

  model: App.Models.Escrow,

  url: function() {
    return App.base_url + '/escrows.json?auth_token=' + App.auth_token();
  }

});