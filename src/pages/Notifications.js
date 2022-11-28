import {React, useContext, useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';
import { sendNotification } from '../service/notificationService';
import { UserContext } from '../UserContext';



function Notifications(){
    const {id} = useParams();
    const navigate = useNavigate();
    const { successAddUpdate, errorAction } = useContext(UserContext);
    //Manage values to send notification then
    const [inputTitle, setInputTitle] = useState("");
    const [inputInfo, setInputInfo] = useState("");
    let inputTitleHandler = (e) => setInputTitle(e.target.value);
    let inputInfoHandler = (e) => setInputInfo(e.target.value);

    function handleCancel(){
        navigate(`/home`);
    }

    function handleValidation(){
        //TODO: Add notification mecanism here
        let notif = {
            identifiant: id,
            title: inputTitle,
            message: inputInfo
        }
        sendNotification(notif).then((res) => {
            successAddUpdate("Notification a été bien ajouté");
            navigate('/home');
        })
        .catch((err) => errorAction("Error Add Notification"));
    }

    return(
        <div style={{margin:'2em'}}>
            <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label style={{fontSize:'3em'}}>Titre</Form.Label>
                    <Form.Control type="email" placeholder="Entrer le titre de la notification" onChange={inputTitleHandler}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label style={{fontSize: '2em'}}>Information</Form.Label>
                    <Form.Control as="textarea" rows={15} onChange={inputInfoHandler}/>
                </Form.Group>
            </Form>
            <Button variant="danger" onClick={handleCancel}>Annuler</Button>{' '}
            <Button onClick={handleValidation}>Valider</Button>
        </div>
    )
}

export default Notifications;