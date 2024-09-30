import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
// Crear context
export const CartContext = createContext();

// Crear el Provider
const CartProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [userPizza, setUserPizza] = useState([]);
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  const addToCart = (pizza) => {
    const index = cart.findIndex((item) => item.id === pizza.id);
    if (index !== -1) {
      const newCart = [...cart];
      newCart[index].count++;
      setCart(newCart);
    } else {
      const newCart = [...cart, { ...pizza, count: 1 }];
      setCart(newCart);
    }
  };

  const decreaseQuantity = (id) => {
    setCart(
      cart
        .map((pizza) =>
          pizza.id === id ? { ...pizza, count: pizza.count - 1 } : pizza
        )
        .filter((pizza) => pizza.count > 0)
    );
  };

  const totalPrice = cart.reduce(
    (total, pizza) => total + pizza.price * pizza.count,
    0
  );

  const getQuantity = () => {
    return Math.round(cart.reduce((total, pizza) => total + pizza.count, 0));
  };

  const getPizza = async (id) => {
    const response = await fetch(`http://localhost:5000/api/pizzas/${id}`);
    const data = await response.json();
    setUserPizza(data);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    navigate("/login");
  };

  const getUser = async () => {
    if (token) {
      const response = await fetch("http://localhost:5000/api/auth/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setUser(data);
    }
  };

  const login = async (emailValue, passwordValue) => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: emailValue,
          password: passwordValue,
        }),
      });

      const data = await response.json();

      // Verifica si hay un error en la respuesta
      if (data.error) {
        alert(data.error); // Muestra el mensaje de error
        return; // Detiene la ejecución si hay un error
      }

      // Si no hay errores, almacena el token y navega a la página principal
      alert("Authentication successful!");
      localStorage.setItem("token", data.token);
      setToken(data.token);
      navigate("/");
    } catch (error) {
      console.error("Login error:", error); // Maneja errores en la petición
    }
  };

  const register = async (email, password) => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      // Verifica si hay un error en la respuesta
      if (data.error) {
        alert(data.error);
        return;
      }

      alert("Authentication successful!");
      localStorage.setItem("token", data.token);
      setToken(data.token);
      navigate("/");
    } catch (error) {
      console.error("Error en el Registro ", error); // Maneja errores en la petición
    }
  };

  const simulacro = async () => {
    const response = await fetch("http://localhost:5000/api/checkouts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        cart: {cart},
      }),
    });
    let data = await response.json();
    alert(data?.error || data.message);
  };
  return (
    <CartContext.Provider
      value={{
        simulacro,
        register,
        login,
        getUser,
        user,
        cart,
        addToCart,
        decreaseQuantity,
        totalPrice,
        getQuantity,
        getPizza,
        userPizza,
        setUserPizza,
        token,
        logout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
