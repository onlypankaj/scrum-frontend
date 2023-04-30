import React from "react";
import { Link } from "react-router-dom";
import Button from "../atom/Button";

const RetrospectiveCard = (props) => {
  const { retroId, name, summary, createDate } = props.retrospective;

  // console.log("Card : " + JSON.stringify(props.retrospective));

  const addFeedback = () => {
    console.log("Navigate to Feedback " + retroId);
  };

  return (
    <div className="item">
      <div className="content">
        {/* <Link to={{pathname : `/retrospective/${retroId}`, state:{retrospective : props.retrospective}}}> */}
        <Link
          to={`/retrospective/${retroId}`}
          state={{ retrospective: props.retrospective }}
        >
          <div className="header">RetroID : {retroId}</div>
          <div>Name : {name}</div>
          <div>Summary : {summary}</div>
          <div>Create Date: {createDate}</div>
        </Link>
        <Link to={`/feedback/add/${retroId}`}>
          <Button action={addFeedback} label="Add Feedback" />
        </Link>
      </div>
    </div>
  );
};

export default RetrospectiveCard;
