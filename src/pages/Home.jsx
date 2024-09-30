import Header from "../components/Header"
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import CardPizza from "../components/CardPizza";
import { useEffect, useState } from "react";

const Home =() =>{
//infor traera el valor desde la API
const [infor,setInfor] = useState([]);

// funcion de consumir API
const consultarApi = async () =>{
    const url = "http://localhost:5000/api/pizzas";
    const response = await fetch(url);
    const data = await response.json();
    setInfor(data);
    console.log(infor);
};

useEffect(()=>{
    consultarApi();
},[])

    return(
        <>
        <Header titulo="Pizitarika!" descripcion="La mejor pizza en tanto calidad y Amor"/>
        <Container >
            <Row className="mt-4">

            {infor.map((pizza) =>(
                <Col key={pizza.id}>
                    <CardPizza id={pizza.id} name={pizza.name} price={pizza.price} desc={pizza.desc} ingredients={pizza.ingredients} img={pizza.img}/>
                </Col>
            ))}
            </Row>
        </Container>

        </>
    )
}

export default Home;