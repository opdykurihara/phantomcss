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
  casper.viewport(320, 1000);

  casper.thenOpen('http://localhost:3000/w_air_on_sp/templates/index/index-open.html');
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
