/**
 *
 * @constant {api}
 * un objeto que contiene todos nuestros request
 * uso axios pero podria ser fetch nativo solo es cuestion de gustos 
 * 
 * @constant {saveDataPost}
 * es un helper para efectos de esta demo queda la data guardada por sessionStorage
 * 
 * @constant {getDataPost}
 * de existir data guardada la tenemos lista para usar
 *  
 */

import axios from "axios";

import { getDataPost, saveDataPost } from "./helper";

const BASE_URL = "https://jsonplaceholder.typicode.com/";
const DEFAULT_OPTIONS = {
  method: "get",
  crossDomain: true,
  responseType: "json",
  headers: {
    "Content-Type": "application/json"
  }
};

const api = {
  request: async ({ url, data = {}, ...rest }) => {
    try {
      const response = await axios({
        ...DEFAULT_OPTIONS,
        url: BASE_URL + url,
        data: data,
        headers: {
          ...DEFAULT_OPTIONS.headers
        },
        ...rest
      });

      if (response.status >= 400) throw response;

      return { data: response.data };
    } catch (error) {
      return { error };
    }
  },
  getAllPost: async () => {
    const posts = getDataPost();
    if (posts.length) {
      return posts;
    }
    const { data, error } = await api.request({
      url: `posts`
    });

    if (error) {
      throw new Error(error);
    }
    saveDataPost(data);
    return data;
  },
  deletePost: async id => {
    const { data, error } = await api.request({
      url: `posts/${id}`,
      method: "DELETE"
    });

    if (error) {
      throw new Error(error);
    }
    console.log(data);
    const oldPost = getDataPost();
    const newPost = oldPost.filter(item => item.id !== id);
    saveDataPost(newPost);
    return newPost;
  },
  newPost: async formData => {
    const { data, error } = await api.request({
      url: `posts/`,
      method: "POST",
      data: formData
    });

    if (error) {
      throw new Error(error);
    }
    const oldPost = getDataPost();
    const newPost = [
      {
        ...data,
        id: oldPost.length + 1 // <--- asi logramos un id del mismo tipo de la api
      },
      ...oldPost
    ];
    saveDataPost(newPost);
    return newPost;
  },
  editPost: async formData => {
    const { data, error } = await api.request({
      url: `posts/${formData.id}`,
      method: "PUT",
      data: formData
    });

    if (error) {
      throw new Error(error);
    }

    const oldPost = getDataPost();
    const newPost = oldPost.map(post => {
      if (post.id === data.id) {
        return data;
      }
      return post;
    });

    saveDataPost(newPost);
    return newPost;
  }
};

export default api;
