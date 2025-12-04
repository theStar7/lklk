document.addEventListener('DOMContentLoaded', () => {
    const audioPlayer = document.getElementById('audioPlayer');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const playIcon = playPauseBtn.querySelector('i');
    const progressBar = document.getElementById('progressBar');
    const progressContainer = document.getElementById('progressContainer');
    const currentTimeEl = document.getElementById('currentTime');
    const durationEl = document.getElementById('duration');
    const currentTrackTitle = document.getElementById('currentTrackTitle');
    const musicNodes = document.querySelectorAll('.music-node');

    let isPlaying = false;

    // 格式化时间 (秒 -> mm:ss)
    function formatTime(seconds) {
        const min = Math.floor(seconds / 60);
        const sec = Math.floor(seconds % 60);
        return `${min}:${sec < 10 ? '0' : ''}${sec}`;
    }

    // 播放/暂停切换
    function togglePlay() {
        if (audioPlayer.src) {
            if (isPlaying) {
                audioPlayer.pause();
            } else {
                audioPlayer.play();
            }
        } else {
            alert("请先选择一首音乐！");
        }
    }

    // 更新播放状态图标
    function updatePlayIcon() {
        if (isPlaying) {
            playIcon.classList.remove('fa-play');
            playIcon.classList.add('fa-pause');
        } else {
            playIcon.classList.remove('fa-pause');
            playIcon.classList.add('fa-play');
        }
    }

    // 播放器事件监听
    playPauseBtn.addEventListener('click', togglePlay);

    audioPlayer.addEventListener('play', () => {
        isPlaying = true;
        updatePlayIcon();
    });

    audioPlayer.addEventListener('pause', () => {
        isPlaying = false;
        updatePlayIcon();
    });

    audioPlayer.addEventListener('timeupdate', (e) => {
        const { duration, currentTime } = e.srcElement;
        if (duration) {
            const progressPercent = (currentTime / duration) * 100;
            progressBar.style.width = `${progressPercent}%`;
            currentTimeEl.innerText = formatTime(currentTime);
            durationEl.innerText = formatTime(duration);
        }
    });

    // 点击进度条跳转
    progressContainer.addEventListener('click', (e) => {
        const width = progressContainer.clientWidth;
        const clickX = e.offsetX;
        const duration = audioPlayer.duration;
        if (duration) {
            audioPlayer.currentTime = (clickX / width) * duration;
        }
    });

    // 点击音乐节点播放
    musicNodes.forEach(node => {
        node.addEventListener('click', () => {
            const src = node.getAttribute('data-src');
            const title = node.getAttribute('data-title');

            // 这里假设音频文件路径相对于HTML文件是正确的
            // 如果音频文件在根目录的audio文件夹，可能需要调整路径，例如 '../audio/'
            // 目前保持 data-src 原样
            
            if (audioPlayer.src.includes(src) && isPlaying) {
                togglePlay(); // 如果点击当前正在播放的，则暂停
            } else {
                audioPlayer.src = src;
                currentTrackTitle.innerText = title;
                audioPlayer.play();
            }
        });
    });
});
