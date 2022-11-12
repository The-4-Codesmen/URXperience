import axios from "axios";
const apiURL =
  "https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary";
const options = {
  method: "GET",
  url: apiURL,
  params: {
    bl_latitude: "11.847676",
    tr_latitude: "12.838442",
    bl_longitude: "109.095887",
    tr_longitude: "109.149359",
    restaurant_tagcategory_standalone: "10591",
    restaurant_tagcategory: "10591",
    limit: "30",
    currency: "USD",
    open_now: "false",
    lunit: "km",
    lang: "en_US",
  },
  headers: {
    "X-RapidAPI-Key": "8f4f9a791dmsh1a38bcaa8990fb8p1ea333jsnbcd946e158ba",
    "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
  },
};

axios
  .request(options)
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.error(error);
  });

export const getPlacesData = async () => {
  try {
    const {
      data: { data },
    } = await axios.get(apiURL, options);
    return data;
  } catch (error) {}
};
