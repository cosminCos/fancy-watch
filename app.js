const minutes = {
    0: document.querySelector('#m_0'),
    5: document.querySelector('#m_5'),
    10: document.querySelector('#m_10'),
    15: document.querySelector('#m_15'),
    20: document.querySelector('#m_20'),
    30: document.querySelector('#m_30'),
}

const hours = {
    0: document.querySelector('#h_0'),
    1: document.querySelector('#h_1'),
    2: document.querySelector('#h_2'),
    3: document.querySelector('#h_3'),
    4: document.querySelector('#h_4'),
    5: document.querySelector('#h_5'),
    6: document.querySelector('#h_6'),
    7: document.querySelector('#h_7'),
    8: document.querySelector('#h_8'),
    9: document.querySelector('#h_9'),
    10: document.querySelector('#h_10'),
    11: document.querySelector('#h_11'),

}

const to = document.querySelector('#to');
const past = document.querySelector('#past');
const space = document.querySelectorAll('.space');
const background = document.querySelector('.background');
const loader = document.querySelector('.loader');
const show = document.querySelector('.show');

const chars = 'abcdefghijklmnopqrstuvwxyz';
const changeTime = () => {
    const now = new Date();
    let h = now.getHours();
    let m = now.getMinutes();
    let offset, next;

    h = h % 12;
    m = m - m % 5;
    for (let i in minutes) {

        minutes[i].classList.remove('active');
    }
    for (let i in hours) {
        hours[i].classList.remove('active');
    }

    to.classList.remove('active');
    past.classList.remove('active');

    if (m > 30) {
        hours[(h + 1) % 12].classList.add('active');
        to.classList.add('active');
    } else {
        hours[h].classList.add('active');
        if (m !== 0) {
            past.classList.add('active');
        }
    }

    offset = (m > 30) ? (60 - m) : m;

    if (offset in minutes) {
        minutes[offset].classList.add('active');
    } else if (offset === 25) {
        minutes[20].classList.add('active');
        minutes[5].classList.add('active');
    }

    now.setTime(Date.now());
    next = new Date(now.getTime());
    next.setMinutes(m + 5);
    next.setSeconds(0);
    next.setMilliseconds(0);
    setTimeout(changeTime, next - now);
}

const randLetter = () => {
    for (let i = 0; i < space.length; i++) {
        const char = chars.charAt(Math.floor(Math.random() * chars.length));
        space[i]['innerHTML'] = char;
    }
}

const changeBackground = () => {
    fetch('https://picsum.photos/1920/1080/?random')
        // .then(r => r.json())
        // .then(r => r)
        .then(r => {
            background.style.background = 'url(' + r.url + ')';
            background.style.transition = 'all 2s ease 2s'
        }).then(() => {
            loader.style.display = 'none';
            show.style.display = 'inline-block';
        })

}
setInterval(() => {
    changeBackground()
}, 30000);

changeBackground();
changeTime();
randLetter();
