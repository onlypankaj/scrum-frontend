import React from "react";
import { Link } from "react-router-dom";
import RetrospectiveCard from "./RetrospectiveCard";
import SemanticDatepicker from "react-semantic-ui-datepickers";
import "react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css";
import Button from "../atom/Button";

const RetrospectiveList = (props) => {
  const {onDateChangeHandler} = props;
  // console.log("List " + JSON.stringify(props));

  const renderRetrospective = props.retrospectives.map((retrospective) => {
    return (
      <RetrospectiveCard
        retrospective={retrospective}
        key={retrospective.retroId}
      />
    );
  });

  return (
    <div className="main">
      <h2>
        Retrospective List
        <Link to="/addRetrospective">
          <Button label="Add Retrospective"/>
        </Link>        
      </h2>
      <div className="field">
          <label>Search By Date</label>
          <SemanticDatepicker onChange={onDateChangeHandler} />
        </div>
      <div className="ui celled list">{renderRetrospective}</div>
    </div>
  );
};

export default RetrospectiveList;
