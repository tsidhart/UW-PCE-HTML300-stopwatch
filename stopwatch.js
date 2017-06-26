// button controls
const start = document.querySelector('button.start')
const stop = document.querySelector('button.stop')
const reset = document.querySelector('button.reset')
const lap = document.querySelector('button.lap')

// DOM elements that I need to update
const lapList = document.querySelector('#lapList')
const stopwatchTime = document.querySelector('#stopwatchTime')

// constants that shouldn't ever change
const laps = []
const intervalRate = 10 // update the stopwatch every 10 milliseconds

// values that will change pretty often
let intervalId = null
let rawTime = 0

// turns the time into a human readable format
function formatTime (raw) {
  let seconds = Math.floor(raw / 1000)
  let fractionalSeconds = (raw % 1000) / 1000
  let minutes = Math.floor(seconds / 60)
  seconds = seconds - (60 * minutes) + fractionalSeconds

  return `${zeroPad(minutes)}:${zeroPad(seconds.toFixed(2))}`
}

function stopwatchStart(event) {
  event.preventDefault()
  console.log('started')

  //evry 10 milliseconds, update the stopwatch
  intervalId = setInterval(stopwatchUpdate,intervalRate)
  document.createElement("li")
}

// adds a leading zero because humans like them
function zeroPad (value) {
  let pad = value < 10 ? '0' : ''
  return `${pad}${value}`
}

// start the stopwatch by creating a new interval
// we'll store the interval id so we can manipulate the interval later
function stopwatchStart (event) {
  event.preventDefault()
  console.log('started!')

  // every 10 milliseconds, update the stopwatch
  intervalId = setInterval(stopwatchUpdate, intervalRate)
}

// adds the interval to the stopwatch time since the last "tick"
// then update the DOM with the new stopwatch time
function stopwatchUpdate () {
  rawTime += intervalRate
  stopwatchTime.innerHTML = formatTime(rawTime)
}

// stops the stopwatch by clearing the interval
function stopwatchStop (event) {
  event.preventDefault()
  console.log('stopped!')

  clearInterval(intervalId)
}

function stopwatchReset(event) {
  event.preventDefault()
  console.log('reset!')

  rawTime = 0
  stopwatchTime.innerHTML = formatTime(rawTime)
  lapList.innerHTML = ''
}

function stopwatchLap(event) {
  event.preventDefault()
  console.log('lap!')

  var l = document.createElement("li")
  l.innerHTML = formatTime(rawTime)
  lapList.appendChild(l)
}

document.addEventListener("DOMContentLoaded", function () {
  console.log('ready!')

  start.addEventListener("click", stopwatchStart)
  stop.addEventListener("click", stopwatchStop)
  reset.addEventListener("click", stopwatchReset)
  lap.addEventListener("click", stopwatchLap)
})
