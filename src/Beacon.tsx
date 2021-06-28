import React from "react";
import Switch from "@material-ui/core/Switch";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import "./Beacon.scss";
import {beaconsRef} from "./firebase";

function Beacon(props: any) {
  const { beacon } = props;
  const updateBeacon = () => {
    beaconsRef.child(beacon.id).set({...beacon,done:!beacon.done})
  }
  return (
    <div className="Beacon">
      <Switch
        edge="end" checked={beacon.done} onChange={updateBeacon}
        inputProps={{ "aria-labelledby": "switch-list-label-bluetooth" }}
      />
      <p>{beacon.linkTitle}</p>
      <p>{beacon.linkUrl}</p>
      <IconButton aria-label="delete" onClick={e => beaconsRef.child(beacon.id).remove()}>
        <DeleteIcon fontSize="large" />
      </IconButton>
    </div>
  );
}
export default Beacon;