const queryString = document.location.search;
const params = new URLSearchParams(queryString);

fetch(`https://api.spacexdata.com/v3/launches/${params.get("id")}`)
    .then(function(response) {
        return response.json();
    })
    .then(function(launch) {
        createLaunchDetails(launch);
    })
    .catch(function(error) {
        console.dir(error);
    });


function createLaunchDetails(launchDetails) {
    const heading = launchDetails.mission_name;
    document.title = "SpaceX Departures - " + heading;

    const payload = launchDetails.rocket.second_stage.payloads[0];
    
    const missionName = document.querySelector(".promo-heading");
    missionName.innerHTML = launchDetails.mission_name;
    
    const missionNr = document.querySelector(".launch-nb");
    missionNr.innerHTML =  "flight number " + launchDetails.flight_number;

    const missionRockets = document.querySelector(".mission-rocket");
    missionRockets.innerHTML = launchDetails.rocket.rocket_name + " <b>Type</b> " + launchDetails.rocket.rocket_type;

    let missingPayload = "N/A";
        if (payload.payload_type !== null) {
            missingPayload = payload.payload_type;
        }
    const missionPayload = document.querySelector(".mission-payload");
    missionPayload.innerHTML = missingPayload;

    let missingPayloadW = "N/A";
        if (payload.payload_mass_kg !== null && payload.payload_mass_lbs !== null) {
            missingPayloadW = payload.payload_mass_kg + " kg " + "/ " + payload.payload_mass_lbs + " lbs";
        }
    const missionPayloadW = document.querySelector(".mission-payload-w");
    missionPayloadW.innerHTML = missingPayloadW;
    
    const missionDate = document.querySelector(".mission-date");
    const missionTime = document.querySelector(".mission-time");
    missionDate.innerHTML = formatDate(launchDetails.launch_date_utc);
    missionTime.innerHTML = new Date(launchDetails.launch_date_utc).toLocaleTimeString();

    let missingLocation = "<span title='no available information yet'>TBD</span>";
        if (launchDetails.launch_site.site_name_long !== null) {
            missingLocation = launchDetails.launch_site.site_name_long;
        }
    const missionLaunchSite = document.querySelector(".mission-lnc-site");
    missionLaunchSite.innerHTML = missingLocation;

    let missingMissDetail = "No details about this mission exist yet. Check back later.";
        if (launchDetails.details !== null) {
            missingMissDetail = launchDetails.details;
        }
    const missionDetails = document.querySelector(".mission-detail");
    missionDetails.innerHTML = missingMissDetail;

    let missingPatch = "";
    if (launchDetails.links.mission_patch_small !== null) {
        missingPatch =  `<img class="patch-img" src="${launchDetails.links.mission_patch_small}">`;
    }
    const missionPatchImage = document.querySelector(".mission-patch");
    missionPatchImage.innerHTML = missingPatch;
}