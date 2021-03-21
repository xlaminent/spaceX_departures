

const ITEMS_TO_LOAD = 3;

let allLaunches;
let currentLaunchCount;
let isLoadingData = false;

const launchCards = document.querySelector(".card-container");

fetch("https://api.spacexdata.com/v3/launches/upcoming")
    .then(function(response) {
        return response.json();
    })
    .then(function(launches) {
        allLaunches = launches;

        if (allLaunches.length > ITEMS_TO_LOAD) {
            launchCards.innerHTML = createLaunches(allLaunches.slice(0, ITEMS_TO_LOAD));
            currentLaunchCount = ITEMS_TO_LOAD;
        } else {
            launchCards.innerHTML = createLaunches(allLaunches.slice(0, allLaunches.length));
            currentLaunchCount = allLaunches.length;
        }
    })
    .catch(function(error) {
        console.log(error);
    });

window.addEventListener("scroll", function(event) {
    const maxPageHeight = document.documentElement.scrollHeight;
    const currentHeight = window.pageYOffset + window.innerHeight;
    const scrollPercentage = (currentHeight / maxPageHeight) * 100;

    if (!isLoadingData && currentLaunchCount < allLaunches.length && scrollPercentage >= 55) {
        isLoadingData = true;

        if (currentLaunchCount + ITEMS_TO_LOAD < allLaunches.length) {
            launchCards.innerHTML += createLaunches(allLaunches.slice(currentLaunchCount, currentLaunchCount + ITEMS_TO_LOAD));
            currentLaunchCount += ITEMS_TO_LOAD;
        } else {
            launchCards.innerHTML += createLaunches(allLaunches.slice(currentLaunchCount, allLaunches.length));
            currentLaunchCount = allLaunches.length;
        }
        
        isLoadingData = false;
    }
});


function createLaunches(launches) {
    let html = "";

    launches.forEach(function(launch) {
        html += `<div class="launch-card">
                    <h4>${launch.mission_name}</h4>                        
                    <h5>Flight Number <span class="detail">${launch.flight_number}</span></h5>
                    <div class="bottom">
                        <p><span class="accentuate detail">When:</span> ${formatDate(launch.launch_date_utc)}</p>
                        <p><span class="accentuate detail">Where:</span> ${checkLaunchLocation(launch)}</p>
                        <div class="btn btn-sml">
                            <svg xmlns="http://www.w3.org/2000/svg" width="125px" height="50">
                                <rect width="92px" height="50" class="btn-rect"/>
                                <span class="btn-txt" title="Launch Details"><a href="launch_detail.html?id=${launch.flight_number}&mission_name=${encodeURI(launch.mission_name)}">Details</a></span>
                            </svg>
                        </div>   
                    </div>   
                 </div>`;
    });

    return html;
}