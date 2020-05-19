const request = require("request");

const geocode = (address, callback) => {
	const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
		address
	)}.json?access_token=pk.eyJ1IjoidHdpbnJhdmVuIiwiYSI6ImNrYTVkdnVrNzA4aWIza2xoODNhZTRycW0ifQ.Jno_d8uCNZK8DW_MPjpBjw.Jno_d8uCNZK8DW_MPjpBjw&limit=1`;

	request({ url, json: true }, (error, { body }) => {
		if (error) {
			callback("Unable to connect to location service", undefined);
		} else if (body.features.length === 0) {
			callback("Unable to find location. Try another search", undefined);
		} else {
			const {
				center: [longitude, latitude],
				place_name: location,
			} = body.features[0];
			callback(undefined, { longitude, latitude, location });
		}
	});
};

module.exports = { geocode };
