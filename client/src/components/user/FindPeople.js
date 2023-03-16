import React, { useEffect } from "react";
import { connect } from "react-redux";

import { findPeople, follow } from "../../../actions/userActions";
import PeopleCard from "./PeopleCard";

function FindPeople(props) {
  useEffect(() => {
    props.findPeople({
      userId: props.user.userId,
    });
  }, []);

  const clickFollow = async (user) => {
    await props.follow(user._id);
    await props.findPeople({ userId: props.user.userId });
  };

  return (
    <>
      {props.followPeople ? (
        props.followPeople.length > 0 ? (
          props.small ? (
            props.followPeople.slice(0, 3).map((people, idx) => {
              return (
                <PeopleCard key={idx} people={people} callback={clickFollow} />
              );
            })
          ) : (
            props.followPeople.map((people, idx) => {
              return (
                <PeopleCard key={idx} people={people} callback={clickFollow} />
              );
            })
          )
        ) : (
          <div className="bg-violet-100 rounded-md m-4 p-4">
            <p className="text-sm text-gray-500">No Suggestions?</p>
            <p className="text-md font-bold text-gray-600">
              Looks like no one is left for you to follow!
            </p>
          </div>
        )
      ) : null}
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
