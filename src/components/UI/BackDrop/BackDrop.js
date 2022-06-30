import React from 'react'
import styles from './BackDrop.css'

const BackDrop = (props) => {
    
    return(
        <div 
        className={styles.Backdrop}
        onClick={props.onClick}
        >
        </div>
    )
}

export default BackDrop