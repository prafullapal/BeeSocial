import React from "react";
import MainRouter from "./MainRouter";
import { BrowserRouter } from "react-router-dom";

import { connect } from "react-redux";

const App = (props) => {
  console.log(props.data);
  return (
    <BrowserRouter>
      <MainRouter />
    </BrowserRouter>
  );
};
function mapStateToProps(state) {
  return {
    data: state,
  };
}
export default connect(mapStateToProps)(App);
