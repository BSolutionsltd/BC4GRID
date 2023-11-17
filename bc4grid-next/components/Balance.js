"use client";

import React, { useEffect, useState } from 'react';
import { Segment, Grid, Dropdown } from 'semantic-ui-react';

import web3 from '@/libs/ethereum/web3';

// define component
const SelectAccount = ({ accounts, selectedAccount, handleAccountChange }) => {
  const style = { fontSize: '12px' };

  const accountOptions = accounts.map((account, index) => ({
    key: index,
    text: account,
    value: account,
  }));

  return (
    <div>
      <Dropdown
        style={style}
        placeholder="Select an account"
        fluid
        selection
        options={accountOptions}
        value={selectedAccount}
        onChange={handleAccountChange}
      />
    </div>
  );
};

// API endpoint: /user/id/balance
const BalanceInfo = ({ balance, power }) => {

  

  console.log('Balance: ', balance);

  return (
    <Segment padded="very">
      <Grid columns={2} relaxed="very" stackable textAlign="center">
        <Grid.Row>
          <Grid.Column>
        <strong>Balance (kWh): {balance}</strong>
          </Grid.Column>
          <Grid.Column>
            <strong>Price: {power}</strong>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  );
};

const Balance = () => {
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState('');
  const [balance, setBalance] = useState(''); // assuming balance is a string
  const [power, setPower] = useState(''); // total power at disposal

  useEffect(() => {
    const fetchAccountAndBalance = async () => {
      const fetchedAccounts = await web3.eth.getAccounts();
      setAccounts(fetchedAccounts);

      if (fetchedAccounts.length > 0) {        
        setSelectedAccount(fetchedAccounts[0]); // Set the first account as selected by default
        const fetchedBalance = await web3.eth.getBalance(fetchedAccounts[0]); 
        const balanceInEther = web3.utils.fromWei(fetchedBalance, 'ether');
        setBalance(balanceInEther); // You might need to convert this to kWh based on your logic
      }
    };

    fetchAccountAndBalance();
  }, []); // Empty dependency array to ensure the effect runs once after the initial render

  const handleAccountChange = async (e, { value }) => {
    setSelectedAccount(value);
    const fetchedBalance = await web3.eth.getBalance(value);
    const balanceInEther = web3.utils.fromWei(fetchedBalance, 'ether');
        setBalance(balanceInEther); // You might need to convert this to kWh based on your logic
  };

  return (
    <Segment>
      <SelectAccount
        accounts={accounts}
        selectedAccount={selectedAccount}
        handleAccountChange={handleAccountChange}
      />
      <BalanceInfo balance={balance} power={power} />
    </Segment>
  );
};

export default Balance;
