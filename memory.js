
$(document).ready(function () {

  // maxim 104 tiles, even number
  const gTileSize = 100
  const gGap = 20
  const gRows = 6
  const gColumns = 6
  const gSourceImages = ["Ant", "Chicken", "Fish", "Leopard", "Sheep",
    "Aquarium", "ClownFish", "Fly", "Lion", "Snail", "Badger", "Corgi",
    "Frog", "Llama", "Spider", "BatFace", "Cow", "Giraffe", "Mite",
    "Starfish", "Bear", "Crab", "Gorilla", "Mosquito", "Stork", "Beaver",
    "Deer", "Grasshopper", "Octopus", "Tentacles", "Bee", "Dinosaur",
    "HornetHive", "Panda", "Turtle", "Bird", "DogPark", "Hornet",
    "PigWithLipstick", "Unicorn", "Bug", "Dog", "Horse", "Pig",
    "Wasp", "Bull", "Dolphin", "Hummingbird", "Prawn", "Whale",
    "Bumblebee", "Dragonfly", "Puffin", "Wolf",
    "Butterfly", "Duck", "Insect", "Rabbit", "CatFootprint",
    "Elephant", "Kangaroo", "Rhinoceros", "Cat", "Falcon",
    "KiwiBird", "Seahorse", "Caterpillar", "FishFood", "Ladybird", "Shark"]
  let gPlayImages
  let gMonitor
  let gOpenTiles

  init()

  function init() {
    gPlayImages = []
    gMonitor = []
    gOpenTiles = 0

    $("#board").html("")
    $("#playButton").on("click", function () {
      init()
    })

    $("#won").css("visibility", "hidden")
    $("#board").css("grid-template-columns", "repeat(" + gColumns + ", 1fr)")
    $("#board").css("gap", gGap + "px")
    $("#board").css("padding", 2 * gGap + "px")
    $("#board").css("width", gColumns * (gTileSize + gGap) + gGap + "px")
    $("#board").css("height", gRows * (gTileSize + gGap) + gGap + "px")

    prepareImages()
    drawTiles()
    setTimeout(function () {
      hideAllTiles()
    }, 1000);

  }

  function prepareImages() {
    let tempImages = gSourceImages
    for (let i = 0; i < (gRows * gColumns) / 2; i++) {
      let imgIndex = Math.floor(Math.random() * tempImages.length)
      gPlayImages.push(gSourceImages[imgIndex])
      gPlayImages.push(gSourceImages[imgIndex])
      tempImages.splice(imgIndex, 1)
      console.log(gPlayImages, tempImages)
    }
  }

  function drawTiles() {
    for (let i = 0; i < gRows; i++) {
      gMonitor.push([])
      for (let j = 0; j < gColumns; j++) {
        $("#board").append("<div class=tile id=id_" + i + "_" + j + "></div>")
        let imgIndex = Math.floor(Math.random() * gPlayImages.length)
        $("#id_" + i + "_" + j).css("background-image", "url(images/" + gPlayImages[imgIndex] + ".png)")
        // $("#id_" + i + "_" + j).html(gPlayImages[imgIndex])
        $("#id_" + i + "_" + j).on("click", function () {
          if (gMonitor[i][j]["found"]) return
          if (gOpenTiles > 1) {
            hideNotFoundTiles()
            gOpenTiles = 0
          }
          gOpenTiles++
          showTile(i, j)
          checkGame()
        })
        gMonitor[i].push({
          image: gPlayImages[imgIndex],
          up: false,
          found: false,
        })
        gPlayImages.splice(imgIndex, 1)
      }
    }
    $(".tile").css("width", gTileSize + "px")
    $(".tile").css("height", gTileSize + "px")
    $(".tile").css("background-size", gTileSize + "px")
  }

  function hideNotFoundTiles() {
    for (let i = 0; i < gRows; i++) {
      for (let j = 0; j < gColumns; j++) {
        if (!gMonitor[i][j]["found"]) hideTile(i, j)
      }
    }
  }


  function hideAllTiles() {
    for (let i = 0; i < gRows; i++) {
      for (let j = 0; j < gColumns; j++) {
        hideTile(i, j)
      }
    }
  }

  function checkGame() {
    let upTiles = []
    for (let i = 0; i < gRows; i++) {
      for (let j = 0; j < gColumns; j++) {
        if (gMonitor[i][j]["found"]) continue
        if (gMonitor[i][j]["up"]) upTiles.push({
          i: i,
          j: j,
          image: gMonitor[i][j]["image"]
        })
        if (upTiles.length == 2 && upTiles[0]["image"] == upTiles[1]["image"]) {
          gMonitor[upTiles[0]["i"]][upTiles[0]["j"]]["found"] = true
          gMonitor[upTiles[1]["i"]][upTiles[1]["j"]]["found"] = true
        }
      }
    }
    checkFinito()
  }

  function checkFinito() {
    let finito = true
    for (let i = 0; i < gRows; i++) {
      for (let j = 0; j < gColumns; j++) {
        if (!gMonitor[i][j]["found"]) {
          finito = false
          break
        }
      }
    }
    if (finito) {
      $("#won").css("visibility", "visible")
    }
  }

  function hideTile(i, j) {
    $("#id_" + i + "_" + j).css("background-image", "url(images/Icons8Logo.png)")
    gMonitor[i][j]["up"] = false
  }

  function showTile(i, j) {
    $("#id_" + i + "_" + j).css("background-image", "url(images/" + gMonitor[i][j]["image"] + ".png)")
    gMonitor[i][j]["up"] = true
  }


})

