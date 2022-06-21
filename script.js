const imageElement = document.querySelector('img');
const songTitle = document.getElementById('title');
const songArtist = document.getElementById('artist');
const currentTime = document.getElementById('current-time');
const duration = document.getElementById('duration');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const music = document.querySelector('audio');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('previous');
const nextBtn = document.getElementById('next');
const songs = [
    {
        title: 'Fun Life',
        artist: 'Zakhar Valaha',
        image: 'image-1',
        clip: 'audio-1',
    },
    {
        title: 'Sacred Garden',
        artist: 'Guilherme Bernards',
        image: 'image-2',
        clip: 'audio-2',
    },
    {
        title: 'Cheerful Piano',
        artist: 'Alex Grohl',
        image: 'image-3',
        clip: 'audio-3',
    },
    {
        title: 'Motivational Day',
        artist: 'Michael Korbin',
        image: 'image-4',
        clip: 'audio-4',
    },
    {
        title: 'Parallel Universe',
        artist: 'Andrew KN',
        image: 'image-5',
        clip: 'audio-5',
    }
]

//Boolean to find that the audio is playing or not
let isPlay = false;
// Function to play audio
function playClip(){
    isPlay = true;
    playBtn.classList.add('fa-pause');
    music.play();
}

//Function to pause audio
function pauseClip(){
    isPlay = false;
    playBtn.classList.remove('fa-pause')
    music.pause();
}
//Function to load new song into DOM
function loadSong(song){
    songTitle.textContent = song.title;
    songArtist.textContent = song.artist;
    imageElement.src = `images/${song.image}.jpg`;
    music.src = `clips/${song.clip}.mp3`;
}
//Song index to determine the number of song
let songIndex = 0;
//Function to play previous song
function prevSong(song){
    songIndex--;
    if(songIndex<0){
        songIndex=songs.length-1;
    }
    loadSong(songs[songIndex]);
    playClip();
}
//Function to play next song
function nextSong(song){
    songIndex++;
    if(songIndex>songs.length-1){
        songIndex=0;
    }
    loadSong(songs[songIndex]);
    playClip();
}

// This function update the progress bar when song is in play mode. It also update current time and duration of song.
function updateProgress(e){
    if(isPlay){
        const {currentTime, duration} = e.srcElement;
        let progressPercent = (currentTime/duration)*100;
        progress.style.width = `${progressPercent}%`;

        const currentTimeMinutes = Math.floor(currentTime/60);
        let currentTimeSeconds = Math.floor(currentTime%60);
        if(currentTimeSeconds<10){
            currentTimeSeconds = `0${currentTimeSeconds}`;
        }
        currentTimeEl.textContent = `${currentTimeMinutes}:${currentTimeSeconds}`;

        const durationMinutes = Math.floor(duration/60);
        let durationSeconds = Math.floor(duration%60);
        if(durationSeconds<10){
            durationSeconds = `0${durationSeconds}`;
        }
        if(duration){
        durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
        }
    }
}
// Function to update progress bar when a user clicks on it.
function updateProgressBar(e){
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const {duration} = music;
    music.currentTime = (clickX/width)*duration;
}

//Event Listeners
playBtn.addEventListener('click',() => isPlay ? pauseClip() : playClip());
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('timeupdate', updateProgress);
music.addEventListener('ended',nextSong);
progressContainer.addEventListener('click',updateProgressBar);