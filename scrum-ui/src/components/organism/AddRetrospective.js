import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SemanticDatepicker from "react-semantic-ui-datepickers";
import "react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css";
import Multiselect from "multiselect-react-dropdown";
import { format } from "date-fns";
import api from "../../api/RetrospectiveApi"
import Button from "../atom/Button";

const AddRetrospective = (props) => {
  let navigate = useNavigate();
  const initialRetrospective = {
    retroId: 0,
    name: "",
    summary: "",
    createDate: null,
    participants: [],
  };
  const [retrospective, setRetrospective] = useState(initialRetrospective);
  // const [options, setOptions] = useState([100, 101, 102]);
  const [part, setPart] = useState([]);

    //Retrieve api retrospective
    const retrieveParticipant = async () => {
      const response = await api.get("/participant");
      // console.log("Participant Received: " + JSON.stringify(response.data))
      return response.data;  
    };

  //   const onDateChange = (event, data) => setCreateDate(data.value);
  const onDateChange = (event, data) => {
    console.log("Date picker : " + format(data.value, "yyyy-MM-dd"));
    setRetrospective({
      ...retrospective,
      createDate: format(data.value, "yyyy-MM-dd"),
    });
  };

  const add = (e) => {
    e.preventDefault();
    if (
      retrospective.name === "" ||
      retrospective.summary === "" ||
      retrospective.createDate === null
    ) {
      alert("Add field are mandatory");
      return;
    }

    props.addRetrospectiveHandler(retrospective);
    console.log("Child Retrospective " + JSON.stringify(retrospective));
    setRetrospective(initialRetrospective);
    navigate("/");
  };

  useEffect(() => {
    const getAllParticipants = async () => {
      const allParticipants = await retrieveParticipant();
      const getParticipantIds = []
      if (allParticipants) {
        allParticipants.map((participant)=>{getParticipantIds.push(participant.partId)})
        // setPart(allParticipants);
        setPart(getParticipantIds)
      }
    };
    getAllParticipants();
  }, []);

  return (
    <div className="ui main">
      <h3>Add Retrospective</h3>
      <form className="ui form" onSubmit={add}>
        <div className="field">
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            value={retrospective.name}
            // onChange={(e) => setName(e.target.value)}
            onChange={(e) =>
              setRetrospective({ ...retrospective, name: e.target.value })
            }
          ></input>
        </div>
        <div className="field">
          <label>Summary</label>
          <input
            type="text"
            name="summary"
            value={retrospective.summary}
            // onChange={(e) => setSummary(e.target.value)}
            onChange={(e) =>
              setRetrospective({ ...retrospective, summary: e.target.value })
            }
            placeholder="Enter Summary"
          ></input>
        </div>
        <div className="field">
          <label>Participant</label>
          <Multiselect
            isObject={false}
            options={part}
            showCheckbox
            onSelect={(e) =>
              setRetrospective({ ...retrospective, participants: e })
            }
            onRemove={(e) =>
              setRetrospective({ ...retrospective, participants: e })
            }
          />
        </div>
        <div className="field">
          <label>Date</label>
          <SemanticDatepicker onChange={onDateChange} />
        </div>
        {/* <div>
          <button className="ui button blue">Add</button>
        </div> */}
        <Button label="Add"/>
      </form>
    </div>
  );
};

export default AddRetrospective;
