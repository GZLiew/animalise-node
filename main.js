function loadScript(url) {
  return new Promise(function (resolve) {
    let scriptEle = document.createElement("script");
    scriptEle.setAttribute("src", url);
    document.head.appendChild(scriptEle);
    // success event
    scriptEle.addEventListener("load", () => {
      console.log("loaded");
      resolve();
    });
    // error event
    scriptEle.addEventListener("error", (ev) => {
      console.log("Error on loading file", ev);
    });
  });
}

function generateWav(synth) {
  return synth.Animalese("text", true, "1.5").dataURI;
}

async function play() {
  await loadScript("riffwave.js");
  await loadScript("Blob.js");
  await loadScript("FileSaver.min.js");
  await loadScript("animalese.js");

  var synth = new Animalese("animalese.wav", function() {
    var audio = new Audio();
    audio.src = generateWav(synth);
    audio.muted = true;
    audio.play();
  });
}

document.addEventListener('DOMContentLoaded', function() {
  play();
})
