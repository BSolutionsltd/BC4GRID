import React from 'react';
import { Grid } from 'semantic-ui-react';

import Logo  from './Logo';
import AccountInfo from './AccountInfo';
import MainMenu    from './MainMenu';
import User from './User';

const Header = () => {
    return (
        <Grid columns={3} padded='vertically' verticalAlign='top'>
                <Grid.Column width={3}> <Logo /> </Grid.Column> 
                <Grid.Column width={11}>  <AccountInfo /> </Grid.Column>
                <Grid.Column width={1}>  <User name='Domagoj'/>    </Grid.Column>                 
                <Grid.Column width={1}>  <MainMenu />    </Grid.Column>                 
        </Grid>
    )
}

export default Header;  