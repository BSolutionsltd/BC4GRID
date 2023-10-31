import React from 'react';
import { Menu } from 'semantic-ui-react';
import { Link }   from '../routes';

const MenuBar = (props) => {

    return (        
        <Menu style={{ marginTop: '20px' }}>
            <Link route="/">
                <a className="item">Home</a>
            </Link>
            <Link route="404">
                <a className="item">Buy</a>
            </Link>
            <Link route="/offers/new">
                <a className="item">Sell</a>
            </Link>            
        </Menu>
    )

}

export default MenuBar;