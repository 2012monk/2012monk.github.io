// const ACESS_KEY = `RwgRk1LZ80FkLrU0DZM0VAjPFrybqHaedG-GrdOgYRQ`
const UNSPLASH_KEY = API_KEY.unsplash
const body = document.querySelector("body");
const IMG_URL = 'image_url';
const TOGGLED = 'albumToggled'
const PHOTO_ALBUM = 'photoAlbum'
let currentData = ''
let photoAlbum = [];
const photoInfoContainer = document.querySelector(".js-background");
const photoInfo = photoInfoContainer.querySelector(".photoinfo");
const iconContainer = document.querySelector('.iconContainer')


function setIcn(){
    const likeBtn = document.createElement('icon');
    const reloadBtn = document.createElement('icon');
    const albumBtn = document.createElement('icon');
    likeBtn.classList.add('fas', 'fa-heart', 'likeBtn');
    albumBtn.classList.add('fas', 'fa-bookmark', 'albumBtn');
    reloadBtn.classList.add('fas', 'fa-redo-alt');
    iconContainer.appendChild(likeBtn);
    iconContainer.appendChild(albumBtn);
    iconContainer.appendChild(reloadBtn);
    reloadBtn.addEventListener('click', function(){document.location.reload(true)});
    likeBtn.addEventListener('click', likeProcess);
    albumBtn.addEventListener('click', function(){
            const checkToggle = localStorage.getItem(TOGGLED)
            if(checkToggle !== null){
                localStorage.removeItem(TOGGLED);
            }else{
                localStorage.setItem(TOGGLED, 1);
            }
            document.location.reload(true);
        });
    
}

function toggleCheck(){
    const toggleId = localStorage.getItem(TOGGLED)
    setIcn();
    if(toggleId !== null){
        loadAlbum();
    }else{
        loadData();
    }
}

function loadAlbum(){
    if(photoAlbum.length !== 0){
        toggledImg();
    }else{
        alert('Album is Empty!');
        localStorage.removeItem(TOGGLED);
        window.location.reload();
    }
    
}





function checkAlbum(){
    if(localStorage.getItem(PHOTO_ALBUM) !== null){
        const loadedAlbum = localStorage.getItem(PHOTO_ALBUM);
        photoAlbum = JSON.parse(loadedAlbum);
        return photoAlbum
    }else{
        photoAlbum = [];
        return photoAlbum
    }
}



function loadData(){
    // const _url = `https://api.unsplash.com/photos/random/?query=beach?orientation=lanscape?featured?color='blue'&client_id=${ACESS_KEY}` //beach
    const _url = `https://api.unsplash.com/photos/random?collections=5058452,wallpaper&client_id=`+ UNSPLASH_KEY // wallpapers
    fetch(_url)
    .then(function(response){
        return response.json();
    })
    .then(function(json){
        const data = {
            descriptions: json.descriptions,
            firstName: json.user.first_name,
            lastName: json.user.last_name,
            location: json.location.title,
            imgUrl: json.urls.full
        }
        currentData = data;
        paintImage(data);
    })
}

function paintImage(data){
    const image = new Image;
    image.src = data.imgUrl;
    image.classList.add("bgImage");
    photoInfo.innerText = `${data.name ? `Photographer${data.name}`: ''}
    ${data.descriptions ? data.descriptions : ''}
    ${data.location ? data.location : ''}
    `;
    
    body.appendChild(image);
}

function toggledImg(){
    const albumLen = photoAlbum.length - 1;
    const randVal = makeRandom(albumLen);
    const data = photoAlbum[randVal];
    const image = new Image;
    image.src = data.imgUrl;
    image.classList.add("bgImage");
    photoInfo.innerText = `${data.name ? `Photographer${data.name}`: ''}
    ${data.descriptions ? data.descriptions : ''}
    ${data.location ? data.location : ''}
    `;
    body.appendChild(image);
}





function makeRandom(max){
    const randVal = Math.floor(Math.random()*(max+1));
    return randVal;
}

function likeProcess(){
    if(!photoAlbum.includes(currentData)){
        photoAlbum.push(currentData);
        localStorage.setItem(PHOTO_ALBUM, JSON.stringify(photoAlbum));
    }else{
        const currentIdx = photoAlbum.findIndex(function(item){return item === currentData});
        photoAlbum.splice(currentIdx, 1);
        localStorage.setItem(PHOTO_ALBUM, JSON.stringify(photoAlbum));
    }
}

function init() {
    // checkAlbum();
    window.addEventListener('load', toggleCheck);
    // window.addEventListener('toggle', loadAlbum);
    // window.addEventListener('load', loadData);
    // toggleCheck();
    checkAlbum();
    
}

init();