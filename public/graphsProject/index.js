var allHydroData;
var allCostData;
var allSiteNames = [];

var powerArr = [];
var costArr = [];

var PORT = 8082
var SERVER = 'http://localhost'
//var SERVER = 'http://172.25.220.81'

var HttpClient = function () {
    this.get = function (aUrl, aCallback) {
        var anHttpRequest = new XMLHttpRequest();
        anHttpRequest.onreadystatechange = function () {
            if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                aCallback(anHttpRequest.responseText);
        }

        anHttpRequest.open("GET", aUrl, true);
        anHttpRequest.send(null);
    }
}

var client = new HttpClient();

//Fetch hydro data from server
client.get(SERVER + ':' + PORT + '/hydro', function (response) {
    responseArray = JSON.parse(response)
    allHydroData = responseArray;

    //Parse out ENG numbers
    for (let i = 0; i < allHydroData.length; i++) {
        allSiteNames.push(allHydroData[i].eng)
    }
    console.log("Done fetching hydro data");
    console.log(allSiteNames);

    startAutocomplete();
})

//Fetch cost data from server
client.get(SERVER + ':' + PORT + '/cost', function (response) {
    responseArray = JSON.parse(response)
    allCostData = responseArray;
    console.log("Done fetching cost data")
})


//When user hits search, get data for the site accordingly and call functions to draw the maps
function searchSite() {
    let input = document.getElementById('searchSites');
    let site = input.value;
    console.log(site)
    let powerDBData = allHydroData.find(object => object.eng === site);
    let costDBData = allCostData.find(object => object.eng === site);

    let powerChartData = [
        powerDBData.Jan,
        powerDBData.Feb,
        powerDBData.Mar,
        powerDBData.Apr,
        powerDBData.May,
        powerDBData.June,
        powerDBData.July,
        powerDBData.Aug,
        powerDBData.Sept,
        powerDBData.Oct,
        powerDBData.Nov,
        powerDBData.Dec
    ];

    let costChartData = [
        costDBData.Jan,
        costDBData.Feb,
        costDBData.Mar,
        costDBData.Apr,
        costDBData.May,
        costDBData.June,
        costDBData.July,
        costDBData.Aug,
        costDBData.Sept,
        costDBData.Oct,
        costDBData.Nov,
        costDBData.Dec
    ];

    //Check the change of rate comparison to create the red bar "bands"
    let plotBandsData = checkChange(powerChartData, costChartData)

    powerArr = [{ name: site, data: powerChartData }]
    costArr = [{ name: site, data: costChartData }]

    drawHydroGraph(powerArr, plotBandsData);
    drawCostGraph(costArr, plotBandsData);
}


//When user hits the '+' button, get data for the new site accordingly and draw all graphs
function addSite() {
    var input = document.getElementById('searchSites');
    var site = input.value;
    let plotBandsData = null

    //Check to see if the site is already drawn on the map
    if (powerArr.find(object => object.name === site) && powerArr.length > 1) {
        drawHydroGraph(powerArr, plotBandsData);
        drawCostGraph(costArr, plotBandsData);
        return
    }
    else if (powerArr.find(object => object.name === site)) {
        searchSite()
        return
    }

    var powerDBData = allHydroData.find(object => object.eng === site);
    var costDBData = allCostData.find(object => object.eng === site);

    let powerChartData = [
        powerDBData.Jan,
        powerDBData.Feb,
        powerDBData.Mar,
        powerDBData.Apr,
        powerDBData.May,
        powerDBData.June,
        powerDBData.July,
        powerDBData.Aug,
        powerDBData.Sept,
        powerDBData.Oct,
        powerDBData.Nov,
        powerDBData.Dec
    ];

    let costChartData = [
        costDBData.Jan,
        costDBData.Feb,
        costDBData.Mar,
        costDBData.Apr,
        costDBData.May,
        costDBData.June,
        costDBData.July,
        costDBData.Aug,
        costDBData.Sept,
        costDBData.Oct,
        costDBData.Nov,
        costDBData.Dec
    ];

    

    //Push data to the global variable to draw multiple graphs
    powerArr.push({ name: site, data: powerChartData });
    costArr.push({ name: site, data: costChartData })

    drawHydroGraph(powerArr, plotBandsData);
    drawCostGraph(costArr, plotBandsData);
}