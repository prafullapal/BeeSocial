import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { findPeople, follow } from "../../../actions/userActions";
import { connect } from "react-redux";
import PeopleCard from "./PeopleCard";

function FindPeople(props) {
  useEffect(() => {
    props.findPeople({
      userId: props.user.userId,
    });
  }, []);

  const clickFollow = async (user, index) => {
    await props.follow(user._id);
    await props.findPeople({ userId: props.user.userId });
  };

  return (
    <>
      {props.followPeople &&
        props.followPeople.map((people, idx) => {
          return (
            <PeopleCard
              key={idx}
              people={people}
              callback={clickFollow}
              btn="follow"
            />
          );
        })}
    </>
  );
}

function mapStateToProps(state) {
  return {
    user: state.auth.user,
    followPeople: state.user.findPeople,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    findPeople: (params) => dispatch(findPeople(params)),
    follow: (id) => dispatch(follow(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FindPeople);
