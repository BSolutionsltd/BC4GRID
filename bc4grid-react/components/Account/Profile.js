import React from 'react';
import { Card, Image, Form, Button, Grid } from 'semantic-ui-react';
import Header from '../../components/Header';
import Layout from './Layout';

const Profile = ({ user }) => {
  return (
    <Layout>
      <Header />
      <Grid stackable columns={2} relaxed>
        <Grid.Column width={6}>
          <Card fluid> 
            <Image src={user.avatar} wrapped ui={false} />
            <Card.Content>
              <Card.Header>{user.name}</Card.Header>
              <Card.Meta>
                <span className='date'>Joined in {user.joinedYear}</span>
              </Card.Meta>
              <Card.Description>
                {user.name} is a blockchain user in the smart-grid industry.
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <a>
                <i className='user icon' />
                {user.transactions} Transactions
              </a>
            </Card.Content>
          </Card>
        </Grid.Column>
        <Grid.Column width={10}>
          <Form>
            <Form.Field>
              <label>Full Name</label>
              <input placeholder={user.name} />
            </Form.Field>
            <Form.Field>
              <label>Email Address</label>
              <input placeholder={user.email} />
            </Form.Field>
            <Form.Field>
              <label>Phone Number</label>
              <input placeholder={user.phone} />
            </Form.Field>
            <Button type='submit'>Update</Button>
          </Form>
        </Grid.Column>
      </Grid>
    </Layout>
  );
};

export default Profile;
