import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
export const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
export const LOCATIONS_API = `${REMOTE_SERVER}/api/locations`;

export const fetchAllLocations = async () => {
  const response = await axiosWithCredentials.get(LOCATIONS_API);
  return response.data;
}

export const findLocationsByPartialName = async (name: string) => {
  const response = await axiosWithCredentials.get(`${LOCATIONS_API}?name=${name}`);
  return response.data;
};


export const findLocationById = async (id: string) => {
  const response = await axiosWithCredentials.get(`${LOCATIONS_API}/${id}`);
  return response.data;
};

export const updateLocation = async (location: any) => {
  const response = await axiosWithCredentials.put(`${LOCATIONS_API}/${location._id}`, location);
  return response.data;
};
