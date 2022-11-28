import React, { useState, useEffect, useContext } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { getFestival, addFestival, updateFestival } from '../service/ferstivalService';
import { UserContext } from '../UserContext';



const FestivalPage = () => {
    const required_champ = ["nom_du_festival"]
    const {id} = useParams();
    const navigate = useNavigate();
    const [festival,set_festival] = useState([]);
    const { successAddUpdate, errorAction } = useContext(UserContext);
    const [festival_data,set_festival_data] = useState([]);
    const [is_modify_state,set_is_modify_state] = useState([]);
    let festival_data0 = {"geolocalisation": [43.522254, 5.449496], "nom_du_festival": "Festival du tambourin - Festamb", "code_postal_de_la_commune_principale_de_deroulement": "13100", "libelle_epci_collage_en_valeur": "M\u00e9tropole d'Aix-Marseille-Provence", "adresse_e_mail": "liventurie@orange.fr", "adresse_postale": "8 bis Avenue Jules ferry", "code_insee_commune": "13001", "decennie_de_creation_du_festival": "De 1980 \u00e0 1989", "region_principale_de_deroulement": "Provence-Alpes-C\u00f4te d'Azur", "annee_de_creation_du_festival": "1984", "departement_principal_de_deroulement": "Bouches-du-Rh\u00f4ne", "commune_principale_de_deroulement": "Aix-en-Provence", "code_insee_epci_collage_en_valeur": "200054807", "type_de_voie_rue_avenue_boulevard_etc": "Avenue", "discipline_dominante": "Musique", "periode_principale_de_deroulement_du_festival": "Avant-saison (1er janvier - 20 juin)", "numero_de_voie": "8 bis", "identifiant": "FEST_13001_43", "nom_de_la_voie": "Jules ferry", "site_internet_du_festival": "www.liventurie.org", "envergure_territoriale": "Nationale", "complement_d_adresse_facultatif": "Oustau de prouv\u00e8n\u00e7o, parc jourdan", "sous_categorie_musique": "Musique traditionnelle"}

    
    useEffect(() => {
        if(id !== undefined){
            getFestival(id).then((res) => {
                res.forEach(q=>
                    {set_festival({...q.data(), "nombre_de_place":0, "etat_billeterie":"fermee"}); 
                    set_festival_data({...q.data(), "nombre_de_place":0, "etat_billeterie":"fermee"})})
            }).catch(err => console.log(`error = ${err}`));
            set_is_modify_state(false)
        }else{
            let fest={};
            Object.keys(festival_data0).map(key =>
                fest = {...fest, [key]:""})
            fest = {...fest, "nombre_de_place":0, "etat_billeterie":"fermee"}
            set_festival(fest)
            set_festival_data(fest)
            set_is_modify_state(true)
        }
    }, [])
    



    const handleModifButton = () => {
        if(is_modify_state){
            if(JSON.stringify(festival) !== JSON.stringify(festival_data)){
                alert("les changements sont perdus");
                set_festival(festival_data);          
            }

            set_is_modify_state(false);  
        }else{
            set_is_modify_state(true);
        }
    };

    const handleValidButton = () => {
        let valid_form = true
        let missings_champ = []
        required_champ.forEach(champ => {
            if(festival[champ] === ""){
                valid_form = false
                missings_champ.push(champ)
            }
        });
        if(valid_form){
            set_festival_data(festival)
            if(id === undefined){
                handleNo();
            }else{
                setShow(true);
            }
        }else{
            alert("les champs "+ missings_champ.toString()+ " sont obligatoires")
        }
    };

    const handleModifications = (text, champ) => {
        set_festival({...festival, [champ]: text})
    };

    let button;
    if(is_modify_state){
        button =<Button variant="success" type="submit" onClick={handleValidButton} style={{position:'fixed', bottom:15, right:15}} >Valider</Button>;
    }else{
        button=<Button variant="primary" type="submit" onClick={goToNotif} style={{position:'fixed', bottom:15, right:15}}>Envoyer Notification</Button>;
    }
    
    //Modal part
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    function goToNotif() {
        navigate(`/notification/${id}`);
    }

    function handleYes(){
        // envoie notification
        set_festival({...festival,geolocalisation: festival.geolocalisation.toString().split(",")})

        if(id !== undefined){
            updateFestival(id,festival).then(res => {
                navigate(`/notification/${id}`);
            })
            .catch((err) => console.log(err));
        }else{
            addFestival(festival).then((res) => {
                console.log("success add");
                navigate(`/notification/${id}`);
            })
            .catch((err) => console.log("error"));
        }

        setShow(false);
       // navigate(`/notification/${id}`);
    }

    function handleNo(){
        set_festival({...festival,geolocalisation: festival.geolocalisation.toString().split(",")})

        if(id !== undefined){
            updateFestival(id,festival).then(res => {
                successAddUpdate("Le festival a bien été modifié");
                navigate(`/home`);
            })
            .catch((err) => errorAction("Error Update Festival"));
        }else{
            addFestival(festival).then((res) => {
                successAddUpdate("Le festival a bien été ajouté");
                navigate('/home');
            })
            .catch((err) => errorAction("Error ADD Festival"));
        }
        setShow(false);
    }

    function handleCancel(){
        setShow(false);
    }

    return (    
        <div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Notifier vos utilisateurs?</Modal.Title>
                </Modal.Header>
                <Modal.Body>Souhaitez-vous notifier les utilisateurs de vos changements?</Modal.Body>
                <Modal.Footer>
                    <Button variant="warning" onClick={handleCancel}>Annuler</Button>
                    <Button variant="secondary" onClick={handleNo}>Non</Button>
                    <Button variant="primary" onClick={handleYes}>Oui</Button>
                </Modal.Footer>
            </Modal>
            
            <div style={{marginLeft:'1em', fontSize:40}}>{(id===undefined)?"Création d'un festival":festival_data.nom_du_festival}</div>
            <Button variant="warning" type="submit" onClick={handleModifButton} style={{position:'absolute',top:70, right:15}}>
                {is_modify_state?"Consulter":"Modifier"}
            </Button>

            <Form style={{padding:'1em', paddingBottom:'3em'}}>
                { Object.keys(festival).sort().map(key => {
                    let champ_name = key;
                    champ_name = champ_name.replaceAll("_"," ");
                    champ_name = champ_name.charAt(0).toUpperCase() + champ_name.slice(1);
                    if(key === "etat_billeterie"){
                        return(
                        <Form.Group className='mb-3'>
                            <Form.Label>{champ_name}</Form.Label>
                            <Form.Select value={festival[key]} onChange={(text) => handleModifications(text.target.value, key)} disabled={!is_modify_state}>
                                <option value="fermee">fermée</option>
                                <option value="ouverte">ouverte</option>
                                <option value="dernieres_places">dernières places</option>
                                <option value="complet">complet</option>
                            </Form.Select>
                        </Form.Group>
                        );
                    }else if(key !== "identifiant"){
                        return (
                        <Form.Group className='mb-3' >
                            <Form.Label>{champ_name} {required_champ.includes(key)?'*':""}</Form.Label>
                            <Form.Control type="text" value={festival[key]} onChange={(text) => handleModifications(text.target.value, key)} disabled={!is_modify_state}/>
                        </Form.Group>
                        );
                    }
                })}
            </Form>
            {button}

        </div>
    );
};





export default FestivalPage;
