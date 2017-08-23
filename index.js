var myData = [];
var page = 0;
var prevButton = document.getElementById('prev');
var nextButton = document.getElementById('next');
var next;
var nextPage;
var previousPage;
var flagLoaded;

function showWeather(data, page) {
    var temp = document.getElementById('temperature');
    var windPow = document.getElementById('wind-power');
    var windDir = document.getElementById('wind-direction');
    var lastUpdate = document.getElementById('last-update');

    if (data[page].max_temp_fahrenheit && data[page].min_temp_fahrenheit) {
        temp.innerHTML = `${Math.ceil((data[page].max_temp_fahrenheit + data[page].min_temp_fahrenheit) / 2)}&deg;F`;
    } else if (data[page].max_temp_fahrenheit || data[page].min_temp_fahrenheit) {
        temp.innerHTML = data[page].max_temp_fahrenheit || data[page].min_temp_fahrenheit;
    } else {
        temp.innerHTML = '-';
    }
    if (!data[page].wind_speed) {
        windPow.innerHTML = `Wind power: --`;
    } else {
        windPow.innerHTML = `Wind power: ${data[page].wind_speed}`;
    }

    if (!data[page].wind_direction) {
        windDir.innerHTML = `Wind direction: --`;
    } else {
        windDir.innerHTML = `Wind direction: ${data[page].wind_direction}`;
    }

    lastUpdate.innerHTML = `Last update: ${data[page].terrestrial_date}`;
}

function callback(data) {
    nextPage = data.previous;
    previousPage = data.next;
    myData.splice(0, myData.length);
    for (var i = 0; i < data.results.length; i++) {
        myData.push(data.results[i]);
    }
    showWeather(myData, page);
    flagLoaded = true;
}

/////////////////////////////
//BUTTONS FUNCTIONALITY
////////////////////////////

function nextData() {
    if (page === 0 && (!nextPage)) {
        alert('This is the latest available data!');
    } else if (page !== 0) {
        page--;
        showWeather(myData, page);
    } else {
        page = 9;
        load(nextPage);
    }
}

function prevData() {
    if (page >= myData.length - 1 && previousPage) {
        page = 0;
        load(previousPage);
    } else if (!previousPage && page >= myData.length - 1) {
        alert('This is the oldest data available!');
    } else {
        page++;
        showWeather(myData, page);
    }
}

function load(page) {
    var loader = document.getElementsByClassName('loader')[0];
    loader.style.visibility = "visible";
    prevButton.setAttribute('disabled', 'true');
    nextButton.setAttribute('disabled', 'true');

    setTimeout(function() {
        loader.style.visibility = "hidden";
        prevButton.disabled = false;
        nextButton.disabled = false;
        changeURL(page);
    }, 1000);
}
////////////////////////////
///CHANGING SCRIPT SRC
///////////////////////////

function changeURL(url) {
    var script = document.getElementsByTagName('script')[3];
    document.body.removeChild(script);
    var newScript = document.createElement('script');
    newScript.setAttribute('src', url);
    newScript.onerror = function() {
        alert('Failed to load');
    }
    document.body.appendChild(newScript);
}

//////////////////////////
//EVENT HANDLERS
//////////////////////////

prevButton.addEventListener('click', prevData);
nextButton.addEventListener('click', nextData);

function start () {
    var container = document.getElementsByClassName('container')[0];
    container.style.visibility = 'hidden';
    var loader = document.getElementsByClassName('loader')[0];
    loader.style.visibility = "visible";


    setTimeout(function() {
        container.style.visibility = 'visible';
        loader.style.visibility = "hidden";
        prevButton.disabled = false;
        nextButton.disabled = false;  
    }, 1000);

    setTimeout(function() {
        if (!flagLoaded) {
            document.body.innerHTML = 'Sorry, we cannot get data right now.';
        }
    }, 600);
}
start();
