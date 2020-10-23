import React, { Component } from "react";
import { Box, TextField } from "@material-ui/core/";

export default class Admin extends Component {
  render() {
    return (
      <Box component="div" display="block">
        <form className="commentForm" onSubmit={this.handleSubmit}>
          <TextField id="filled-basic" label="Name" variant="filled" />
          <input type="submit" value="Post" />
        </form>
      </Box>
    );
  }
}
