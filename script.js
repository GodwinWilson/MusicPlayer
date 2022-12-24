const music = new Audio('Audio/On My Way.mp3');
//music.play();
const theSongs = document.querySelectorAll('.songItem')
const songName = document.querySelectorAll('.songItem h5')
const coverImage = document.querySelectorAll('.songItem img')
let seek = document.getElementById('seek')
let currentStart = document.getElementById('currentStart')
let currentEnd = document.getElementById('currentEnd')
//create array

const songs = [
    {
        id:'1',
        path:'Audio/On My Way.mp3',
        songName:"On My Way<br><div class='subtitle'>Alan Walker ft. Sabrina Carpenter</div>",
        //songArtist: "Alan Walker ft. Sabrina Carpenter",
        cover:'Img/1.jpg'
    },
    {
        id:'2',
        path:"Audio/Faded.m4a",
        songName:"Faded<br><div class='subtitle'>Alan Walker</div>",
        //songArtist:"Alan Walker",
        cover:'Img/2.jpg'
    },
    {
        id:'3',
        path:"Audio/Come & Go.mp3",
        songName:"Come and Go<br><div class='subtitle'>Arrdee</div>",
        //songArtist:"Arrdee",
        cover:'Img/3.jpg'
    },
    {
        id:'4',
        path:"Audio/Amazing God.mp3",
        songName:"Amazing God<br><div class='subtitle'>Mercy Chinwo</div>",
        //songArtist:"Mercy Chinwo",
        cover: 'Img/4.jpg'
    },
    {
        id:'5',
        path:"Audio/Breathe.mp3",
        songName:"Breathe<br><div class='subtitle'>Dunsin Oyekan</div>",
        //songArtist:"Dunsin Oyekan",
        cover: 'Img/5.jpg'
    },
    {
        id:'6',
        path:"Audio/Legends Never Die.mp3",
        songName:"Legends Never Die<br><div class='subtitle'>League of Legends ft. Against the Current</div>",
        //songArtist:"Dunsin Oyekan",
        cover: 'Img/6.jpg'
    }
]


Array.from(document.getElementsByClassName('songItem')).forEach((el, i) => {
    el.getElementsByTagName('img')[0].src = songs[i].cover
    el.getElementsByTagName('h5')[0].innerHTML = songs[i].songName
    music.src = songs[i].path
})
/*
theSongs.forEach((song, e) => {
    song.querySelectorAll('img')[0].src = songs[e].cover
    song.querySelectorAll('h5')[0].innerHTML = songs[e].songName
})*/

let masterPlay = document.getElementById('masterPlay')
let wave = document.getElementsByClassName('wave')[0]

masterPlay.addEventListener('click', () => {
    if(music.paused || music.currentTime <=0){
        music.play()
        masterPlay.classList.remove('bi-play-fill')
        masterPlay.classList.add('bi-pause-fill')
        wave.classList.add('active2')
    }
    else{
        music.pause()
        masterPlay.classList.add('bi-play-fill')
        masterPlay.classList.remove('bi-pause-fill')
        wave.classList.remove('active2')
    }
})

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('playlistPlay')).forEach(el => {
        el.classList.add('bi-play-circle-fill')
        el.classList.remove('bi-pause-circle-fill')
    })
}
const makeAllBackground = () => {
    Array.from(document.getElementsByClassName('songItem')).forEach(el => {
        el.style.backgroundColor = 'rgb(105, 105, 170, 0)'
    })
}
let index = 0
let posterMasterPlay = document.getElementById('poster_master_play')
let title = document.getElementById('title')
Array.from(document.getElementsByClassName('playlistPlay')).forEach(el=>{
    el.addEventListener('click', (e)=>{
        index = e.target.id
        makeAllPlays()
        e.target.classList.remove('bi-play-circle-fill')
        e.target.classList.add('bi-pause-circle-fill')
        music.src = `Audio/${index}.mp3`
        posterMasterPlay.src = `Img/${index}.jpg`
        music.play()
        let songTitle = songs.filter(el => {
            return el.id == index
        })
        songTitle.forEach(el => {
            let {songName} = el
            title.innerHTML = songName
        })
        masterPlay.classList.remove('bi-play-fill')
        masterPlay.classList.add('bi-pause-fill')
        wave.classList.add('active2')
        music.addEventListener('ended', () => {
            masterPlay.classList.add('bi-play-fill')
            masterPlay.classList.remove('bi-pause-fill')
            wave.classList.remove('active2')
        })
        makeAllBackground()
        Array.from(document.getElementsByClassName('songItem'))[`${index-1}`].style.backgroundColor = 'rgb(105, 105, 170, .1)'
    })
})

