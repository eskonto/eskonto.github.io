App.Views.EscrowsList = Backbone.View.extend({

  template: function(context) {
    var source   = $("#escrows_tmpl").html();
    var template = Handlebars.compile(source);

    return template(context);
  },

  initialize: function() {
    this.collection = new App.Collections.Escrows();
    this.collection.on('reset', this.render, this);
  },

  render: function() {
    this.$el.html(this.template({ escrows: this.collection.toJSON() }));
    this.show();
  },

  show: function() {
    $('#content').html(this.el);
  }

});