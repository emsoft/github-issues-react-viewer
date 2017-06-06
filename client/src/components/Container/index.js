import React from 'react';
import global from '../../assets/app.global.css';


function Container(props) {
  return <div className={global['container']}>{props.children}</div>;
}


export default Container;