//let currentStart = document.getElementById('currentStart')
//let currentEnd = document.getElementById('currentEnd')
//let seek = document.getElementById('seek')
let bar2 = document.getElementById('bar2')
let dot = document.getElementsByClassName('dot')[0]

music.addEventListener('timeupdate', () => {
    let musicCurr = music.currentTime
    let musicDur = music.duration

    let min = Math.floor(musicDur/60)
    let sec = Math.floor(musicDur%60)
    if (sec < 10){
        sec = `0${sec}`
    }
    currentEnd.textContent = `${min} : ${sec}`
    
    let min1 = Math.floor(musicCurr/60)
    let sec1 = Math.floor(musicCurr%60)
    if (sec1 < 10){
        sec1 = `0${sec1}`
    }
    currentStart.textContent = `${min1} : ${sec1}`
    let progressBar = parseInt((music.currentTime/music.duration)* 100)
    seek.value = progressBar
    let seekbar = seek.value
    bar2.style.width = `${seekbar}%`
    dot.style.left = `${seekbar}%`
})
seek.addEventListener('change', () => {
    music.currentTime = seek.value * music.duration/100
})
music.addEventListener('ended', () => {
    masterPlay.classList.add('bi-play-fill')
    masterPlay.classList.remove('bi-pause-fill')
    wave.classList.remove('active2')
})

let volIcon = document.getElementById('vol_icon')
let vol = document.getElementById('vol')
let volDot = document.getElementById('vol_dot')
let volBar = document.getElementsByClassName('vol_bar')[0]

vol.addEventListener('change', () => {
    if (vol.value == 0){
        volIcon.classList.remove('bi-volume-down-fill')
        volIcon.classList.add('bi-volume-mute-fill')
        volIcon.classList.remove('bi-volume-up-fill')
    }
    if (vol.value > 0){
        volIcon.classList.add('bi-volume-down-fill')
        volIcon.classList.remove('bi-volume-mute-fill')
        volIcon.classList.remove('bi-volume-up-fill')
    }
    if (vol.value > 50){
        volIcon.classList.remove('bi-volume-down-fill')
        volIcon.classList.remove('bi-volume-mute-fill')
        volIcon.classList.add('bi-volume-up-fill')
    }

    let volA = vol.value
    volBar.style.width = `${volA}%`
    volDot.style.left = `${volA}%`
    music.volume = volA/100
})
let back = document.getElementById('back')
let next = document.getElementById('next')

back.addEventListener('click', () =>{
    index -=1
    if (index < 1) {
        index = Array.from(document.getElementsByClassName('songItem')).length
    }
    music.src = `Audio/${index}.mp3`
    posterMasterPlay.src = `Img/${index}.jpg`
    music.play()
    let songTitle = songs.filter(el => {
        return el.id == index
    })
    songTitle.forEach(el => {
        let {songName} = el
        title.innerHTML = songName
    })
    makeAllPlays()
    document.getElementById(`${index}`).classList.remove('bi-play-fill')
    document.getElementById(`${index}`).classList.add('bi-pause-fill')
    makeAllBackground()   
    Array.from(document.getElementsByClassName('songItem'))[`${index-1}`].style.backgroundColor = 'rgb(105, 105, 170, .1)'
})

next.addEventListener('click', () =>{
    index +=1
    if (index > Array.from(document.getElementsByClassName('songItem')).length) {
        index = 1
    }
    music.src = `Audio/${index}.mp3`
    posterMasterPlay.src = `Img/${index}.jpg`
    music.play()
    let songTitle = songs.filter(el => {
        return el.id == index
    })
    songTitle.forEach(el => {
        let {songName} = el
        title.innerHTML = songName
    })
    makeAllPlays()
    document.getElementById(`${index}`).classList.remove('bi-play-fill')
    document.getElementById(`${index}`).classList.add('bi-pause-fill')
    makeAllBackground()   
    Array.from(document.getElementsByClassName('songItem'))[`${index-1}`].style.backgroundColor = 'rgb(105, 105, 170, .1)'
})

let leftScroll = document.getElementById('left_scroll')
let leftScrolls = document.getElementById('left_scrolls')
let rightScroll = document.getElementById('right_scroll')
let rightScrolls = document.getElementById('right_scrolls')
let popSong = document.getElementsByClassName('pop_song')[0]
let item = document.getElementsByClassName('item')[0]


leftScroll.addEventListener('click', () =>{
    popSong.scrollLeft -= 130
})
rightScroll.addEventListener('click', () =>{
    popSong.scrollLeft += 130
})
leftScrolls.addEventListener('click', () =>{
    item.scrollLeft -= 50
})
rightScrolls.addEventListener('click', () =>{
    item.scrollLeft += 50
})
