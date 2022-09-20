import axios from 'axios'

//axios config
const axiosUnsplash = axios.create({
    baseURL: 'https://api.unsplash.com/',
    timeout: 10000,
    headers:{
      Authorization: 'Client-ID kvGAuU20kySwBrcSKNK4L3WoEzggycbO0g4YmIEfW_c'
    }
  });

export default axiosUnsplash