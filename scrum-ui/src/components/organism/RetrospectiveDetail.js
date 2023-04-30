import React from "react";
import { Link, useLocation } from "react-router-dom";
import Button from "../atom/Button";


const RetrospectiveDetail = (props) => {
  const location = useLocation();
  console.log("Detail location: " + JSON.stringify(location));
  const { retroId, name, summary, createDate, participants } =
    location.state.retrospective;
  // console.log("Detail location name: " + JSON.stringify(name));
  const renderParticipants = participants.map((participant) => (
    <div>{participant.name}</div>
  ));
  return (
    <div className="main">
      <div className="ui card left">Retrospective Detail</div>
      <div className="ui card left">
        <div>
          <label>Retro ID : {retroId}</label>
          <div>
            <label>Name : {name}</label>
          </div>
          <div>
            <label>Summary : {summary}</label>
          </div>
          <div>
            <label>Create Date : {createDate}</label>
          </div>
          <div>
            <label>Participants : {renderParticipants}</label>
          </div>
        </div>
      </div>
      <div className="center-div">
        <Link to="/">
          <button className="ui button blue center">
            Back to Retrospective List
          </button>
        </Link>
      </div>
      <div className="center-div">
        <Link to={`/retrospective/feedback/${retroId}`}>
          {/* <button className="ui button blue center">
            Show Feedback
          </button> */}
          <Button label="Show Feedback"/>
        </Link>
      </div>
    </div>
  );
};

export default RetrospectiveDetail;
