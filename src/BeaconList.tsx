import React, {useState, useEffect} from "react";
import Beacon from "./Beacon";
import Divider from "@material-ui/core/Divider";
import {beaconsRef} from "./firebase";
function BeaconList() {
  const [beacons, setBeacons] = useState<any>([]);
  useEffect(() => {
    beaconsRef.on('value', (snapshot) => {
      const items = snapshot.val();
      const newState = [];
      for (const item in items) {
        newState.push({
          id: item,
          linkTitle: items[item].linkTitle,
          linkUrl: items[item].linkUrl,
          done: items[item].done
        });
      }
      setBeacons(newState)
    });
  }, [])
  return (
    <>
      {beacons.map((beacon: any, i: number) => (
        <React.Fragment key={beacon.id}>
          <Beacon beacon={beacon}/>
          {i < beacons.length - 1 && <Divider/>}
        </React.Fragment>
      ))}
    </>
  );
}
export default BeaconList;