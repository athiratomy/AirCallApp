import React from "react";

import ActivityDetail from "./ActivityDetail";
import classes from "./ActivityFeed.module.css";

const ActivityFeed = (props) => {

  const dataChangeHandler = (changedData) => {    
    const newCallData = {...changedData};
    props.onSaveData(newCallData);   
  }

  return (
    <ul className={classes["calls-list"]}>
      {props.callHistory.map((data) => (        
        <ActivityDetail
          id={data.id}
          title={data.title}
          duration={data.duration}
          fromCall={data.fromCall}
          toCall={data.toCall}
          isArchived={data.is_archived}
          onDataChange={dataChangeHandler}
        />
      ))}
    </ul>
  );
};

export default ActivityFeed;
