const youtube_downloader = require('youtube-mp3-downloader');
const getMP3Duration = require('get-mp3-duration');
const fs = require('fs');
const json_functions = require('../json_functions/json_functions');


function getYoutubeID(youtube_url) {
    return youtube_url.split('=')[1];
}

function getAudioFileDuration(file_path) {
    const buffer = fs.readFileSync(file_path);
    const miliseconds = getMP3Duration(buffer);
    let seconds = Math.round((miliseconds % 60000) / 1000);
    let minutes = Math.floor(miliseconds / (1000 * 60));
    return `${minutes}:${seconds}`;
}

function checkIfSongsDirectoryExist() {
    fs.existsSync("../songs") ? null : fs.mkdirSync('../songs');
}

function getSongInfo(data) {
    let song_info = {};
    song_info["title"] = data["title"];
    song_info["duration"] = getAudioFileDuration(data["file"]);
    song_info["path"] = data["file"];

    return song_info;
}

function downloadYoutubeSong(youtube_url, playlist_name) {
    if (json_functions.getPlaylist(playlist_name) != null) {
        checkIfSongsDirectoryExist();
        let id = getYoutubeID(youtube_url);
        const YD = new youtube_downloader({
            "ffmpegPath": "/important_files/ffmpeg.exe",
            "outputPath": "D:/LinkPlayer/boilerplate/electron-react-webpack-boilerplate/songs/",
            "youtubeVideoQuality": "highestaudio",
            "queueParallelism": 2,
            "progressTimeout": 2000,
            "allowWebm": true
        });

4

        YD.download(id);
        alert("GUWNO");

        YD.on("finished", function(err, data) {
            alert(JSON.stringify(data));
        });
        
        YD.on("error", function(error) {
            return error;
        });
    }
}

exports.downloadYoutubeSong = downloadYoutubeSong;