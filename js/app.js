let player;

// YouTube llama a esta función automáticamente cuando carga la API
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '1',
        width: '1',
        videoId: '',
        playerVars: {
            autoplay: 1,
            controls: 0
        }
    });
}

function extractVideoId(url) {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/.*v=|youtu\.be\/)([^&]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
}

function playAudioFromYouTube() {
    const url = document.getElementById("youtube-link").value;
    const videoId = extractVideoId(url);

    if (!videoId) {
        alert("Invalid YouTube Link");
        return;
    }

    player.loadVideoById(videoId);
}

// Botón que llama a la función
document.getElementById("play-button").addEventListener("click", playAudioFromYouTube);
