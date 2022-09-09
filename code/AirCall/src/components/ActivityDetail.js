import React, { useState } from "react";

import classes from "./ActivityDetail.module.css";

const ActivityDetail = (props) => {
  const [item, setItem] = useState([]);

  function fetchItemHandler(event) {
    console.log(event.target.value);
    var apiLink =
      "https://aircall-job.herokuapp.com/activities/" + event.target.value;
    console.log(apiLink);
    fetch(apiLink)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setItem(data);
        console.log(item);
      });
  }

  const archiveHandler = (event) => {
    var apiLink =
      "https://aircall-job.herokuapp.com/activities/" + event.target.value;
    console.log(apiLink);

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ is_archived: true }),
    };

    fetch(apiLink, requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((data) => {        
        alert("Call history archived successfully");
      });
  };

  return (
    <li className={classes.call}>
      <h2>{props.title} call</h2>
      <h3>From: {props.fromCall}</h3>
      <h3>To: {props.toCall}</h3>
      <h3>{props.duration} minutes</h3>
      <button
        className={classes.detail}
        value={props.id}
        onClick={fetchItemHandler}
      >
        Details
      </button>
      <button
        className={classes.detail}
        value={props.id}
        onClick={archiveHandler}
      >
        Archive
      </button>
      <h3>{item.via}</h3>
      <h3>{item.created_at}</h3>
    </li>
  );
};

export default ActivityDetail;
