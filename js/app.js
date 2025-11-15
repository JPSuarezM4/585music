let player;
let isReady = false;
let isPlaying = false;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '1',
        width: '1',
        videoId: '',
        playerVars: {
            autoplay: 0,
            controls: 0
        },
        events: {
            onReady: onPlayerReady,
            onStateChange: onPlayerStateChange
        }
    });
}

function onPlayerReady() {
    isReady = true;

    // Actualizar barra de progreso cada 300ms
    setInterval(() => {
        if (player && isPlaying) {
            updateProgressBar();
        }
    }, 300);
}

function onPlayerStateChange(event) {
    // 1 = playing, 2 = paused
    if (event.data === YT.PlayerState.PLAYING) {
        isPlaying = true;
    }
    if (event.data === YT.PlayerState.PAUSED) {
        isPlaying = false;
    }

    updatePlayPauseButton();
}

function extractVideoId(url) {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/.*v=|youtu\.be\/)([^&]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
}

document.getElementById("play-button").addEventListener("click", () => {
    if (!isReady) return alert("Player not ready yet. Try again.");

    const url = document.getElementById("youtube-link").value;
    const videoId = extractVideoId(url);

    if (!videoId) {
        alert("Invalid YouTube Link");
        return;
    }

    player.loadVideoById(videoId);

    // Esperar a que cargue
    setTimeout(() => {
        player.playVideo();
    }, 500);
});

document.getElementById("play-pause").addEventListener("click", () => {
    if (!isReady) return;

    if (isPlaying) {
        player.pauseVideo();
    } else {
        player.playVideo();
    }
});

function updatePlayPauseButton() {
    const btn = document.getElementById("play-pause");
    btn.textContent = isPlaying ? "⏸️" : "▶️";
}

function updateProgressBar() {
    const duration = player.getDuration();
    if (!duration || duration === 0) return;

    const current = player.getCurrentTime();
    const percent = (current / duration) * 100;

    document.getElementById("progress").value = percent;
    document.getElementById("time").textContent =
        `${formatTime(current)} / ${formatTime(duration)}`;
}

function formatTime(sec) {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
}

document.getElementById("progress").addEventListener("input", (event) => {
    if (!isReady) return;

    const percent = event.target.value;
    const duration = player.getDuration();
    const newTime = (percent / 100) * duration;

    player.seekTo(newTime, true);
});

document.getElementById("volume").addEventListener("input", (event) => {
    if (!isReady) return;

    const volume = event.target.value;
    player.setVolume(volume);
});
