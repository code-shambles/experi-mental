const yargs = require("yargs")
const { hideBin } = require("yargs/helpers")
const fruitGums = require("./fruitgums/index.js")

const argv = yargs(hideBin(process.argv))
  .command("find", "Finds fruit gums you like", {
    gums: [
      {
        color: "color of the fruit gum piece, may or may not be like the fruit",
        flavor: "the fruity taste it's imitating",
        shape: "shape of the fruit gum, not necessarily the fruit",
        size: "size of the fruit gum, in loose relation to the original fruit",
        surface:
          "imitation of the the original surface, referring to the shape object",
      },
    ],
  })
  .option("color", {
    alias: "c",
    description: "Select by color",
    type: "string",
  })
  .option("flavor", {
    alias: "f",
    description: "Select by flavor",
    type: "string",
  })
  .option("shape", {
    alias: "s",
    description: "Select by shape",
    choices: ["round", "oval", "wedge", "slice"],
    type: "string",
  })
  .option("size", {
    alias: "z",
    description: "Select by size",
    choices: ["s", "m", "l", "xl"],
    type: "string",
  })
  .option("surface", {
    alias: "u",
    description: "Select by surface structure",
    choices: ["bubbly", "bumpy", "smooth"],
    type: "string",
  })
  .help()
  .alias("help", "h").argv

const traits = ["color", "flavor", "shape", "size", "surface"]
const resultGums = []

function pickGum(traitName) {
  if (argv[traitName]) {
    const trait = argv[traitName].trim()

    Object.entries(fruitGums).forEach(([fruitGumName, fruitGumsTraits]) => {
      const fruitGum = { ...fruitGumsTraits, name: fruitGumName }

      if (fruitGum[traitName] === trait) {
        const resultGum = resultGums.find(
          (result) => result.name === fruitGum.name
        )

        if (resultGum) {
          resultGum.matchQuality += 1
        } else {
          resultGums.push({ ...fruitGum, matchQuality: 1 })
        }
      }
    })
  }
}

traits.forEach(pickGum)

resultGums.sort((resultGum) => resultGum.matchQuality)

console.log("\n-----------------------------------------")
console.log("I recommend you:\n")
console.log(resultGums)
