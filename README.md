Local Market
============

Local Market is an open source app powered by Meteor and made by [Percolate Studio](http://percolatestudio.com). In this example app we explore intermediate techniques:

  - Using a sample database to generate lists and items
  - Integrating OAUTH with Meteor's accounts-ui package
  - Cordova integration to use device phone and GPS
  - Mobile UI & UX
  
#### This repo shows you how use the app with CouchDB/Cloudant. You can also view the [changes needed](https://github.com/mariobriggs/localmarket/commit/79d7b90d41d1b738346d2263ca414fe12402bd03?diff=split)

```  
// clone this repo
$ git clone https://github.com/mariobriggs/localmarket.git repo

//create the localmarket meteor app 
$ meteor create --example localmarket

// move into app folder
$ cd localmarket

// copy over the changes for couchdb
$ cp -rf ../repo/ .

// install couchdb meteor module
$ meteor add cloudant:couchdb

// point to your couchdb server
$ export COUCHDB_URL=https://username:password@server:port

// run the app
$ meteor run  
```    
