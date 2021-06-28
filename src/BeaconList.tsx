import React, {useState, useEffect} from "react";
import Beacon from "./Beacon";
import Divider from "@material-ui/core/Divider";
import {beaconsRef} from "./firebase";
function BeaconList(props: any) {
  const {beacons, editMode} = props
  return (
    <>
      {beacons.map((beacon: any, i: number) => (
        <React.Fragment key={beacon.id}>
          <Beacon beacon={beacon} editMode={editMode} divider={i < beacons.length - 1} />
        </React.Fragment>
      ))}
    </>
  );
}
export default BeaconList;