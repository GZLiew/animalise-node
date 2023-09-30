const fs = require("fs");
const path = require("path");
const { Animalese } = require("./animalese");
const sound = require("sound-play");
const readline = require("readline");

const SHORTEN = true;
const pitch = "1.8";

function readStdin() {
  return new Promise(function (resolve) {
    const rl = readline.createInterface({
      input: process.stdin,
    });

    let data = "";

    rl.on("line", function (line) {
      data += line + "\n";
    });

    rl.on("close", function () {
      resolve(data);
    });
  });
}

async function generateWav(synth) {
  const text = await readStdin();
  return synth.Animalese(text || "no args", SHORTEN, pitch).dataURI;
}

async function play() {
  var synth = new Animalese(path.resolve(__dirname, "./animalese.wav"));
  const dataUri = await generateWav(synth);
  const buffer = Buffer.from(dataUri.split("base64,")[1], "base64");
  fs.writeFileSync("/tmp/audio.wav", buffer);
  sound.play("/tmp/audio.wav");
}

play();
