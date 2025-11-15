const audioPlayer = document.createElement('audio');
document.body.appendChild(audioPlayer);

function playAudioFromYouTube(url) {
    const videoId = extractVideoId(url);
    if (videoId) {
        const audioUrl = `https://www.youtube.com/watch?v=${videoId}`;
        audioPlayer.src = audioUrl;
        audioPlayer.play().catch(error => {
            console.error('Error playing audio:', error);
        });
    } else {
        console.error('Invalid YouTube URL');
    }
}

function extractVideoId(url) {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^&\n]{11})/;
    const matches = url.match(regex);
    return matches ? matches[1] : null;
}

// Example usage
const youtubeLink = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'; // Replace with your YouTube link
playAudioFromYouTube(youtubeLink);