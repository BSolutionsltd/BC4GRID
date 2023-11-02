import React from 'react';
import { Image } from 'semantic-ui-react';

const User = ({ name }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Image
        src="/images/avatar/person.png"  // Replace with the URL of the person's image
        avatar
        size="tiny"
      />
      {name}
    </div>
  );
};

export default User;
