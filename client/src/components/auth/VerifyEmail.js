import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import {connect} from "react-redux";

import { verifyEmail } from "../../../actions/signupAction";

function VerifyEmail(props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const email = searchParams.get("email");
  const token = searchParams.get("token");
  useEffect(() => {
    console.log(email,token)
    props.verifyEmail({ email, token });
  }, []);

  return (<>
  {props.isLoading && <div>Loading...</div>}
  <div>{props.msg}</div>
  {props.error && <div>{props.error}</div>}
  </>
  );
}

function mapStateToProps(state) {
  return {
    msg: state.signup.msg,
    isLoading: state.signup.isLoading,
    error: state.signup.error,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    verifyEmail: (payload)=> dispatch(verifyEmail(payload)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);