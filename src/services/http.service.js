import axios from "axios";

const BASE_URL = " https://api.mapbox.com/geocoding/v5/mapbox.places/";
const LIMIT = 3;
const TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;
const TYPES = "types=place%2Cpostcode%2Caddress%2Cregion%2Cdistrict%2Clocality%2Cneighborhood%2Ccountry";

function autosearch(string) {
  const word = string.target.value;
  return axios
    .get(`${BASE_URL}${word}.json?limit=${LIMIT}&${TYPES}&access_token=${TOKEN}`)
    .then((result) => result)
    .catch((e) => {
      console.log(e.message);
    });
}

export { autosearch };
