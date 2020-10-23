import React, { Component } from "react";
import Container from "@material-ui/core/Container";
import Navigation from "./Navigation";

export default class App extends Component {
  render() {
    return (
      <Container maxWidth="lg">
        <Navigation />
      </Container>
    );
  }
}
