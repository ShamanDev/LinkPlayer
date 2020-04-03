let fs = require('fs');

function read_songs_file(){
    let file = fs.readFileSync("songs.json");
    let songs = JSON.parse(file);

    return songs
}

exports.write_song_to_file = function(song){
    let songs_file = read_songs_file();

    songs_file.songs_list.push(song);

    let stringified_json = JSON.stringify(songs_file);
    fs.writeFileSync('songs.json', stringified_json)
}
exports.read_songs_file = function () {
    let file = fs.readFileSync("songs.json");
    let songs = JSON.parse(file);

    return songs;
};