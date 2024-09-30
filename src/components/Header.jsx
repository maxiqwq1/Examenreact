
const Header = ({titulo,descripcion}) =>{
    return(
        <div className="header">
            <div className="content">
                <h1>{titulo}</h1>
                <p>{descripcion}</p>
            </div>

        </div>
    )
}

export default Header;