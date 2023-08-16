import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import './Navbar.css';
import { IconContext } from 'react-icons';
import { search } from "../../config/config";
import { Search } from "semantic-ui-react";
import _ from "lodash";


const categoryLayoutRenderer = ({ categoryContent, resultsContent }) =>
  resultsContent && (
    <div style={{ display: "flex", padding: 0 }}>
      <div className="name" style={{ padding: 10, width: "20%" }}>
        {categoryContent}
      </div>
      <div className="results" style={{ padding: "0 !important", margin: 0 }}>
        {resultsContent?.map((zone) => {

          return (
            <Link key={`${zone.key}`} to={zone.key}>
              {zone}
            </Link>
          );
        })}
      </div>
    </div>
  );

const Navbar = (props) => {
  const [sidebar, setSidebar] = useState(false);
  const [value, setValue] = useState("Search Horses, Jockeys, Venues or Races");
  const [searchResult, setSearchResult] = useState([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  


 
  const handleSearchChange = async (e, { value }) => {
    setValue(value);
    let length = value.length
    // setState({ isLoading: true, value })
    if (length > 1) {
      setIsLoading(true);
      await search(value).then((res) => {
        setSearchResult(res);
        setIsLoading(false);
      });
    }
  };

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
    <div  style={{textAlign:"center", marginTop:25}}>
      
    <Search style={{textAlign:"center",width:"auto"}}
            
            category
            categoryLayoutRenderer={categoryLayoutRenderer}
            loading={isLoading}
            onResultSelect={(e, data) => {
              props.history.push(data.result.route);
              setValue("");
            }}
            onSearchChange={_.debounce(handleSearchChange, 500, {
              leading: true,
            })}
            results={searchResult}
            value={value}
            onFocus={() => {
              setValue("");
            }}
            onBlur={() => {
              setValue("Search Horses, Jockeys, Venues or Races");
            }}
          />
    </div>
      <IconContext.Provider value={{ color: '#142841' }}>
        
          <Link to='#' className='menu-bars'>
            <FaIcons.FaBars onClick={showSidebar} style={{marginLeft:50}} />
          </Link>
        
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;