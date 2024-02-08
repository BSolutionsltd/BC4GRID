"use client";

import React, { useEffect, useState } from 'react';
import { Segment, Grid, Header, Statistic } from 'semantic-ui-react';

import web3 from '@/lib/ethereum/web3';
import {style} from '@/components/ui/style.css.js';

import { useEthExplorer } from '@/app/web3/context/ethExplorerContext';

const ShowAccount = ({ account }) => (
  <div style={{ wordBreak: 'break-all' }}>
    <Header as="h3" textAlign="center" >Address: <span style={style.primary}>{account}</span></Header>
  </div>
);

const BalanceInfo = ({ balance, power }) => (
  <Segment padded="very">
    <Grid columns={2} relaxed="very" stackable textAlign="center">
      <Grid.Row>
        <Grid.Column>
          <Statistic size='mini' label='Balance (eth)' value={Number(balance).toFixed(2)} /> 
        </Grid.Column>
        <Grid.Column>
          <Statistic size='mini' label='Tokens (ENT)' value={power} /> 
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </Segment>
);

const Balance = () => {
  const { ethExplorer } = useEthExplorer();
  const [account, setAccount] = useState([]);  
  const [balance, setBalance] = useState(''); 
  const [power, setPower] = useState(''); 

  useEffect(() => {
    const fetchAccountAndBalance = async () => {
      if (!ethExplorer) {
        console.log('ethExplorer is not initialized yet.');
        return;
      }

      try {
        const fetchedAccount = await ethExplorer.getUserAccount();
        setAccount(fetchedAccount);

        const fetchedBalance = await ethExplorer.getBalance(fetchedAccount);
        const balanceInEther = web3.utils.fromWei(fetchedBalance, 'ether');
        setBalance(balanceInEther);

        const tokenBalance = await ethExplorer.getTokenBalance(fetchedAccount);
        setPower(tokenBalance);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAccountAndBalance();
  }, [ethExplorer]);

  return (
    <Segment>
      <ShowAccount account={account} />
      <BalanceInfo balance={balance} power={power} />
    </Segment>
  );
};

export default Balance;