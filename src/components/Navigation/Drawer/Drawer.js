import React, {Component} from 'react'
import styles from './Drawer.css'
import {NavLink} from 'react-router-dom'
import BackDrop from '../../UI/BackDrop/BackDrop'


const links = [
    {to: '/', label: 'Список тестов', exact: true},
    {to: '/auth', label: 'Аутентификация', exact: false},
    {to: '/create-quize', label: 'Создать тест', exact: false}
]

class Drawer extends Component {

    renderLinks(){
        return links.map((link, index) => {
            return (
                <li key={index}
                >
                    <NavLink
                    
                    to={link.to}
                    exact={link.exact}
                    activeClassName={styles.active}
                    onClick={this.props.onClose}
                    >
                        {link.label}
                    </NavLink>
                </li>
            )
        })
    }
    
    
    render(){
        const cls = [styles.Drawer]
        
        if(!this.props.isOpen){
            cls.push(styles.close)
        } 
        
        

        return(
            <React.Fragment>
                <nav className={cls.join(' ')}>
                    <ul>
                        {this.renderLinks()}
                    </ul>
                </nav>
                
                {this.props.isOpen 
                ? <BackDrop
                onClick={this.props.onClose}
                /> 
                : null}
            </React.Fragment>
            
        )
    }
}

export default Drawer