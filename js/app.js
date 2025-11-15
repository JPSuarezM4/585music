let player;

// YouTube llama a esta función automáticamente cuando carga la API
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '1',
        width: '1',
        videoId: '',
        playerVars: {
            autoplay: 0,  // Importante: evitar autoplay antes del click
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

    // 1. Cargar video
    player.loadVideoById(videoId);

    // 2. Forzar play después de una pequeña pausa (solución al NotAllowedError)
    setTimeout(() => {
        try {
            player.playVideo();
        } catch (error) {
            console.error("Error playing audio:", error);
        }
    }, 300);
}

// Listener del botón
document.getElementById("play-button").addEventListener("click", playAudioFromYouTube);
