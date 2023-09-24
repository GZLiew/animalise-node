const fs = require("fs");
const { Animalese } = require("./animalese");
const { exec } = require("child_process");

function generateWav(synth) {
  return synth.Animalese("Testing out animalese.js. Did it work?", true, "1.5").dataURI;
}

async function play() {
  var synth = new Animalese("animalese.wav");
  const dataUri = generateWav(synth);
  const buffer = Buffer.from(dataUri.split("base64,")[1], "base64");
  fs.writeFileSync("/tmp/audio.wav", buffer);
  exec("afplay /tmp/audio.wav");
}

play();
