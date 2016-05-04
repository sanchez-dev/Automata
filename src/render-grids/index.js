'use strict'

const $gridContainer = require('../grid-container')

var template = `
<div class="corpsePiece">
  <div class="position">
    {{pos}}
  </div>
  <div class="piece">
    {{id}}
  </div>
</div>
`

function renderGrid(grid) {
  let dimension = Math.sqrt(grid.grid.length)
  let $grid = $gridContainer.find('.grid')
  let $blankSpace = $gridContainer.find('.blankSpace')
  let size = 400
  let x = 0
  let y = 0
  let bucle = 0

  grid.grid.forEach((piece) => {
    let item = template
    .replace('{{id}}', piece.id)
    .replace('{{pos}}', piece.pos)

    let $item = $(item)

    $item.css({
      width: size,
      height: size,
      left: x,
      top: y
    })

    x = x + size
    bucle = bucle + 1

    if (bucle >= dimension) {
      y = y + size
      x = 0
      bucle = 0
    }

    $grid.append($item)
  })
    // center in the viewport
    let h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)

    $gridContainer.css({
      height: h
    })

    let hGrid = size * dimension
    let wGrid = size * dimension

    $blankSpace.css({
      height: hGrid + size,
      width: wGrid + size
    })

    $grid.css({
      height: hGrid,
      width: wGrid
    })

    // $gridContainer.scrollTop( 500 )
    // $gridContainer.scrollLeft( 500 )
}

module.exports = renderGrid