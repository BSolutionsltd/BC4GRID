import React, { useEffect, useState } from 'react';
import { Dropdown } from 'semantic-ui-react';
import Web3 from 'web3';


// define compoenent
const AddressInfo = () => {
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState('');

  useEffect(() => {
    async function fetchBlockchainAccounts() {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        try {
          const accounts = await web3.eth.getAccounts();
          setAccounts(accounts);
        } catch (error) {
          console.error(error);
        }
      }
    }

    fetchBlockchainAccounts();
  }, []);

  const accountOptions = accounts.map((account, index) => ({
    key: index,
    text: account,
    value: account,
  }));

  const handleAccountChange = (e, { value }) => {
    setSelectedAccount(value);
  };

  return (
    <div>
      <Dropdown
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

export default AddressInfo;
