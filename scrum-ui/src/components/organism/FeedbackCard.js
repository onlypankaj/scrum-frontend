import React from "react";

const FeedbackCard = (props) => {
  const { feedId, body, type, participant } = props.feedback;
  // console.log("Card : " + JSON.stringify(props.feedback));

  const addFeedback = () => {
    console.log("Navigate to Feedback " + feedId);
  };

  return (
    <div className="item">
      <div className="content">
        <div>
          <label>FeedId : {feedId}</label>
        </div>
        <div>
          <label>Body : {body}</label>
        </div>
        <div>
          <label>Type : {type}</label>
        </div>
        <div>
          <label>Participant : {participant.name}</label>
        </div>
      </div>
    </div>
  );
};

export default FeedbackCard;
