import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import api from "../../api/RetrospectiveApi";
import Multiselect from "multiselect-react-dropdown";

const FeedbackAdd = (props) => {
  let navigate = useNavigate();
  let params = useParams();
  // console.log("URL retro ID" + params.retroId);

  const initialFeedback = {
    body: "",
    type: "",
    retroId: params.retroId,
    partId: "",
  };
  const [feedback, setFeedback] = useState(initialFeedback);

  // console.log("Feedback " + JSON.stringify(feedback));

  const addFeedbackHandler = async (feedback) => {
    console.log("Parent Retrospective : " + JSON.stringify(feedback));

    const response = await api.post("/feedback/add", feedback);
    // console.log("Response : " + JSON.stringify(response));
    // setRetrospectives([...retrospectives, response.data]);
    return response.data
  };

  // const [options, setOptions] = useState([100, 101, 102]);
  const [type] = useState(["POSITIVE", "NEGATIVE", "IDEA", "PRAISE"]);
  const [part, setPart] = useState([]);

  //Retrieve api retrospective
  const retrieveParticipant = async () => {
    const response = await api.get("/participant");
    // console.log("Participant Received: " + JSON.stringify(response.data));
    return response.data;
  };

  const add = (e) => {
    e.preventDefault();
    if (
      feedback.body === "" ||
      feedback.type === "" ||
      feedback.retroId === "" ||
      feedback.partId === ""
    ) {
      alert("Add field are mandatory");
      return;
    }
    console.log("Child Retrospective " + JSON.stringify(feedback));
    addFeedbackHandler(feedback);
    setFeedback(initialFeedback);
    navigate("/");
  };

  useEffect(() => {
    const getAllParticipants = async () => {
      const allParticipants = await retrieveParticipant();
      const getParticipantIds = [];
      if (allParticipants) {
        allParticipants.map((participant) => {
          getParticipantIds.push(participant.partId);
        });
        // setPart(allParticipants);
        setPart(getParticipantIds);
      }
    };
    getAllParticipants();
  }, []);

  return (
    <div className="ui main">
      <h3>Add Feedback</h3>
      <form className="ui form" onSubmit={add}>
        <div className="field">
          <label>Body</label>
          <input
            type="text"
            name="body"
            placeholder="Enter Feedback"
            value={feedback.body}
            onChange={(e) => setFeedback({ ...feedback, body: e.target.value })}
          ></input>
        </div>
        <div className="field">
          <label>Type</label>
          {/* <input
            type="text"
            name="type"
            value={feedback.type}
            onChange={(e) => setFeedback({ ...feedback, type: e.target.value })}
            placeholder="Enter Summary"
          ></input> */}
          <Multiselect
            isObject={false}
            options={type}
            singleSelect={true}
            onSelect={(e) => setFeedback({ ...feedback, type: e[0] })}
            onRemove={(e) => setFeedback({ ...feedback, type: e[0] })}
          />

        </div>
        <div className="field">
          <label>Participant</label>
          <Multiselect
            isObject={false}
            options={part}
            singleSelect={true}
            onSelect={(e) => setFeedback({ ...feedback, partId: e[0] })}
            onRemove={(e) => setFeedback({ ...feedback, partId: e[0] })}
          />
        </div>
        <div>
          <button className="ui button blue">Add</button>
        </div>
      </form>
    </div>
  );
};

export default FeedbackAdd;
