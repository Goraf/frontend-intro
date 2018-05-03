var appModule = (function (window) {
  function Cipher(name) {
    this.cipherName = name;
  }

  Cipher.prototype.encryptMsg = function (msg) {
    window.console.warn("Encryption not implemented!");
  }

  function CaesarCipher() {
    Cipher.call(this, "Caesar cipher");
  }

  CaesarCipher.prototype = Object.create(Cipher.prototype);
  CaesarCipher.prototype.constructor = CaesarCipher;

  CaesarCipher.prototype.encryptMsg = function (msg) {
    var encryptedMsg = "";
    var msgCharsCodes = [];
    var charOffset = 3;
    var alphabetRange = "Z".charCodeAt() - "A".charCodeAt();
    for (var i = 0; i < msg.length; i++) {
      msgCharsCodes[i] = msg.charCodeAt(i);
      var isLowerLatin = msgCharsCodes[i] >= "a".charCodeAt() && msgCharsCodes[i] <= "z".charCodeAt();
      var isUpperLatin = msgCharsCodes[i] >= "A".charCodeAt() && msgCharsCodes[i] <= "Z".charCodeAt();

      if (isLowerLatin || isUpperLatin) {
        msgCharsCodes[i] += charOffset;
        if ((isLowerLatin && msgCharsCodes[i] > "z".charCodeAt()) || (isUpperLatin && msgCharsCodes[i] > "Z".charCodeAt())) {
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
    msg = msg.trim();
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