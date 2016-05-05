'use strict'
const $gridContainer = $('#gridContainer')
const $scrollGrid = $gridContainer.find('.scrollBars')
var celerateScrollX, celerateScrollY, scrollWidth, scrollHeight,
gridScrollX, gridScrollY
var moveX = 0
var moveY = 0
var move = false
var canAnimate = false

// Childs calls
require('../grid')

$(window).load(function() {
  setTimeout(() => {
    scrollWidth = $scrollGrid[0].clientWidth
    scrollHeight = $scrollGrid[0].clientHeight
    // $scrollGrid.scrollWidth
    // $scrollGrid.scrollHeight
    $scrollGrid[0].scrollTop = ($scrollGrid[0].scrollHeight - scrollHeight) / 2
    $scrollGrid[0].scrollLeft = ($scrollGrid[0].scrollWidth - scrollWidth) / 2
  }, 100)
  setTimeout(() => {
    toViewPort()
    canAnimate = true
  }, 2000)
})


function toViewPort (){
  let boost = 8
  let lower = 0.1

  if (move) {
    moveX = celerateScrollX / boost
    moveY = celerateScrollY / boost

  } else {
    if (moveX > 0 ) {
      moveX = moveX - lower
    }
    if (moveX < 0) {
      moveX = moveX + lower
    }
    if (moveY > 0) {
      moveY = moveY - lower
    }
    if (moveY < 0) {
      moveY = moveY + lower
    }
  }

  if (moveX > -0.1 && moveX < 0.1) moveX = 0
  if (moveY > -0.1 && moveY < 0.1) moveY = 0

  $scrollGrid[0].scrollLeft = $scrollGrid[0].scrollLeft + moveX
  $scrollGrid[0].scrollTop = $scrollGrid[0].scrollTop + moveY

  canAnimate = true
  if (moveX != 0 && moveY != 0){
    requestAnimationFrame(toViewPort)
    canAnimate = false
  } else {
    canAnimate = true
  }
}

// Move view towards mouse
$scrollGrid.mousemove(function(event) {
  let x = event.clientX
  let y = event.clientY

  let middleW = scrollWidth / 2
  let middleH = scrollHeight / 2

// 512 = 100
//  x >>>
  celerateScrollX = Math.floor(((x - middleW) * 100 ) / middleW)
  celerateScrollY = Math.floor(((y - middleH) * 100 ) / middleH)

  let radio = 20

  if (celerateScrollX > radio || celerateScrollX < radio * -1 || celerateScrollY > radio || celerateScrollY < radio * -1) {
    move = true
    if (canAnimate) {
      toViewPort()
    }

  } else {
    move = false

  }

}).mouseleave( function (e) {
  move = false
});

$(window).on('resize orientationChange', function (e) {
    var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
    scrollWidth = $scrollGrid[0].clientWidth
    scrollHeight = $scrollGrid[0].clientHeight

    $gridContainer.css({
      height: h
    })
});

module.exports = $gridContainer
