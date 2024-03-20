const apiKey = process.env.EXPO_PUBLIC_API_KEY;
const url = `https://maps.googleapis.com/maps/api/geocode/json?`;

/*
 * use geocode API to grab lat/log with place ID.
 * author: Clarence Yeh
 * parameters: google place id
 * returns: corresponding geolocation. example object:
 * NOTE: there's some weird stuff with billing... i know we don't have to
 *       worry about it right now but we might have to soon
 * Geocode documentation here:
 * https://developers.google.com/maps/documentation/geocoding/requests-places-geocoding
 *
 * ALSO NOTE: This might break if they change the json format LOL
 */

interface Geolocation {
	location: {
		lat: number;
		lng: number;
	};
	location_type: string;
	viewport: {
		northeast: {
			lat: number;
			lng: number;
		};
		southwest: {
			lat: number;
			lng: number;
		};
	};
}

export const getGeolocationWithPlaceID = async (
	places_id
): Promise<Geolocation> => {
	try {
		const response = await fetch(
			`${url}place_id=${places_id}&key=${apiKey}&`,
			{
				method: "GET",
				mode: "cors",
			}
		);

		if (!response.ok) {
			throw new Error("Failed to fetch data");
		}

		const data = await response.json();

		return data.results[0].geometry;
	} catch (error) {
		console.error("Error fetching data:", error);
	}
};

/* example response : 
 *  "geometry" : {
        "location" : {
            "lat" : 40.7142205,
            "lng" : -73.9612903
        },
        "location_type" : "ROOFTOP",
        "viewport" : {
            "northeast" : {
                "lat" : 40.71556948029149,
                "lng" : -73.95994131970849
            },
            "southwest" : {
                "lat" : 40.7128715197085,
                "lng" : -73.9626392802915
            }
        }
        },
*/
