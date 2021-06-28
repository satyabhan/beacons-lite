import React from "react";
import Beacon from "./Beacon";

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