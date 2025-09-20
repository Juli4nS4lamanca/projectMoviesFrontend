import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
      <div className="container-fluid">
        <Link to='/medias' className="navbar-brand">Peliculas</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to='/newMedia'>Nueva Pelicula</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to='/directors'>Directores</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to='/producers'>Productoras</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to='/genres'>Generos</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to='/types'>Tipos</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
};

export default Navbar;
