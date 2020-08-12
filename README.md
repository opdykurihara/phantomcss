# PhantomCSSとは
https://github.com/HuddleEng/PhantomCSS

ビジュアルリグレッションテストを実行するためのツール。  
ヘッドレスブラウザーを立ち上げ、Webサイトののスクリーンショットを撮り、Webサイト変更前後のスクリーンショットと比較できる。  
※現在は開発終了。

## PhantomCSSを構成するコンポーネント
* CasperJS – PhantomJSやSlimerJSブラウザーを動作させるためのツール。Webページを開いたり、ボタンをクリックしてスクリーンショットを撮影する
* PhantomJSまたはSlimerJS – PhantomJSはchromeのヘッドレスブラウザでSlimerJSはFirefoxのヘッドレスブラウザ

## こんな感じで見た目の差分を確認できる
![body_0 fail](https://user-images.githubusercontent.com/14832711/89968669-5acc6480-dc8f-11ea-9a95-0f76a9394f0d.png)

## インストール
`$ npm i phantomjs phantomcss casperjs --save-dev`

## テストスイートの作成
Node.jsスクリプトでテストスイートを作成する

* phantomjsでテスト実行したサンプル
```
var phantomcss = require('phantomcss');

phantomcss.init({
  rebase: casper.cli.get('rebase'),

  mismatchTolerance: 0.003,

  onFail: function(test){
    console.log('onFail');
    console.log(test.filename, test.mismatch);
  },

  onPass: function(test){
    console.log('onPass');
    console.log(test.filename);
  },

  onComplete: function(allTests, noOfFails, noOfErrors){
    allTests.forEach(function(test){
      if(test.fail){
        console.log('onComplete');
        console.log(test.filename, test.mismatch);
      }
    });
  },

  onCaptureFail: function(ex, target) {
    console.log('Capture of ' + target + ' failed due to ' + ex.message);
  }
});

// start a casper test
casper.test.begin('TEST', function(test) {

  phantomcss.init({
    rebase: casper.cli.get('rebase')
  })

  casper.start();
  casper.viewport(320, 568);

  casper.thenOpen('http://localhost:3000/j_air_on_sp/templates/index/index.html');
  casper.then(function() {
    phantomcss.screenshot('body', 'body');
  });

  casper.then(function () {
    phantomcss.compareAll();
  });

  casper.run(function() {
    console.log('\nTHE END.');
    casper.test.done();
  });
});
```
## テスト実行
`$ casperjs test test.js`

## テストコードを書いてみて
PhantomCSSだけではなく、PhantomCSSを構成するコンポーネントも開発終了で思うようにテストコードが書けなかった

* FirefoxのヘッドレスブラウザであるslimerjsはFirefox ver.53～ver.59以外で利用できなかった（現行の最新Firefoxはver.78）
* chromeのヘッドレスブラウザPhantomJSは開発終了で利用できるモジュールが少ないため簡単にテストコードを書けなかった（自分でモジュールを作るなどの工夫が必要）
 
## まとめ
Casper+phantomjs(もしくはslimerjs)+phantom.cssでリグレッションテストをしたかったが、実運用は難しいことが分かったので、
代案としてbackstop.jsの利用について後期に検討したい。
* [BackstopJS](https://github.com/garris/BackstopJS)