var songs = ["lagu/Bat_Country_17.mp3", "lagu/Binded_In_Chains_91.mp3", "lagu/MIA_72.mp3"];
var songsName = ["Bat Country", "Binded in chains", "Missing in actions"];
var singer = ["Avenged sevenfold", "Avenged sevenfold", "Avenged sevenfold"];

var judul = $('#judulLagu');
var penyanyi = $('#penyanyi');
var progress = $('#progress');
var durasi = $('#durasi');
var durasiWaktu = $('#durasiWaktu');
var controlPlayPause = $('#controlPlayPause i');
var jumlahLagu = parseInt(songs.length);
jumlahLagu--;
var lagu = new Audio();
var laguSekarang = 0;

window.onload = init();

function init() {
    penyanyi.text(songsName[laguSekarang]);
    judul.text(singer[laguSekarang]);
    lagu.src = songs[laguSekarang];

    var output = '';
    for (var i = 0; i < songs.length; i++) {
        output += '<a onclick="playlist(' + i + ')"><li class="list-group-item" style="margin-bottom: 2px; cursor: pointer" >' +
            '<div class="row">' +
            '<div class="col-md-6">' +
            '<div class="text-left"><i class="fas fa-music"> </i>&nbsp;&nbsp;' + songsName[i] + '' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</li></a>';
    }
    $('#playlist').html(output);

}


function play() {
    if (lagu.paused) {
        lagu.play();
        controlPlayPause.removeClass('fa-play').addClass('fa-pause');
    } else {
        controlPlayPause.removeClass('fa-pause').addClass('fa-play');
        lagu.pause();
    }
}

function next() {
    if (laguSekarang == jumlahLagu) {
        laguSekarang = 0;
    } else {
        laguSekarang = laguSekarang + 1;
    }
    penyanyi.text(songsName[laguSekarang]);
    judul.text(singer[laguSekarang]);
    lagu.src = songs[laguSekarang];
    play();
}

function previous() {
    if (laguSekarang <= 0) {
        laguSekarang = jumlahLagu;
    } else {
        laguSekarang = laguSekarang - 1;
    }
    penyanyi.text(songsName[laguSekarang]);
    judul.text(singer[laguSekarang]);
    lagu.src = songs[laguSekarang];
    play();
}

lagu.addEventListener('timeupdate', function () {
    var posisi = lagu.currentTime / lagu.duration;
    progress.width(posisi * 100 + '%');
    waktu(Math.round(lagu.currentTime));
    if (lagu.ended) {
        next();
    }
})

function waktu(durasi) {
    var menit = Math.floor(durasi / 60);
    var detik = durasi % 60;
    menit = (menit < 10) ? "0" + menit : menit;
    detik = (detik < 10) ? "0" + detik : detik;
    durasiWaktu.text(menit + ":" + detik);
    totalWaktu(Math.round(lagu.duration))
}

function playlist(idLagu) {
    laguSekarang = idLagu;
    penyanyi.text(songsName[laguSekarang]);
    judul.text(singer[laguSekarang]);
    lagu.src = songs[laguSekarang];
    play();
}

function totalWaktu(detikk) {
    var menit = Math.floor(detikk / 60);
    var detik = detikk % 60;
    menit = (menit < 10) ? "0" + menit : menit;
    detik = (detik < 10) ? "0" + detik : detik;
    durasi.text(menit + ":" + detik);
}