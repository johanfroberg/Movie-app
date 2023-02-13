import React from 'react';
import './SideBar.css';
import { SideBarData } from './SideBarData';

const SideBar = () => {
  return (
    <div className='sidebar'>
      <div className='sidebar-title'>Movies</div>
      <ul className='sidebar-list'>
        {SideBarData.map((val, key) => {
          return (
            <li
              key={key}
              className='sidebar-info'
              id={window.location.hash === val.link ? 'active' : ''}
              onClick={() => {
                window.location.hash = val.link;
              }}
            >
              <div id='icon'>{val.icon}</div>
              <div id='title'>{val.title}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SideBar;
