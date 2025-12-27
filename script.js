(async function getMoonPhaseFast() {
const url = 'https://moon-phase.p.rapidapi.com/calendar?format=html';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': process.env.moonPhaseToken,
		'x-rapidapi-host': 'moon-phase.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	//console.log(result);
} catch (error) {
	console.error(error);
}
})();

  function getMoonPhase(lat, lon) {
    var url =
      "https://" +
      'moon-phase.p.rapidapi.com' +
      "/advanced?lat=" +
      encodeURIComponent(lat) +
      "&lon=" +
      encodeURIComponent(lon);

    return fetch(url, {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": process.env.moonPhaseToken,
        "X-RapidAPI-Host":'moon-phase.p.rapidapi.com',
      },
    }).then(function (res) {
      return res.json().then(function (data) {
        if (!res.ok) {
          throw new Error(data && data.message ? data.message : "Moon API request failed");
        }
        return data;
      });
    });

  }
function geocodeWithMapbox(address) {
  var url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=" +
    encodeURIComponent(process.env.mapboxToken) +
    "&limit=1";

  return fetch(url)
    .then(function (res) {
      return res.json().then(function (data) {
        if (!res.ok) {
          throw new Error("Mapbox error: " + (data.message || res.status));
        }
        return data;
      });
    })
    .then(function (data) {
      if (!data.features || data.features.length === 0) {
        throw new Error("No results found for: " + address);
      }

      // Mapbox returns [longitude, latitude]
      console.log(data);
      var center = data.features[0].center;
      return {
        place_name: data.features[0].place_name,
        lon: center[0],
        lat: center[1],
        raw: data.features[0]
      };
    });
}

  // Example: exactly your URL values
  getMoonPhase(51.4826, 0.0077)
    .then(function (data) {
      console.log("Moon API response:", data);
      // If you have a <pre id="result"></pre> in HTML:
      var el = document.getElementById("result");
      if (el) el.textContent += JSON.stringify(data.sun.next_solar_eclipse, null, 2);
      if (el) el.textContent += JSON.stringify(data.moon.next_lunar_eclipse, null, 2);
    })
    .catch(function (err) {
      console.error("Error:", err.message);
    });



    geocodeWithMapbox("Wundanyi")
    .then(function (data) {
        console.log("Location response:", data);
        // If you have a <pre id="result"></pre> in HTML:
        var el = document.getElementById("result");
        if (el) el.textContent = JSON.stringify(data, null, 2);
        })
        .catch(function (err) {
        console.error("Error:", err.message);
        });

(async function () {
 const form = document.getElementById("moonForm");
    const statusEl = document.getElementById("status");
    const resultEl = document.getElementById("result");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();  
         const address = document.getElementById("address").value;
          console.log("Address Response", address);
        const locationData = await geocodeWithMapbox(address);
        console.log("Location API Response", locationData);
         getMoonPhase(locationData.lat, locationData.lon);


        });
})();
