import { Component } from 'react'
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface NavProps {
  country: string;
  changeCountry(country: string): void;
}

export class NavBar extends Component<NavProps> {

  render() {
    const { changeCountry } = this.props;

    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" style={{ color: '#3366dd' }} aria-current="page" href="/">
            <FontAwesomeIcon className='mx-1' icon={faHome} />
            NewsBee
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link" style={{ color: '#3366dd' }} aria-current="page" href="/politics">Politics</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" style={{ color: '#3366dd' }} aria-current="page" href="/business">Business</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" style={{ color: '#3366dd' }} aria-current="page" href="/sports">Sports</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" style={{ color: '#3366dd' }} aria-current="page" href="/technology">Technology</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" style={{ color: '#3366dd' }} aria-current="page" href="/entertainment">Entertainment</a>
              </li>

              <li className="dropdown">
                <button className="btn btn-outline-dark dropdown-toggle" type="button" style={{ color: '#3366dd' }} data-bs-toggle="dropdown" aria-expanded="false">
                  International
                </button>
                <ul className="dropdown-menu" style={{ backgroundColor: '#5d8fd9' }}>
                  <li><button className="dropdown-item" type="button" onClick={() => changeCountry('IN')}>India</button></li>
                  <li><button className="dropdown-item" type="button" onClick={() => changeCountry('US')}>United States</button></li>
                  <li><button className="dropdown-item" type="button" onClick={() => changeCountry('GB')}>United Kingdom</button></li>
                  <li><button className="dropdown-item" type="button" onClick={() => changeCountry('CA')}>Canada</button></li>
                  <li><button className="dropdown-item" type="button" onClick={() => changeCountry('AU')}>Australia</button></li>
                  <li><button className="dropdown-item" type="button" onClick={() => changeCountry('ZA')}>South Africa</button></li>
                </ul>
              </li>

            </ul>
            <form className="d-flex" role="search">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
          </div>
        </div>
      </nav>
    )
  }
}

export default NavBar