const audioPlayer = document.getElementById('audio-player');
const playBtn = document.getElementById('play-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const songList = document.getElementById('song-list');
const songTitle = document.querySelector('.song-title');

let isPlaying = false;
let currentSongIndex = 0;

const songs = [
    { src: './Songs/Zaroori_Tha.mp3', title: 'Zaroori Tha' },
    { src: './Songs/Tinka_Tinka.mp3', title: 'Tinka Tinka' },
    { src: './Songs/Khuda_Zameen_Se_Gaya_Nahin.mp3', title: 'Khuda Zameen Se Gaya Nahin' },
    { src: './Songs/Dil_Khoya_Khoya.mp3', title: 'Dil Khoya Khoya' },
    { src: './Songs/Bichar_Jaonga.mp3', title: 'Bichar Jaonga' },
    { src: './Songs/Dil_Umeed_Toora_Hae.mp3', title: 'Dil Umeed Toora Hae' },
    { src: './Songs/Bharosa.mp3', title: 'Bharosa' },
    { src: './Songs/Shikwahae.mp3', title: 'Shikwahae' },
    { src: './Songs/itnatutahn.mp3', title: 'itna tuta hn' }
    // Add more songs as needed
];

function playSong(song) {
    audioPlayer.src = song.src;
    songTitle.textContent = song.title;
    audioPlayer.play();
    isPlaying = true;
    playBtn.innerHTML = '<i class="bi bi-pause-fill"></i>';
}

playBtn.addEventListener('click', () => {
    if (isPlaying) {
        audioPlayer.pause();
        playBtn.innerHTML = '<i class="bi bi-play-fill"></i>';
    } else {
        audioPlayer.play();
        playBtn.innerHTML = '<i class="bi bi-pause-fill"></i>';
    }
    isPlaying = !isPlaying;
});

audioPlayer.addEventListener('timeupdate', () => {
    const currentTime = Math.floor(audioPlayer.currentTime);
    const duration = Math.floor(audioPlayer.duration);
    progress.value = (currentTime / duration) * 100;
    currentTimeEl.textContent = formatTime(currentTime);
    durationEl.textContent = formatTime(duration);
});

progress.addEventListener('input', () => {
    const duration = Math.floor(audioPlayer.duration);
    audioPlayer.currentTime = (progress.value / 100) * duration;
});

songList.addEventListener('click', (e) => {
    if (e.target.classList.contains('song-item')) {
        const songSrc = e.target.getAttribute('data-src');
        const song = songs.find(s => s.src === songSrc);
        playSong(song);
    }
});

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    seconds = seconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}
