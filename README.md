# advert-block-detection

Simple demo of some techniques used to detect the blocking of display of adverts.

    npm install
    npm run start
    navigate to localhost:8080
    watch console
    toggle add blocker
    refresh
    watch console

[Demo](http://naglafar.github.io/advert-block-detection/) - your add blocker might block the app entirely!

Advert blockers are smart so generally trying to out smart them will fail. Also with the rise of ad blockers which run at the tcp/ip lvl i.e. not in the browser you cant really do much to stop them.

So the best practise is simply to detect if adverts aren't being displayed after a couple of attemps (could fail a few times due to network lag etc) be dumb put them in a nice div with class name adverts and simply check the css. 99.9% of ad blockers simply put display: none; on that div all you have to do is check for that.

Now you can be fairly sure something perhaps an ad blocker is interfering with the display of your adverts the next choice is yours but annoying your users tends to drive down your user base.