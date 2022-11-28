import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function FestivalInstance(props) {

    return(
        <div>
        <Row xs={2} md={4} lg={3}>
            <Col><div style={{fontSize:'1.3em', fontWeight:'bold', marginLeft:'2em', color:'#0D6EFD'}}>{props.name}</div></Col>
            <Col>
                <Row>
                    <div style={{fontSize: '1em', fontWeight:'bold'}}>{props.place}</div>
                    <div style={{fontSize:'1em'}}>{props.date}</div>
                </Row>
            </Col>
        </Row>


        </div>
    )
}

export default FestivalInstance;
