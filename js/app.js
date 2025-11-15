let player;
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
            onReady: () => {
                setInterval(updateProgressBar, 500);
            }
        }
    });
}

function extractVideoId(url) {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/.*v=|youtu\.be\/)([^&]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
}

document.getElementById("play-button").addEventListener("click", () => {
    const url = document.getElementById("youtube-link").value;
    const videoId = extractVideoId(url);

    if (!videoId) {
        alert("Invalid YouTube Link");
        return;
    }

    player.loadVideoById(videoId);

    setTimeout(() => {
        player.playVideo();
        isPlaying = true;
        updatePlayPauseButton();
    }, 400);
});

document.getElementById("play-pause").addEventListener("click", () => {
    if (!player) return;

    if (isPlaying) {
        player.pauseVideo();
    } else {
        player.playVideo();
    }

    isPlaying = !isPlaying;
    updatePlayPauseButton();
});

function updatePlayPauseButton() {
    const btn = document.getElementById("play-pause");
    btn.textContent = isPlaying ? "⏸️" : "▶️";
}

function updateProgressBar() {
    if (!player || player.getDuration() === 0) return;

    const current = player.getCurrentTime();
    const total = player.getDuration();
    const percent = (current / total) * 100;

    document.getElementById("progress").value = percent;

    document.getElementById("time").textContent = 
        `${formatTime(current)} / ${formatTime(total)}`;
}

function formatTime(sec) {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
}

document.getElementById("progress").addEventListener("input", (e) => {
    const percent = e.target.value;
    const total = player.getDuration();
    player.seekTo((percent / 100) * total, true);
});

document.getElementById("volume").addEventListener("input", (e) => {
    const volume = e.target.value;
    player.setVolume(volume);
});
