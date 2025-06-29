import styles from './Button.module.css'

import { Link } from "react-router-dom"

function Button ({type='button',to="/",handleClick=null,myStyles,myClasses,disabled=false,children='submit'}){
    if (type === 'link') return <Link
    className={`${myClasses} ${styles.button}`}
    style={myStyles}
    to={to}
    >{children}</Link>
    return(
        <button  className={`${myClasses} ${styles.button}`}
        style={myStyles} 
        type={type}
        onClick={handleClick}
        disabled={disabled}>
            {children}
        </button>
    )
}

export default Button