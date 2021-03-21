// Since this API is out of date - there are NO NEW upcoming launches,
// the countdown function is now based upon old data 
// (rather than finding the actual upcoming launch).
// Previously got the latest/nearest launch by making a call to '/upcoming' 
// and checked for dates later than today's date.
// If left as is the data will point to a launch that happened half a year ago

fetch('https://api.spacexdata.com/v3/launches/latest')
    .then(function(response) {
        return response.json();
    })
    .then(function(launch) {
        createCountdownLaunch(launch);
        // const todaysDate = new Date().getTime();

        // for (let launch of launches) {

        //     const launchDate = new Date(launch.launch_date_utc).getTime();
                        
        //     // if(launchDate > todaysDate) {     
        //     //     createCountdownLaunch(launch);
        //     //     break;
        //     // }
        // }
    })
    .catch(function(error) {
        console.dir(error);
    });

function createCountdownLaunch(launchDetails) {

    const missionName = document.querySelector(".countdown-mission");
    missionName.innerHTML = launchDetails.mission_name;

    const moreBtn = document.querySelector(".more");
    moreBtn.innerHTML = `<a href="launch_detail.html?id=${launchDetails.flight_number}">About This Launch</a>`;

    let missingLocation = "<span title='no available information yet'>TBD</span>";

    if (launchDetails.launch_site.site_name_long !== null) {
        missingLocation = launchDetails.launch_site.site_name_long;
    }

    const missionLaunchSite = document.querySelector(".countdown-location");
    missionLaunchSite.innerHTML = missingLocation;

    const countdown = new Date(launchDetails.launch_date_utc).getTime();
    const countdownCon = document.querySelector(".timer");

    calculateCountdownTime(countdown, countdownCon);
    const interval = setInterval(function() {
        calculateCountdownTime(countdown, countdownCon);
    }, 
    10000);
}

function calculateCountdownTime(countdownTime, countdownCon) {
    const todaysTime = new Date().getTime();
    const time = countdownTime - todaysTime;

    const day = Math.floor(time/(1000*60*60*24));
    const hour = Math.floor((time%(1000*60*60*24))/(1000*60*60));
    const minutes = Math.floor((time%(1000*60*60))/(1000*60));
    
    countdownCon.innerHTML = `<p><span class="detail">${day} </span>days</p>
                                <p><span class="detail">${hour} </span>hours</p>
                                <p><span class="detail">${minutes} </span>minutes</p>`;

    if (time < 0) {
        clearInterval(interval);
        countdownCon.innerHTML = "Mission Launched";
    }
}
    