const musicContainer = document.querySelector('.music-container')
/* three buttons down the row */
const prevBtn = document.querySelector('#prev')
const playBtn = document.querySelector('#play')
const nextBtn = document.querySelector('#next')
const audio = document.querySelector('#audio')
const progress = document.querySelector('.progress')
const progressContainer = document.querySelector('.progress-container')
const title = document.querySelector('#title')
const cover = document.querySelector('#cover')

// Song titles
// should match the songs in the music folder
const songs = ['Plastic Love', 'Peaches', 'Ready For It', 'N.Y. State of Mind', 'Money', 'Love Ya!']

// songIndex sets 'Plastic Love' to the default
let songIndex = 0

// Intiailly load song info into the DOM(document object model)
loadSong(songs[songIndex])

// Update song details(title, audio source, image source)
function loadSong(song) {
    // Get the text
    title.innerText = song;
    audio.src = `music/${song}.mp3`;
    cover.src = `images/${song}.jpg`;
}

function playSong() {
    musicContainer.classList.add('play')
    playBtn.querySelector('i.fa-solid').classList.remove('fa-play')
    playBtn.querySelector('i.fa-solid').classList.add('fa-pause')

    // HTML AUDIO TAG ALREADY HAS ITS OWN API
    audio.play()
}

function pauseSong() {
    musicContainer.classList.remove('play')
    playBtn.querySelector('i.fa-solid').classList.add('fa-play')
    playBtn.querySelector('i.fa-solid').classList.remove('fa-pause')
    
    audio.pause()
}

function updateProgress (e) {
    // takes in event object (e) for duration & current time
    const {duration, currentTime} = e.target
    const progressPercent = (currentTime / duration) * 100
    progress.style.width = `${progressPercent}%`
}

function setProgress (e) {
    const width = this.clientWidth
    const clickX = e.offsetX
    const duration = audio.duration

    // We can set the current time
    audio.currentTime = (clickX / width) * duration
}

function prevSong() {
    songIndex--

    if(songIndex < 0){
        // moves to the end
        songIndex = songs.length - 1
    }

    loadSong(songs[songIndex])

    playSong()
}

function nextSong() {
    songIndex++

    if(songIndex > songs.length - 1){
        // moves to the beginning
        songIndex = 0
    }

    loadSong(songs[songIndex])

    playSong()
}

// Event listeners
playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play')
    if(isPlaying){
        pauseSong()
    }
    else{
        playSong()
    }
})

// Change song events
prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong)

audio.addEventListener('timeupdate', updateProgress)

progressContainer.addEventListener('click', setProgress)

audio.addEventListener('ended', nextSong)