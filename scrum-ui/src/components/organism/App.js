import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import Header from "./Header";
import AddRetrospective from "./AddRetrospective";
import RetrospectiveList from "./RetrospectiveList";
import FeedbackAdd from "./FeedbackAdd";
import RetrospectiveDetail from "./RetrospectiveDetail";
import api from "../../api/RetrospectiveApi"
import FeedbackList from "./FeedbackList";
import { format } from "date-fns";

function App() {
  // const LOCAL_STORAGE_KEY = "retrospectives";
  const [retrospectives, setRetrospectives] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");

  const onDateChangeHandler = (event, data) => {
    if (data.value) {
      console.log("Parent Date picker : " + format(data.value, "yyyy-MM-dd"));
      setSelectedDate(format(data.value, "yyyy-MM-dd"));
    } else {
      setSelectedDate("");
    }
  };

  //Retrieve api retrospective
  const retrieveRetrospective = async (selectDate) => {
    let retrospectiveUrl = "/retrospective/";
    if (selectDate) {
      retrospectiveUrl = retrospectiveUrl + selectDate;
    } 
    const response = await api.get(retrospectiveUrl);
    return response.data;

  };

  const addRetrospectiveHandler = async (retrospective) => {
    console.log("Parent Retrospective : " + JSON.stringify(retrospective));

    const response = await api.post("/retrospective", retrospective);
    console.log("Response : " + JSON.stringify(response));
    setRetrospectives([...retrospectives, response.data]);
  };

  const addFeedbackHandler = async (feedback) => {
    console.log("Parent Feedback handler : " + JSON.stringify(feedback));
  };

  useEffect(() => {
    const getAllRetrospectives = async () => {
      const allRetrospectives = await retrieveRetrospective(selectedDate);
      if (allRetrospectives) setRetrospectives(allRetrospectives);
    };
    getAllRetrospectives();
  }, [selectedDate]);

  return (
    <div className="ui container">
      <Router>
        <Header />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <RetrospectiveList
                retrospectives={retrospectives}
                onDateChangeHandler={onDateChangeHandler}
              />
            }
          />
          <Route
            path="/addRetrospective"
            element={
              <AddRetrospective
                addRetrospectiveHandler={addRetrospectiveHandler}
              />
            }
          />
          <Route
            path="/retrospective/:retroId"
            element={<RetrospectiveDetail />}
          />
          <Route
            path="/retrospective/feedback/:retroId"
            element={<FeedbackList />}
          />
          <Route path="/feedback/add/:retroId" element={<FeedbackAdd />} />
          <Route
            path="/addFeedback"
            element={<FeedbackAdd addFeedbackHandler={addFeedbackHandler} />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
