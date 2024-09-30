import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import { CartContext } from '../context/CartContext';
import { useContext } from 'react';
import { useNavigate } from "react-router-dom";

const CardPizza = ({ id, name, ingredients, price, img }) => {
  const { addToCart } = useContext(CartContext);
  
  const pizza = { id, name, ingredients, price, img };

  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate(`/pizza/${id}`);
  };

  return (
    <Card style={{ width: '25rem' }}>
      <Card.Img variant="top" src={img} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>
          <Card.Text>
            INGREDIENTES:
          </Card.Text>
          <ul>
            {ingredients.map((ingredient, i) => (
              <li key={i}>{ingredient}</li>
            ))}
          </ul>
        </ListGroup.Item>
        <ListGroup.Item>
          <Card.Title>PRECIO: {price}</Card.Title>
          <div className="d-flex justify-content-center">
            <Card.Link href="#" className='mx-2'>
              <Button variant="primary" onClick={() => {
            handleClick(id);
          }}>Ver más 👀</Button>
            </Card.Link>
            <Card.Link href="#" className='mx-2'>
              <Button variant="dark" onClick={() => addToCart(pizza)}>Añadir 🛒</Button>
            </Card.Link>
          </div>
        </ListGroup.Item>
      </ListGroup>
    </Card>
  );
};

export default CardPizza;