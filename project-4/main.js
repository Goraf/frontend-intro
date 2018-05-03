var appModule = (function(window) {
  function run() {
    console.log("works");
  }

  return {
    run: run
  }
})(window);

appModule.run();