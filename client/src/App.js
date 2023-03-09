import React from "react";
import MainRouter from "./MainRouter";
import { BrowserRouter } from "react-router-dom";

import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";

import { connect } from "react-redux";

const App = (props) => {
  console.log(props.data);
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <MainRouter />
      </ThemeProvider>
    </BrowserRouter>
  );
};
function mapStateToProps(state) {
  return {
    data: state,
  }
}
export default connect(mapStateToProps)(App);
