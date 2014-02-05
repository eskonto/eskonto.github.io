App.Models.Escrow = Backbone.Model.extend({

  url: function() {
    return App.base_url + '/escrows/' + this.id + '.json?auth_token=' + App.auth_token();
  }

});