import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import { useContext, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const Pizza = () => {
  const { getPizza,addToCart, userPizza, setUserPizza } = useContext(CartContext);
  const { id } = useParams();

  console.log(setUserPizza)
  useEffect(() => {
    getPizza(id);
  }, [id, getPizza]);

  // Renderizar solo si los datos están cargados
  if (!userPizza || !userPizza.ingredients) {
    return <p>Cargando pizza...</p>;
  }

  return (
    <>
      <div className="d-flex justify-content-center align-items-center mt-5">
        <Card style={{ width: "25rem" }}>
          <Card.Img variant="top" src={userPizza.img} />
          <Card.Body>
            <Card.Title>{userPizza.name}</Card.Title>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroup.Item>
              <Card.Text>INGREDIENTES:</Card.Text>
              <Card.Text>{userPizza.desc}</Card.Text>
              <ul>
                {userPizza.ingredients.map((ingredient, i) => (
                  <li key={i}>{ingredient}</li>
                ))}
              </ul>
            </ListGroup.Item>
            <ListGroup.Item>
              <Card.Title>PRECIO: {userPizza.price}</Card.Title>
              <div className="d-flex justify-content-center">
                <Card.Link href="#" className="mx-2 m-3">
                  <Button variant="dark" onClick={() => addToCart(userPizza)}>Añadir 🛒 </Button>
                </Card.Link>
              </div>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </div>
    </>
  );
};

export default Pizza;