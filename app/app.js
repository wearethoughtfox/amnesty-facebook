var App = Backbone.Marionette.Application.extend({
  region: '#app',

  onBeforeStart: function () {
    this.setLanguageFromDictionary();
  },

  onStart: function() {
    amnestyApp.mainRegion = this.getRegion();
    amnestyApp.Views.hello = new HelloWorld();
    amnestyApp.mainRegion.show(amnestyApp.Views.hello);
    amnestyApp.Views.hello.showChildView('facebookCallRegion', new HelloBtn());
  },

  loadFacebookApi: new Promise(function (resolve, reject) {
    (function(d, s, id){
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {return;}
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));// TODO: handle errors

    window.fbAsyncInit = function() {
      FB.init({
        appId       : '148573185670966',
        status      : true, // check login status
        cookies     : true, // enable cookies to allow server to access session,
        xfbml       : true,
        version     : 'v2.8'
      });
      FB.AppEvents.logPageView();
      resolve();
    };
  }),

  setLanguageFromDictionary: function (){
    var backgroundImage = dictionary.pick("_BACKGROUND");
    backgroundImage = backgroundImage["_BACKGROUND"];
    backgroundImage = "images/" + backgroundImage;
    document.getElementsByTagName('html')[0].setAttribute("lang", dictionary.getLang());
    document.getElementById("main").style.backgroundImage = "url(" + backgroundImage + ")";
  }

});

var amnestyApp = new App();
amnestyApp.Views = {};



$(document).ready(function(){
  amnestyApp.loadFacebookApi.then(function () {
    amnestyApp.start();
  });
});



