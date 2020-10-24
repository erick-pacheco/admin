import React, { Component } from "react";
import axios from "axios";

import {
  Box,
  TextField,
  Button,
  FormControlLabel,
  Switch,
} from "@material-ui/core/";

const api = axios.create({
  baseURL: "/api",
});

export default class Admin extends Component {
  constructor() {
    super();
    this.state = {
      title: null,
      description: null,
      price: null,
      active: true,
      link1: null,
      link2: null,
      id: null,
      errorText: "all fields required",
      data: [],
    };

    this.getProducts();
  }

  onChange = (event) => {
    const name = event.target.name;
    this.setState({
      ...this.state,
      [name]: event.target.value,
    });
  };

  handleStatusChange = (event) => {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.checked,
    });
  };

  onSubmit = async (e) => {
    e.preventDefault();
    await api
      .post("/", {
        product: {
          title: this.state.title,
          description: this.state.description,
          price: this.state.price,
        },
        active: this.state.active,
        images: [this.state.link1, this.state.link2],
      })
      .then(() => {
        this.props.history.push("/");
      });
  };

  deleteProduct = async (id) => {
    api
      .delete(`/${id}`)
      .then(this.getProducts)
      .catch((err) => console.log(err));
  };

  getProducts = async () => {
    api
      .get("/")
      .then((res) => {
        this.setState({ data: res.data });
      })
      .catch((err) => console.log(err));
  };

  handleUpdate = (id, product) => {
    this.setState({
      id: id,
      title: product.product.title,
      description: product.product.description,
      price: product.product.price,
      link1: product.images[0],
      link2: product.images[1],
      active: product.active,
    });
    console.log(this.state);
  };

  updateById = async (e) => {
    const { id } = this.state;
    e.preventDefault();
    await api
      .put(`/${id}`, {
        product: {
          title: this.state.title,
          description: this.state.description,
          price: this.state.price,
        },
        active: this.state.active,
        images: [this.state.link1, this.state.link2],
      })
      .then(() => {
        this.props.history.push("/");
      });
  };

  render() {
    const { data } = this.state;
    const countProducts = data.length;
    return (
      <div>
        <Box component="div" display="flex" m="auto">
          <Box component="div" display="block">
            <hr></hr>
            <h3>Add New Product</h3>
            <form className="commentForm">
              <TextField
                error={!this.state.title ? true : false}
                id="standard-required"
                label="Name"
                value={this.state.title}
                name="title"
                variant="filled"
                onChange={this.onChange}
              />
              <TextField
                error={!this.state.description ? true : false}
                id="standard-required"
                label="Description"
                name="description"
                value={this.state.description}
                variant="filled"
                onChange={this.onChange}
              />
              <TextField
                error={!this.state.price ? true : false}
                id="standard-number"
                label="Price"
                name="price"
                value={this.state.price}
                onChange={this.onChange}
                variant="filled"
              />
              <TextField
                error={!this.state.link1 ? true : false}
                id="standard-required"
                label="Image Link 1"
                name="link1"
                value={this.state.link1}
                variant="filled"
                onChange={this.onChange}
              />
              <TextField
                error={!this.state.link2 ? true : false}
                id="standard-required"
                label="Image Link 2"
                name="link2"
                value={this.state.link2}
                variant="filled"
                onChange={this.onChange}
              />{" "}
              <FormControlLabel
                error={!this.state.active ? true : false}
                control={
                  <Switch
                    checked={this.state.active}
                    onChange={this.handleStatusChange}
                    name="active"
                    value={this.state.active}
                  />
                }
                label="Active"
              />
              {!this.state.id ? (
                <Button
                  variant="contained"
                  type="submit"
                  color="primary"
                  onClick={this.onSubmit}
                >
                  Add
                </Button>
              ) : (
                <Button
                  variant="contained"
                  type="submit"
                  color="primary"
                  onClick={this.updateById}
                >
                  Update
                </Button>
              )}
            </form>
          </Box>
        </Box>
        <hr />
        <Button
          variant="contained"
          type="button"
          color="primary"
          onClick={() => this.getProducts}
        >
          {this.state.data.length == 0 || this.state.data.length >= 2
            ? `${this.state.data.length} Products`
            : `${this.state.data.length} Product`}
        </Button>
        <Box component="div" display="flex">
          <ul>
            {data.map((product) => (
              <li key={product._id}>
                {product.product.title} - {`$ ${product.product.price}`} -{" "}
                {product.active ? (
                  <Box component="span">Active</Box>
                ) : (
                  <Box component="span">Inactive</Box>
                )}
                <Button
                  color="primary"
                  onClick={() => this.handleUpdate(product._id, product)}
                >
                  Update
                </Button>
                <Button
                  color="secondary"
                  onClick={() => this.deleteProduct(product._id)}
                >
                  Delete
                </Button>
              </li>
            ))}
          </ul>
        </Box>
      </div>
    );
  }
}
