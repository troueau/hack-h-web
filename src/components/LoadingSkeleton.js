import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';


export default function LoadingSkelton() {
  return (
   <div style={{margin: "0.5em"}}>
    {
        [...Array(5).keys()].map(key => (
          <Skeleton width="80%"  height={120} />
        ))
    }
    </div>
  );
}