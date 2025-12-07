import { Link } from "react-router-dom";
import { useAuth } from "@/utils/AuthContext.jsx";

const Navbar = () => {
  const { user, isAuthenticated, logout, hasRole, hasAnyRole } = useAuth();

  if (!isAuthenticated) {
    return null;
  }

  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
      <div className="container-fluid">
        <Link to='/' className="navbar-brand">Peliculas</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            {hasAnyRole(['docente', 'administrador']) && (
              <li className="nav-item">
                <Link className="nav-link" to='/medias'>Admin Media</Link>
              </li>
            )}
            {hasRole('administrador') && (
              <>
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
                <li className="nav-item">
                  <Link className="nav-link" to='/users'>Usuarios</Link>
                </li>
              </>
            )}
          </ul>
          <ul className="navbar-nav">
            {user && (
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  {user.name || user.email} ({user.roles?.join(', ') || 'Sin rol'})
                </a>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                  <li>
                    <button className="dropdown-item" onClick={logout}>
                      Cerrar Sesión
                    </button>
                  </li>
                </ul>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
};

export default Navbar;
