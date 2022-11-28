import React, { useEffect, useState } from 'react'
import { getFestivals } from '../../service/ferstivalService';
export default function Home() {
    const [data, setData] = useState([]);
    useEffect(() => {
        getFestivals().then((res) => {
            setData(res);
            res.forEach((q) => console.log(q.data()));
        })
            .catch(err => console.log(`error = ${err}`));
    }, [])
  return (
    <div>Hello Home Page</div>
  )
}
