import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

interface NavProps {
  updateCountry(country: string): void;
  updateSearchItem(searchItem: string): void;
}

const NavBar: React.FC<NavProps> = ({ updateCountry, updateSearchItem }) => {
  const navigate = useNavigate();
  const [searchItem, setSearchItem] = React.useState('');

  const handleCountryChange = (country: string) => {
    updateCountry(country);
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchItem(event.target.value);
  }

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateSearchItem(searchItem);
    navigate(`/search/${searchItem}`);
    setSearchItem('');
  };

  return (
    <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <NavLink className="navbar-brand" style={{ color: '#3366dd' }} aria-current="page" to="/">
          <FontAwesomeIcon className='mx-1' icon={faHome} />
          NewsBee
        </NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
                <NavLink className="nav-link" style={{ color: '#3366dd' }} aria-current="page" to="/business">Business</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" style={{ color: '#3366dd' }} aria-current="page" to="/entertainment">Entertainment</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" style={{ color: '#3366dd' }} aria-current="page" to="/sports">Sports</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" style={{ color: '#3366dd' }} aria-current="page" to="/technology">Technology</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" style={{ color: '#3366dd' }} aria-current="page" to="/health">Health</NavLink>
              </li>

              <li className="nav-item dropdown">
                <button className="nav-link dropdown-toggle" style={{ color: '#3366dd' }} id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  International
                </button>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li><NavLink onClick={() => handleCountryChange('in')} className="dropdown-item" style={{ color: '#3366dd' }} to="/country/in">India</NavLink></li>
                  <li><NavLink onClick={() => handleCountryChange('us')} className="dropdown-item" style={{ color: '#3366dd' }} to="/country/us">United States</NavLink></li>
                  <li><NavLink onClick={() => handleCountryChange('gb')} className="dropdown-item" style={{ color: '#3366dd' }} to="/country/gb">United Kingdom</NavLink></li>
                  <li><NavLink onClick={() => handleCountryChange('ca')} className="dropdown-item" style={{ color: '#3366dd' }} to="/country/ca">Canada</NavLink></li>
                  <li><NavLink onClick={() => handleCountryChange('au')} className="dropdown-item" style={{ color: '#3366dd' }} to="/country/au">Australia</NavLink></li>
                  <li><NavLink onClick={() => handleCountryChange('za')} className="dropdown-item" style={{ color: '#3366dd' }} to="/country/za">South Africa</NavLink></li>
                </ul>
              </li>
          </ul>
          <form className="d-flex" role="search" onSubmit={handleSearch}>
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={handleInputChange} value={searchItem} />
            <button className="btn btn-outline-success" type="submit">Search</button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
