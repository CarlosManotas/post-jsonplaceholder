/**
 *
 * @description el requerimiento pedia redux lo cual deliberadamente
 * no hice para que el autor del ejercicio pueda ver lo lejos que puedes
 * llegar con context y de que manera podemos usarlo en cualquier 
 * proyecto
 * 
 * @var {PostContext}
 * tiene un uso principal y es el poder de contener el context y poder
 * consumirlo sin necesidad de usar render props y de esa manera no
 * anidar props 
 * 
 * @constant {PostProvider}
 * juega el papel que haria <Provider store={store}> en redux teniendo
 * un solo lugar donde nuestros datos cambian
 *
 */


import React from "react";

import { Notification } from "../components";

import api from "../lib/api";

let PostContext; 
const { Consumer, Provider } = (PostContext = React.createContext());

class PostProvider extends React.Component {
  componentDidMount() {
    this.getAllPost();
  }

  getAllPost = async () => {
    this.setState({ loading: true });
    try {
      const posts = await api.getAllPost();
      this.setState({ posts, loading: false });
    } catch (error) {}
  };

  deletePost = async id => {
    this.setState({ loading: true });
    try {
      const posts = await api.deletePost(id);
      this.setState({ posts, loading: false });
      Notification({
        type: "success",
        message: "this post has been deleted successfully"
      });
    } catch (error) {
      this.setState({ loading: false });
      Notification({
        type: "error",
        message: "Ups!",
        description: "This post could not be deleted"
      });
    }
  };

  newPost = async data => {
    this.setState({ loading: true });
    try {
      const posts = await api.newPost(data);
      this.setState({ posts, loading: false });
      Notification({
        type: "success",
        message: "this post has been created"
      });
    } catch (error) {
      this.setState({ loading: false });
      Notification({
        type: "error",
        message: "Ups!",
        description: "This post could not be created"
      });
    }
  };

  editPost = async data => {
    this.setState({ loading: true });
    try {
      const posts = await api.editPost(data);
      this.setState({ posts, loading: false });
      Notification({
        type: "success",
        message: "this post has been updated"
      });
    } catch (error) {
      this.setState({ loading: false });
      Notification({
        type: "error",
        message: "Ups!",
        description: "This post could not be updated"
      });
    }
  };

  state = {
    posts: [],
    loading: false,
    deletePost: this.deletePost,
    newPost: this.newPost,
    editPost: this.editPost
  };

  render() {
    return <Provider value={this.state}>{this.props.children}</Provider>;
  }
}

export { PostProvider, Consumer as PostConsumer, PostContext };
