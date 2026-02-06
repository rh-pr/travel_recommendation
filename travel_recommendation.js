let fullData;
const zones = [];

fetch("./travel_recommendation_api.json")
    .then((response) => response.json())
    .then(data => {
        fullData = data;
        console.log(fullData);
    })
    .catch((error) => console.error(error));

    function searchPlaces() {
        const keyword = document.getElementById("searchInput").value.toLowerCase();
       
        if (keyword.includes("beach")){
            displayResults(fullData.beaches);
        } else if( keyword.includes("temple")) {
            displayResults(fullData.temples);
        } else if (keyword.includes("country")) {
            displayResults(fullData.countries);
        }
    }

    function displayResults(places) {
        const resultsDiv = document.getElementById("results");

        places.slice(0, 2).forEach(place => {
            if (place.description) {
                zones.push({
                    country: place.name.split(',')[1],
                    city: place.name.split(',')[0],
                });
                resultsDiv.innerHTML += `
                    <div class="place-card">
                        <img src=${place.imageUrl} alt=${place.name}/> 
                        <div class="place-info">
                            <h3> ${place.name} </h3>
                            <p> ${place.description} </p>
                            <button> Visit </button>
                        </div>
                    </div>
                `;
            } else {
                place.cities.forEach(city => {
                    zones.push({
                        country: place.name.split(',')[1],
                        city: place.name.split(',')[0],
                    });
                     resultsDiv.innerHTML += `
                    <div class="place-card">
                        <img src=${city.imageUrl} alt=${place.name}/> 
                        <div class="place-info">
                            <h3>${city.name} </h3>
                            <p> ${city.description} </p>
                            <button> Visit </button>
                        </div>
                    </div>
                `;
                });
            }
        });

        
    }

function clearResults() {
    document.getElementById("results").innerHTML = "";
    document.getElementById("searchInput").value = "";
}


zones.length > 0 &&zones.forEach(zone => {
    const options = {
        timeZone:  `${zone.country}/${zone.city}`,
        hour12: true,
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    };

    const time = new Date().toLocaleTimeString('en-US', options);
    console.log("Current time in New York:", time);
})

    

