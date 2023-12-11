"use client";

import React, { useEffect, useState } from 'react';
import { Segment, Grid, Header, Statistic } from 'semantic-ui-react';

import web3 from '@/lib/ethereum/web3';

import { useEthExplorer } from '@/app/web3/context/ethExplorerContext';

// define component
const ShowAccount = ({ account }) => {
    
  return (
    <div>
      <Header as="h3" textAlign="center" >Address: {account}</Header>
    </div>
  );
};

// API endpoint: /user/id/balance
const BalanceInfo = ({ balance, power }) => {
   
  return (
    <Segment padded="very">
      <Grid columns={2} relaxed="very" stackable textAlign="center">
        <Grid.Row>
          <Grid.Column>
          <Statistic label='Balance (eth)' value={Number(balance).toFixed(2)} /> 
          </Grid.Column>
          <Grid.Column>
          <Statistic label='Tokens (ENT)' value={power} /> 
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  );
};

const Balance = () => {
  
  // use ethExplorer
  const { ethExplorer } = useEthExplorer();

  const [account, setAccount] = useState([]);  
  const [balance, setBalance] = useState(''); // assuming balance is a string
  const [power, setPower] = useState(''); // total power at disposal

  useEffect(() => {
    const fetchAccountAndBalance = async () => {
      if (!ethExplorer) {
        // ethExplorer is not yet initialized, so we can't proceed
        console.log('ethExplorer is not initialized yet.');
        return;
      }

      console.log('ethExplorer: ', ethExplorer);
      const fetchedAccount = await ethExplorer.getUserAccount();
      setAccount(fetchedAccount);

      if (account !== '') {        
        const fetchedBalance = await ethExplorer.getBalance(fetchedAccount);
        const balanceInEther = web3.utils.fromWei(fetchedBalance, 'ether');
        setBalance(balanceInEther); // You might need to convert this to kWh based on your logic

        const tokenBalance = await ethExplorer.getTokenBalance(fetchedAccount);
        setPower(tokenBalance);
      }
    };

    fetchAccountAndBalance();
  }, [ethExplorer]); // Add ethExplorer to the dependency array

  const handleAccountChange = async (e, { value }) => {
    setSelectedAccount(value);
    const fetchedBalance = await web3.eth.getBalance(value);
    const balanceInEther = web3.utils.fromWei(fetchedBalance, 'ether');
        setBalance(balanceInEther); // You might need to convert this to kWh based on your logic
  };

  return (

    <Segment>
      <ShowAccount
        account={account}        
      />
      <BalanceInfo balance={balance} power={power} />
    </Segment>
  );
};

export default Balance;
