import axios from "axios";

export const Get = (url) => {
    return axios.get(url)
    .then((response)=>{
        console.log(response);
        return response.data
    }).catch(err=>{
      console.log(err);
    });
}

export const Post = (url, data) => {
    return axios.post(url, data)
    .then((response)=>{
        console.log(response);
        return response.status
    }).catch(err=>{
      console.log(err);
    });
}