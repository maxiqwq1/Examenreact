import { useContext } from "react";
import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { CartContext } from "../context/CartContext";

const RegisterPage = () => {
    const {register} = useContext(CartContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Estado de error
    const [error, setError] = useState(false);
    const [error2, setError2] = useState(false);
    const [error3, setError3] = useState(false);

    const validarDatos = (e) => {
        e.preventDefault();

        // Validación
        if (!email.trim() || !password.trim()) {
            setError(true);
            setError2(false);
            setError3(false);
            return;
        }

        if (password.length < 6) {
            setError(false);
            setError2(true);
            setError3(false);
            return;
        }

        // Limpiar errores si todo es válido
        setError(false);
        setError2(false);
        setError3(false);

        // Aquí puedes manejar el registro exitoso
        alert('Registro exitoso');
        // vaciar input
        register(email,password);

    }

    return (
        <>
            <div className="container-registro">

                <Form className="formulario-especial" onSubmit={validarDatos}>
                <h1 className="conteiner">Formulario de Registro</h1>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Ingrese su email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Ingresar Contraseña</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Contraseña"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Aceptar
                    </Button>

                    {error ? <p className="error">Todos los campos son obligatorios</p>:null}
                    {error2 ? <p className="error">La contraseña debe tener al menos 6 caracteres</p>:null}
                    {error3 ? <p className="error">Las contraseñas no coinciden</p>:null}
                </Form>
            </div>
        </>
    );
}

export default RegisterPage;