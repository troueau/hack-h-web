import React from 'react';
import { useNavigate } from 'react-router';
import ListGroup from 'react-bootstrap/ListGroup';
import FestivalInstance from './FestivalInstance';


function List(props) {

    let navigate = useNavigate();
    function detailsFestival(id) {
        navigate(`/festivalpage/${id}`)
    }

    return (
        <div>
        <ListGroup>
            {props.data.map((item) => (
            <ListGroup.Item style={{cursor: 'pointer'}} onClick={()=>detailsFestival(item.identifiant)} key={item.identifiant}>
            <FestivalInstance
            name={item?.nom_du_festival}
            place={item?.commune_principale_de_deroulement}
            date={item?.periode_principale_de_deroulement_du_festival}
            />
            </ListGroup.Item>
        ))}
        </ListGroup>
        </div>
    )
}

export default List
