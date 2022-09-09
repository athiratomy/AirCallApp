import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";

import ActivityFeed from "./components/ActivityFeed";
import "./App.css";

function App() {
  
  const [callHistory, setCallHistory] = useState([]);
  const [archivedCalls, setArchivedCalls] = useState([]);
  const [isActivity, setIsActivity] = useState(true);

  function fetchCallsHandler() {
   
    fetch("https://aircall-job.herokuapp.com/activities")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const transformedData = data.map((callData) => {
          return {
            id: callData.id,
            title: callData.direction,
            duration: callData.duration,
            fromCall: callData.from,
            toCall: callData.to,
            isArchived: callData.is_archived,
          };
        });
        const filteredData = transformedData.filter(
          (data) => data.isArchived === false
        );
        setCallHistory(filteredData);
      });
      setIsActivity(true);
  }

  function fetchArchivedHandler() {
   
    fetch("https://aircall-job.herokuapp.com/activities")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const transformedData = data.map((callData) => {
          return {
            id: callData.id,
            title: callData.direction,
            duration: callData.duration,
            fromCall: callData.from,
            toCall: callData.to,
            isArchived: callData.is_archived,
          };
        });
        const filteredData = transformedData.filter(
          (data) => data.isArchived === true
        );
        setArchivedCalls(filteredData);
      });
      setIsActivity(false);
  }

  return (
    <React.Fragment>
      <Navbar className = "navigation" collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Nav className="me-auto nav-item">
            <button onClick={fetchCallsHandler}>Call Activity</button>
            <button onClick={fetchArchivedHandler}>Archived Calls</button>
          </Nav>
        </Container>
      </Navbar>
      <section>
        {isActivity ? (
          <ActivityFeed callHistory={callHistory} />
        ) : (
          <ActivityFeed callHistory={archivedCalls} />
        )}
      </section>
    </React.Fragment>
  );
}

export default App;
