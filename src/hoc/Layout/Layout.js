import React, {Component} from 'react'
import styles from './Layout.css'
import MenuToggle from '../../components/Navigation/MenuToggle/MenuToggle'
import Drawer from '../../components/Navigation/Drawer/Drawer'

class Layout extends Component {

    state = {
        menu: false
    }

    ToogleMenu = ()=> {
        
        this.setState({
            menu: !this.state.menu
        })
    }

    menuClose = ()=> {
        this.setState({
            menu: false
        })
    }

    styles = {
        color: {
            "background-color": 'red'
        }
    }
    render(){
        return(
            <div className={styles.Layout}>
                <Drawer 
                    isOpen={this.state.menu}
                    onClose={this.menuClose}
                />
                <MenuToggle 
                    onToggle={this.ToogleMenu}
                    isOpen={this.state.menu}
                />

               

                <main>
                    {this.props.children}
                </main>
            </div>
        )
    }
}

export default Layout