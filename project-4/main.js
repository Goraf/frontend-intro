var appModule = (function (window) {
  function Cipher(name) {
    this.cipherName = name;
  }

  Cipher.prototype.encryptMsg = function (msg) {
    window.console.error("Encryption not implemented!");
  }

  function CaesarCipher(offset) {
    Cipher.call(this, "Caesar cipher");

    this.charOffset = (typeof offset !== 'undefined') ? offset : 3;
  }

  CaesarCipher.prototype = Object.create(Cipher.prototype);
  CaesarCipher.prototype.constructor = CaesarCipher;

  CaesarCipher.prototype.encryptMsg = function (msg) {
    var encryptedMsg = "";
    var msgCharsCodes = [];
    var isLowerLatin = false;
    var isUpperLatin = false;
    var lowerA_code = "a".charCodeAt();
    var lowerZ_code = "z".charCodeAt();
    var upperA_code = "A".charCodeAt();
    var upperZ_code = "Z".charCodeAt();
    var alphabetRange = upperZ_code - upperA_code;

    for (var i = 0; i < msg.length; i++) {
      msgCharsCodes[i] = msg.charCodeAt(i);
      isLowerLatin = (msgCharsCodes[i] >= lowerA_code) &&
                     (msgCharsCodes[i] <= lowerZ_code);
      isUpperLatin = (msgCharsCodes[i] >= upperA_code) &&
                     (msgCharsCodes[i] <= upperZ_code);

      if (isLowerLatin || isUpperLatin) {
        msgCharsCodes[i] += this.charOffset;
        // loop alphabet
        if ((isLowerLatin && (msgCharsCodes[i] > lowerZ_code)) ||
            (isUpperLatin && (msgCharsCodes[i] > upperZ_code)))
        {
          msgCharsCodes[i] -= alphabetRange + 1;
        }
      }

      msgCharsCodes[i] = String.fromCharCode(msgCharsCodes[i]);
    }

    encryptedMsg = msgCharsCodes.join("");

    return encryptedMsg; 
  }

  function run() {
    var msg = window.prompt("Write a message you want to encrypt:");
    if (msg) {
      msg = msg.trim();
    }
    if (msg) {
      var cipher = new CaesarCipher();
      msg = cipher.encryptMsg(msg);
      window.console.log("Encrypted message: " + msg);
    } else {
      window.console.warn("No or empty message provided.");
    }
  }

  return {
    run: run
  }
})(window);

appModule.run();