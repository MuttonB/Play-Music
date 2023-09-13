var songlist = document.querySelector(".songlist");
var more = document.querySelector(".more");
var contant = document.querySelector(".contant");
var play = document.querySelector(".play");

// play
var audio = document.querySelector("#audio")
play.onclick = function () {
    if (this.firstChild.nextSibling.attributes[0].value == "./img/play.png") {
        playing()
        setInterval(getTime, 1000)
    } else {
        pause()
        getTime = null
    }
};
var index = 0
function getTime() {
    index = 100 / Math.floor(audio.duration)
    var curren = Math.floor(audio.currentTime)
    currenS = curren % 60
    currenS = currenS < 10 ? "0" + currenS : currenS
    currenM = Math.floor(curren / 60 % 60)
    currenM = currenM < 10 ? "0" + currenM : currenM
    document.querySelector(".pro p:nth-child(1)").innerHTML = currenM + ":" + currenS
    document.querySelector(".range").style.backgroundSize = (index * curren).toFixed(2) + "%"
    document.querySelector(".range").value = (index * curren).toFixed(2)
    if (document.querySelector(".range").getAttribute("style") == "background-size: 100%;") {
        document.querySelector(".album").style.animation = "none"
        document.querySelector(".range").value = 0
        document.querySelector(".range").style.backgroundSize = 0
        document.querySelector(".pro p:first-child").innerHTML = "00:00"
        audio.currentTime = 0
        nextSong()
        clearlrc()
        setTimeout(() => {
            setlrc()
        }, 100);
        setlist()
        setTimeout(playing(), 500)
    }
}

window.onload = function () {
    if (localStorage.getItem("singId") == null) {
        localStorage.setItem("singId", 0)
    }
    if (localStorage.getItem("load") == null) {
        localStorage.setItem("load", 1)
        location.reload()
    }
    showMusic()
    showlist()
    setlist()
    changeSong()
    winWidth()
};

var poin = document.querySelectorAll(".point span");
var width = 350;
for (let i = 0; i < poin.length; i++) {
    poin[1].onclick = function () {
        if (this.getAttribute("type") == 0) {
            document.querySelector(".main").style.width = "88%";
            this.setAttribute("type", 1);
            localStorage.setItem("winType", 1)
        } else {
            document.querySelector(".main").style.width = width + "px";
            this.setAttribute("type", 0);
            localStorage.setItem("winType", 0)
        }
    }
    poin[2].onclick = function () {
        window.close()
    }
    poin[0].onclick = function () {
        document.querySelector(".main").style.height = 0
        document.querySelector(".main").style.top = "100vh"
        document.querySelector(".showBox").style.zIndex = 1
        document.querySelector(".showBox").style.opacity = 1
    }
}
document.querySelector(".showBox img").onclick = function () {
    document.querySelector(".main").style.height = "620px"
    document.querySelector(".main").style.top = 0
    document.querySelector(".showBox").style.zIndex = -1
    document.querySelector(".showBox").style.opacity = 0
}

function pause() {
    play.children[0].setAttribute("src", "./img/play.png")
    document.querySelector(".album").style.animationPlayState = "paused";
    audio.pause()
}
function playing() {
    play.children[0].setAttribute("src", "./img/paused.png")
    document.querySelector(".album").style.animation = "rotate 7.7s infinite linear"
    audio.play()
}
function winWidth() {
    if (localStorage.getItem("winType") == 1) {
        document.querySelector(".main").style.width = "88%";
    } else {
        document.querySelector(".main").style.width = width + "px";
    }
}

