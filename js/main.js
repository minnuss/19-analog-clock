const hourEl = document.querySelector('.hour');
const minEl = document.querySelector('.minute');
const secEl = document.querySelector('.second');
const timeEl = document.querySelector('.clock--time');
const dateEl = document.querySelector('.clock--date');
const themeBtn = document.querySelector('.clock--btn');
let timePeriod = document.querySelector('.clock--time--twelve');


themeBtn.addEventListener('click', () => {
    document.querySelector('html').classList.toggle('dark');
    themeBtn.innerHTML = "Light Mode";
});

// a function that transform a value from in-min and in-max and translate to out-min and out-max;
const scale = (num, in_min, in_max, out_min, out_max) => {
    return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

function setTime() {
    const time = new Date();
    const month = time.toLocaleString('sr-RS', { month: 'long' });
    const dayNum = time.getDate();
    const day = time.toLocaleString('sr-RS', { weekday: 'long' });;
    const hours = time.getHours();
    // getting 12h in hours
    const hoursForClock = hours % 12;
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();

    // scale(hoursForClock, 0, 11, 0, 360) - (hours from time, 0 = from 0, to 11 (is from 1-12), 0 - 360 is from 0 to 360deg);
    // what is says is get an number and translate it from 0-11 to 0 - 360.
    hourEl.style.transform = `translate(-50%, -100%) rotate(${scale(hoursForClock, 0, 11, 0, 360)}deg)`;

    minEl.style.transform = `translate(-50%, -100%) rotate(${scale(minutes, 0, 59, 0, 360)}deg)`;

    secEl.style.transform = `translate(-50%, -100%) rotate(${scale(seconds, 0, 59, 0, 360)}deg)`;

    let hoursForDigital = hoursForClock < 10 ? '0' + hoursForClock : hoursForClock;
    let minutesForDigital = minutes < 10 ? '0' + minutes : minutes;

    // console.log(month)
    // console.log(day)
    // console.log(dayNum)

    timeEl.innerHTML = `${hours}:${minutesForDigital} <span class="clock--time--twelve">${timePeriod = hours < 12 ? "AM" : "PM"}</span>`;

    dateEl.innerHTML = ` <div class="clock--date">${day} <span class="clock--date--circle">${dayNum}</span> ${month}</div>`
}

setTime()

setInterval(setTime, 1000)