// Fichero JS que contiene las peticiones HTTP que se realizaran al ESP32 unsado la libreria aixos

import axios from "axios"; // importamos la libreria Axios

const URL = import.meta.env.VITE_API_BASE_URL; // Guardamos la URL endpoint del ESP32 de la variable de entorno a una constante

console.log(URL); // Mostramos en consola la variable de entorno
export async function getState() {
  return axios
    .request({ method: "GET", url: URL })
    .then((result) => result.data)
    .catch((error) => error);
}

export async function setStateOn() {
  return axios
    .request({ method: "POST", url: URL + "on" })
    .then((result) => result.data)
    .catch((error) => error);
}

export async function setStateOff() {
  return axios
    .request({ method: "POST", url: URL + "off" })
    .then((result) => result.data)
    .catch((error) => error);
}
