
function checkLaunchLocation(launch) {
    let missingLocation = "<span title='no available information yet'>TBD</span>";

    if (launch.launch_site.site_name_long !== null) {
        missingLocation = launch.launch_site.site_name_long;
    }

    return innerHTML = missingLocation;
}

function formatDate(date) {
    return new Date(date).toDateString();
}
