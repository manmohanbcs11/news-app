import { Component } from 'react'
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export class NavBar extends Component {
  static propTypes = {}

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" aria-current="page" href="/">
            <FontAwesomeIcon className='mx-1' icon={faHome} />
            NewsBee
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link" aria-current="page" href="/">Politics</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" aria-current="page" href="/">Business</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" aria-current="page" href="/">Sports</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" aria-current="page" href="/">Technology</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" aria-current="page" href="/">Entertainment</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" aria-current="page" href="/">International</a>
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