var siteLocations;
var siteCosts;
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

//Fetch site location data from server
function fetchData() {
    client.get(SERVER + ':' + PORT + '/siteLocations', function (response) {
        responseArray = JSON.parse(response)
        siteLocations = responseArray;

        console.log("Done fetching site location data");
        console.log(siteLocations.find(object => object.engNum === "J1547"))

        //Fetch cost data from server
        client.get(SERVER + ':' + PORT + '/cost', function (response) {
            responseArray = JSON.parse(response)
            siteCosts = responseArray;

            console.log("Done fetching site cost data")
            console.log(siteCosts.find(object => object.eng === "J1447"))
        })
    })

}

