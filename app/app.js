var App = Backbone.Marionette.Application.extend({
  region: '#app',

  onStart: function() {
    this.showView(new HelloWorld());
    console.log (textStrings);
  }
});

var amnestyApp = new App();
amnestyApp.start();