function showMusic() {
    document.querySelector(".song").innerHTML = data[localStorage.getItem("singId")].song;
    document.querySelector(".singer").innerHTML = data[localStorage.getItem("singId")].singer;
    document.querySelector(".album").setAttribute("src", data[localStorage.getItem("singId")].album);
    document.querySelector(".time").innerHTML = data[localStorage.getItem("singId")].time;
    document.querySelector(".singerPicture").setAttribute("src", data[localStorage.getItem("singId")].singer_picture)
    audio.setAttribute("src", data[localStorage.getItem("singId")].song_url)

}
document.querySelector(".header").addEventListener("mouseover", function () {
    more.onclick = function () {
        songlist.style.left = 0;
        contant.classList.add("cactive")
        this.classList = "m close";
    };
});
document.querySelector(".header").addEventListener("mouseover", function () {
    document.querySelector(".m").onclick = function () {
        this.classList = "more";
        songlist.style = "-100%";
        contant.classList.remove("cactive")
    };
});
var lists = document.querySelector(".songlist .lists")
function showlist() {
    for (let i = 0; i < data.length; i++) {
        var ul = document.createElement("ul");
        lists.append(ul);
        ul.innerHTML = '<li><div><p><img src=' + data[i].album + '><p><span>' + data[i].song + '</span><span>' + data[i].singer + '</span></p></div><p>' + data[i].time + '</p></li>';
        ul.setAttribute("data-id", data[i].id)
    }
}
function setlist() {
    for (let i = 0; i < lists.children.length; i++) {
        lists.children[i].classList = ""
    }
    lists.children[localStorage.getItem("singId")].classList = "active"
}

// loading...
if (localStorage.getItem("load") == 1) {
    var ran = Math.floor(Math.random() * (3 - 2 + 2) + 2)
    document.querySelector(".loading").style.animationDelay = ran + "s"
    setTimeout(function () {
        document.querySelector(".loading").style.display = "none"
        localStorage.setItem("load", 0)
    }, ran + "000");
} else {
    document.querySelector(".loading").style.display = "none"
}

function changeSong() {
    var songli = document.querySelector(".songlist .lists").childNodes
    for (let i = 0; i < songli.length; i++) {
        songli[i].addEventListener("click", function () {
            for (let i = 0; i < songli.length; i++) {
                songli[i].classList = ""
            }
            document.querySelector(".song").innerHTML = data[localStorage.getItem("singId")].song;
            document.querySelector(".singer").innerHTML = data[localStorage.getItem("singId")].singer;
            document.querySelector(".album").setAttribute("src", data[localStorage.getItem("singId")].album);
            document.querySelector(".time").innerHTML = data[localStorage.getItem("singId")].time;
            audio.setAttribute("src", data[localStorage.getItem("singId")].song_url);
            document.querySelector(".singerPicture").setAttribute("src", data[localStorage.getItem("singId")].singer_picture)
            this.classList = "active"
            localStorage.setItem("singId", i)
            play.firstChild.nextSibling.attributes[0].value = "./img/play.png";
            document.querySelector(".album").style.animation = "none";
            songlist.style = "-100%";
            contant.classList.remove("cactive")
            document.querySelector(".m").classList = "more";
            clearlrc()
            setTimeout(() => {
                setlrc()
            }, 100);
            showMusic()
        })
    }
}

document.querySelector(".nextSong").onclick = function () {
    nextSong()
    setlist()
    clearlrc()
    setTimeout(() => {
        setlrc()
    }, 100);
}

document.querySelector(".backSong").onclick = function () {
    backSong()
    setlist()
    clearlrc()
    setTimeout(() => {
        setlrc()
    }, 100);
}
function nextSong() {
    if (localStorage.getItem("singId") < data.length - 1) {
        localStorage.setItem("singId", Number(localStorage.getItem("singId")) + 1)
    } else {
        localStorage.setItem("singId", 0)
    }
    showMusic()
}
function backSong() {
    if (localStorage.getItem("singId") > 0) {
        localStorage.setItem("singId", Number(localStorage.getItem("singId")) - 1)
    } else {
        localStorage.setItem("singId", data.length - 1)
    }
    showMusic()
}

function changeTheme() {
    document.querySelector(".theme").onclick = function () {
        if (this.getAttribute("data-dark") == 0) {
            this.setAttribute("data-dark", 1)
            for (let i = 0; i < document.querySelectorAll("p").length; i++) {
                document.querySelectorAll("p")[i].classList.add("dark")
            }
            for (let i = 0; i < document.querySelectorAll(".more span").length; i++) {
                document.querySelectorAll(".more span")[i].style.border = "1px solid white"
            }
            document.querySelector(".contant").classList.add("darkbg")
            document.querySelector(".songlist").classList.add("darul")
            document.querySelector(".up").style.backgroundImage = "linear-gradient(to right, rgb(20, 30, 48), rgb(36, 59, 85))"
        }
        else {
            this.setAttribute("data-dark", 0)
            for (let i = 0; i < document.querySelectorAll("p").length; i++) {
                document.querySelectorAll("p")[i].classList.remove("dark")
                document.querySelector(".contant").classList.remove("darkbg")
            }
            for (let i = 0; i < document.querySelectorAll(".more span").length; i++) {
                document.querySelectorAll(".more span")[i].style.border = "1px solid black"
            }
            document.querySelector(".songlist").classList.remove("darul")
            document.querySelector(".up").style.backgroundImage = "linear-gradient(to right, rgb(201, 214, 255), rgb(226, 226, 226))"
        }
    }
}
changeTheme()

