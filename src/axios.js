import axios from "axios";

const instance = axios.create({
  baseURL: "https://us-central1-clone-d1e61.cloudfunctions.net/api",
  //'http://localhost:5001/clone-d1e61/us-central1/api',
});

export default instance;