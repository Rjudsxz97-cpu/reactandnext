import Link from 'next/link';
import { Container, Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export const Menu: React.FC = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link href="/" className="navbar-brand">Livraria</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link href="/" className="nav-link">Inicio</Link>
              </li>
              <li className="nav-item">
                <Link href="/LivroLista" className="nav-link">Catálogo</Link>
              </li>
              <li className="nav-item">
                <Link href="/LivroDados" className="nav-link">Novo</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
};

export default Menu;
