
import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { useEffect } from 'react';



const Profile = () => {

  const {logout, getUser, user} = useContext(CartContext);

useEffect(() => {
  getUser();
}, []);
  return (
    <div className="profile-container">
      {user ? (
          <>
          <p>Email: {user.email}</p>
          <p>Id: {user.id}</p>
          </>

        ) : (
          <p>Porfavor entra para ver tu perfi;.</p>
        )}
      <button  className="logout-button" onClick={logout}>
        Cerrar Sesión
      </button>
    </div>
  );
}

export default Profile;