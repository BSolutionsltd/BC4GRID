import React from "react";
import { Grid } from "semantic-ui-react";

const Footer = () => {

    const footerStyle =  {
            fontSize: '12px',
            textAlign: 'center',
            position: 'fixed',
            bottom: '0',
            left: '0',
            width: '100%',
            height: '50px',
            minHeight: '35px',
            backgroundColor: 'white'
            
                    
    } 

  return (
    <Grid>
      <Grid.Column  style={footerStyle}>
        <strong>BC4GRID grant</strong>, funded by Smart4All, EU, 2023.
      </Grid.Column>
    </Grid>
  );
};

export default Footer;