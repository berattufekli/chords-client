// First we need to import axios.js
import axios from "axios";
import { proxy } from "./proxy";
// Next we make an 'instance' of it
const instance = axios.create({
  // .. where we make our configurations
  // baseURL: 'https://85.105.101.54:6060'
  baseURL: proxy,
});

// Where you would set stuff like your 'Authorization' header, etc ...
// instance.defaults.headers.common['Authorization'] = 'AUTH TOKEN FROM INSTANCE';

// Also add/ configure interceptors && all the other cool stuff

axios.defaults.headers.post["Content-Type"] = "application/json";

export default instance;
