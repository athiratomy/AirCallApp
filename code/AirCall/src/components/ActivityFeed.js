import React from "react";

import ActivityDetail from "./ActivityDetail";
import classes from "./ActivityFeed.module.css";

const ActivityFeed = (props) => {
  return (
    <ul className={classes["calls-list"]}>
      {props.callHistory.map((data) => (
        <ActivityDetail
          id={data.id}
          title={data.title}
          duration={data.duration}
          fromCall={data.fromCall}
          toCall={data.toCall}
        />
      ))}
    </ul>
  );
};

export default ActivityFeed;
