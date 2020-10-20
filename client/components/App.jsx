import React, { Component } from "react";
import { Button } from "@material-ui/core";
import Container from "@material-ui/core/Container";

export default class App extends Component {
  render() {
    return (
      <Container maxWidth="lg">
        <Button color="primary">Hello world</Button>
      </Container>
    );
  }
}