var range = document.querySelector(".range")
range.addEventListener("mousedown", function () {
    range.onmousemove = function () {
        range.style.backgroundSize = range.value + "%"
    }
    range.onclick = function (e) {
        range.style.backgroundSize = range.value + "%"
        audio.currentTime = audio.duration / 100 * e.target.value
    }
})

// lrc
var lrc_list = document.querySelector(".lrcList")
var contanter = document.querySelector(".contantText")
function setlrc() {
    var lrc_url = data[localStorage.getItem("singId")].song_lrc
    var result = []
    var ajax = new XMLHttpRequest()
    ajax.open("GET", lrc_url, true)
    ajax.onreadystatechange = function () {
        if (ajax.readyState === 4 && ajax.status === 200) {
            var lrcContent = ajax.responseText
            lrcContent = lrcContent.split("\n")
            for (let i = 0; i < lrcContent.length; i++) {
                const str = lrcContent[i];
                const parts = str.split("]");
                const timeStr = parts[0].substring(1);
                const obj = {
                    time: parseTime(timeStr),
                    words: parts[1]
                };
                result.push(obj);
            }
            createElements()
        }
    }
    ajax.send()

    function parseTime(timeStr) {
        const parts = timeStr.split(":");
        return +parts[0] * 60 + +parts[1];
    }

    function findIndex() {
        const curTime = audio.currentTime;
        for (let i = 0; i < result.length; i++) {
            if (curTime < result[i].time) {
                return result[i - 1].words ? i - 1 : i - 2;
            }
        }
        return result.length - 1;
    }

    function createElements() {
        const frag = document.createDocumentFragment();
        for (let i = 0; i < result.length; i++) {
            const li = document.createElement("li");
            li.textContent = result[i].words;
            frag.appendChild(li);
        }
        lrc_list.appendChild(frag);
    }

    function setOffset() {
        const containerHight = contanter.clientHeight;
        const liHight = lrc_list.children[0].clientHeight;
        const maxOffset = lrc_list.clientHeight - containerHight;
        const index = findIndex();
        let offset = liHight * index + liHight / 2 - containerHight / 2 +20;
        if (offset < 0) {
            offset = 0;
        }
        if (offset > maxOffset) {
            offset = maxOffset;
        }
        lrc_list.style.transform = `translateY(-${offset}px)`;
        let li = lrc_list.querySelector(".active");
        if (li) {
            li.classList.remove("active");
        }
        li = lrc_list.children[index];
        if (li) {
            li.classList.add("active");
        }
    }
    audio.addEventListener("timeupdate", setOffset);
}
setlrc()

function clearlrc() {
    setTimeout(() => {
        var len = lrc_list.children.length
        for (let i = 0; i < len; i++) {
            lrc_list.children[0].remove()
        }
    }, 10);
}
document.querySelector(".album").onclick = function () {
    document.querySelector(".audio").style.opacity = 0
    document.querySelector(".contantText").style.margin = "0 auto"
    document.querySelector(".contantText").style.height = 330 + "px"
    document.querySelector(".lrcList").style.lineHeight = "36px"
    document.querySelector(".lrcList").style.fontSize = "1rem"
}
document.querySelector(".contantText").onclick = function () {
    document.querySelector(".audio").style.opacity = 1
    document.querySelector(".contantText").style.marginTop = "260px"
    document.querySelector(".contantText").style.height = 120 + "px"
    document.querySelector(".lrcList").style.lineHeight = "26px"
    document.querySelector(".lrcList").style.fontSize = "0.9rem"
}