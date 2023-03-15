import React from "react";

function PeopleCard(props) {
  return (
    <div className="flex items-center p-2 justify-between">
      <div className="flex items-center">
        <img
          className="w-8 h-8 rounded-full border-2 border-violet-100"
          src="https://tecdn.b-cdn.net/img/new/avatars/2.webp"
          alt="Image"
        />
        <div className="ps-2">
          <p className="text-md">
            <a href={`/user/${props.people._id}`}>{props.people.name}</a>
          </p>
          <p className="text-sm text-gray-400">{props.people._id}</p>
        </div>
      </div>
      {props.callback && (
        <div className="px-2">
          {/* Follow/Unfollow Button */}
          <button
            className="bg-violet-500 rounded-md py-1 px-2 text-gray-50"
            onClick={() => props.callback(props.people)}
          >
            {props.btn === "follow" ? "Follow" : "Unfollow"}
          </button>
        </div>
      )}
    </div>
  );
}

export default PeopleCard;
