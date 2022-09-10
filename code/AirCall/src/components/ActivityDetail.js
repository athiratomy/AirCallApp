import React, { useState } from "react";

import classes from "./ActivityDetail.module.css";


const ActivityDetail = (props) => {
 
  const [item, setItem] = useState([]);  
  const [archiveCheck, setArchiveCheck] = useState('');
 var requestOptions;
 
  
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
      });
  }

  const archiveHandler = (event) => {
    var apiLink =
      "https://aircall-job.herokuapp.com/activities/" + event.target.value;   
      fetch(apiLink)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setArchiveCheck(data.is_archived);
        console.log(archiveCheck) ;      
      });

    if(archiveCheck === true) {
       requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_archived: false }),
      };     
     
    }
    else{
      requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_archived: true }),
      };   
       
    }    

    fetch(apiLink, requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((data) => {        
        props.onDataChange(data);
      });
      
  };

  return (
    <li className={classes.call}>      
      <h3>From: {props.fromCall}</h3>
      <h3>To: {props.toCall}</h3>
      <h3>{props.duration} minutes</h3>
      <h4>{props.title} call</h4>
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
       Archive/Unarchive
      </button>               
      <h3>{item.via}</h3>
      <h3>{item.created_at}</h3>
      
    </li>
  );
};

export default ActivityDetail;
