import axios from "axios";
const apiURL = process.env.REACT_APP_RAPID_API;

export const getPlacesData = async (sw, ne) => {
  try {
    const {
      data: { data },
    } = await axios.get(apiURL, {
      params: {
        bl_latitude: sw.lat,
        tr_latitude: ne.lat,
        bl_longitude: sw.lng,
        tr_longitude: ne.lng,
      },
      headers: {
        "X-RapidAPI-Key": process.env.REACT_APP_RAPID_KEY,
        "X-RapidAPI-Host": process.env.REACT_APP_RAPID_HOST,
      },
    });

    return data;
  } catch (error) {
    console.log(error);
  }
};
