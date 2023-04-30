import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FeedbackCard from "./FeedbackCard";
import { Link } from "react-router-dom";
import api from "../../api/RetrospectiveApi"

const FeedbackList = (props) => {

  let params = useParams();
  console.log("URL retro ID" + params.retroId);

  const [feedbacks, setFeedbacks] = useState([]);

  //Retrieve api feedbacks
  const retrieveFeedback = async (retroId) => {
    const response = await api.get("/feedback/"+ params.retroId);
    console.log("Response : " + JSON.stringify(response))
    return response.data;
  };

  useEffect(() => {
    const getAllFeedbacks = async () => {
      const allFeedbacks = await retrieveFeedback();
      if (allFeedbacks) setFeedbacks(allFeedbacks);
    };
    getAllFeedbacks();
  },[]);

  const renderFeedback = feedbacks.map((feedback) => {
    console.log("Calling api")
    return <FeedbackCard feedback={feedback} key={feedback.feedId} />;
  });

  return (
    <div className="main">
      <h2>
        Feedback List
        <div>
          <Link to="/">
            <button className="ui button blue center">
              Back To Retrospective List
            </button>
          </Link>
        </div>
      </h2>
      <div className="ui celled list">{renderFeedback}</div>
    </div>
  );
};

export default FeedbackList;
