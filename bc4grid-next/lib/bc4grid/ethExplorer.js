
// define a component that will load the web3 library
import Web3 from 'web3';

import TokenDispenser from './build/TokenDispenser.json';
import Trading from './build/Trading.json';

const BigNumber = require("bignumber.js");

const contracts = {
    TokenDispenser,
    Trading
}

class EthereumExplorer {
    
    /**
     * Constructor: initialize the default values of the class attributes.
     */
    constructor() {
        this.web3 = null;
        this.contracts = {};
        this.contractDetails = {};
        this.defaultOptions = {
            gasLimit: null,
            gasPrice: null,
			baseFeePerGas: null,
        };
        this.userAccount = null;
        this.netId = null;
        this.callbacks = {};
    }

    /**
     * Initialize Web3.js
     */
    async bootWeb3() {
    let web3Provider = null;

    if (typeof window !== 'undefined' && window.ethereum !== "undefined") {
        // Modern dapp browsers...
        web3Provider = window.ethereum;

        //window.ethereum.on('accountsChanged', handleAccountsChanged);

        try {
            // Request account access
            await window.ethereum.request({ method: 'eth_requestAccounts' });             
        } catch (error) {
            // User denied account access...
            throw error;
        }
    } else if (typeof window !== 'undefined' && window.web3) {
        // Legacy dapp browsers...
        web3Provider = window.web3.currentProvider;
    } else {
        // If no injected web3 instance is detected, fall back to Sepolia testnet
        web3Provider = new Web3.providers.HttpProvider('https://sepolia.gateway.tenderly.co');
    }
    
    
    this.web3 = new Web3(web3Provider);
}

    /**
     * Load into the EthereumExplorer object all the details of a smart contract.
     * The details needed are the compiled details of the smart contract (like ABI).
     *
     * @param   {Object}  contractJson  The details of the contract to load.
     * @param   {string}  contractName  The name of the contract.
     */
    async loadContractFromJson(contractJson, contractName='default') {
        var netId = await this.getNetworkId();
        
        if (! contractJson.networks[netId]) {
            throw 'The network ID does not exist in the JSON of the contract. Probably you have to change network. Current network: ' + netId;
        }

        this.loadContract(contractJson.networks[netId].address, contractJson.abi, contractName);
    }

    /**
     * Store the contract details in the class "contractDetails" attribute and
     * then store the contract object from web3/eth into the attribute "contracts"
     * for an easy picking of the contract object.
     *
     * @param   {string}  contractAddress  Address of the contract.
     * @param   {Object}  contractAbi      The ABI of the contract.
     * @param   {string}  contractName     The name of the contract, useful if you deal with more than one smart contract.
     */
    loadContract(contractAddress, contractAbi, contractName='default') {
        this.contractDetails[contractName] = {};
        this.contractDetails[contractName].address = contractAddress;
        this.contractDetails[contractName].abi = contractAbi;
        this.contractDetails[contractName].contractName = contractName;

        this.contracts[contractName] = new this.web3.eth.Contract(contractAbi, contractAddress);
    }

    /**
     * Return the web/eth contract instance loaded in the function "loadContact".
     *
     * @param   {string}  contractName      The name of the contract.
     */
    contract(contractName='default') {
        return this.contracts[contractName];
    }

    /**
     * Return the contract details loaded in the function "loadContact".
     *
     * @param   {string}  contractName      The name of the contract.
     */
    contractDetail(contractName='default') {
        return this.contractDetails[contractName];
    }

    /**
     * Call a smart contract function.
     *
     * @param   {string}  method        The name of the smart contract function to call.
     * @param   {mixed}   param         The parameters to pass to the smart contract function we are calling.
     * @param   {string}  contractName  The name of the smart contract.
     * @param   {Object}  options       Extra options for calling the smart contract method (please reference to the Web3.js documentation).
     */
    async call(method, param, contractName='default', options={}) {
        if (param === null) {
            return this.contracts[contractName].methods[method]().call(options);
        }
        
        if (typeof param == 'object') {
            return this.contracts[contractName].methods[method](...param).call(options);
        }

        return this.contracts[contractName].methods[method](param).call(options);
    }

    /**
     * Get the network ID of the blockchain we are connected to.
     *
     * @return  {Integer}    The ID of the blockchain network.
     */
    async getNetworkId() {
        if(this.netId) return this.netId;
        else {
            const netId =  await this.web3.eth.net.getId(); 
            this.netId = netId;
        }

        return this.netId;
    }

    /**
     * Check if a smart contract method is pure, view, payable, non payable, ...
     *
     * @param   {string}  type          The type of the method to check (pure, view, payable, ...).
     * @param   {string}  method        The name of the method to call.
     * @param   {string}  contractName  The name of the smart contract.
     * @return  {boolean|null}
     */
    methodTypeIs(type, method, contractName='default') {
        if (this.contractDetail(contractName) && this.contractDetail(contractName).abi) {
            const fnc = this.contractDetail(contractName).abi.filter(item => item.name == method);
            if (! fnc.length) return null;

            return (fnc[0].stateMutability && fnc[0].stateMutability == type);
        }

        return null;
    }

    /**
     * Check if the smart contract method is pure.
     *
     * @param   {string}  method        The name of the method to call.
     * @param   {string}  method        The name of the method to call.
     * @return  {boolean|null}
     */
    methodIsViewOrPure(method, contractName='default') {
        return (this.methodTypeIs('view', method, contractName) || this.methodTypeIs('pure', method, contractName));
    }

    /**
     * Check if the smart contract method is payable.
     *
     * @param   {string}  method        The name of the method to call.
     * @param   {string}  method        The name of the method to call.
     * @return  {boolean|null}
     */
    methodIsPayable(method, contractName='default') {
        return this.methodTypeIs('payable', method, contractName);
    }

    /**
     * Check if the smart contract method is non payable.
     *
     * @param   {string}  method        The name of the method to call.
     * @param   {string}  method        The name of the method to call.
     * @return  {boolean|null}
     */
    methodIsNonPayable(method, contractName='default') {
        return this.methodTypeIs('nonpayable', method, contractName);
    }

    /**
     * Submit a transaction to the smart contract.
     *
     * @param   {string}            fromAddress     The address of the user's wallet.
     * @param   {string|null}       fromPrivateKey  The private key of the user's wallet/
     * @param   {string}            contractFnc     The name of the function of the smart contract we are calling.
     * @param   {Array}             contractData    Extra data to sent along with the smart contract call.
     * @param   {[type]}            options         Extra option needed for calling the smart contract (for example when the method is payable then you might need to send funds to the smart contract).
     * @param   {[type]}            contractName    The name of the smart contract.
     *
     * @return  {Object}            Return the transaction promise.
     */
    async sendTxToSmartContract(fromAddress, fromPrivateKey, contractFnc, contractData=[], options={}, contractName='default') {
        // checking if the contract has been loaded
        if (! this.contractDetail(contractName)) {
            throw 'Contract address not found!';
        }

        var txData = {};

        // if the private key is given then we must sign the transaction with that private key
        if (fromPrivateKey) {
            // getting the transaction raw data
            txData = await this.getTransactionData(
            fromAddress,
            this.contractDetail(contractName).address,
            options
            );

            // checking if there is a fund to send to the smart contract
            if (options.value) txData.value = options.value;
		
            const data = this.contract(contractName).methods[contractFnc](...contractData).encodeABI();
            if (data) txData.data = data;

            // signing the transaction with the given private key
            const signedTx = await this.web3.eth.accounts.signTransaction(txData, fromPrivateKey);

            // DOCS: https://web3js.readthedocs.io/en/v1.7.3/web3-eth.html?highlight=sendSignedTransaction#id90
            this.web3.eth.sendSignedTransaction(signedTx.rawTransaction)
                .on('transactionHash', transactionHash => this.emit('transactionHash', transactionHash))
                .on('receipt', receipt => this.emit('receipt', receipt))
                .on('error', error => this.emit('error', error));
            
            return Promise.resolve(this);
        }

        // if the private key is not given then teh signature will be handled via Metamask (or similar)
        txData.from = fromAddress;
        if (options.value) txData.value = options.value;

        this.contract(contractName).methods[contractFnc](...contractData).send(txData)
            .on('transactionHash', transactionHash => this.emit('transactionHash', transactionHash))
            .on('receipt', receipt => this.emit('receipt', receipt))
            .on('error', error => this.emit('error', error));

        return Promise.resolve(this);
    }

    /**
     * Get the basic transaction data.
     *
     * @param   {string}  from     The users's wallet address.
     * @param   {string}  to       The destination address.
     * @param   {Object}  options  The eventual default options.
     *
     * @return  {Object}           The transaction data.
     */
    async getTransactionData(from, to, options={}) {
		var priorityFee = getPriorityFee();
		var baseFee = options.baseFeePerGas || await this.getBaseFeePerGas(false);
		// var maxFee = 2 * Number(baseFee) + priorityFee;
		var maxFee = Number(baseFee) + priorityFee - 1;
		return { from, to, 
            nonce: options.nonce || await this.web3.eth.getTransactionCount(from, 'pending'),
        	//gasPrice: options.gasPrice || await this.getGasPrice(false),
            //gasLimit: options.gasLimit || await this.getGasLimit(false),
			gas: options.gasLimit || await this.getGasLimit(false),
			maxFeePerGas: maxFee,
			maxPriorityFeePerGas: priorityFee
		}
    }

    /**
     * Get the current gas limit.
     *
     * @param   {string}   fromCache    Load the gas limit from the class attribute.
     *
     * @return  {Number|null}           The gas limit.
     */
    async getGasLimit(fromCache=true) {
        if (this.defaultOptions.gasLimit && fromCache) return this.defaultOptions.gasLimit;

        const block = await this.getBlock('latest');

        if (block) {
            this.defaultOptions.gasLimit = block.gasLimit;
            return this.defaultOptions.gasLimit;
        }
        
        return null;
    }

    /**
     * Get the current gas price.
     *
     * @param   {string}   fromCache    Load the gas price from the class attribute.
     *
     * @return  {Number|null}           The gas price.
     */
    async getGasPrice(fromCache=true) {
        if (this.defaultOptions.gasPrice && fromCache) return this.defaultOptions.gasPrice;

		const gasPrice = this.web3.eth.getGasPrice();

		if (gasPrice) {
            this.defaultOptions.gasPrice = gasPrice;
            return gasPrice;
        }
        
        return null;
    }
	
	async getBaseFeePerGas(fromCache=false) {
        if (this.defaultOptions.baseFeePerGas && fromCache) return this.defaultOptions.baseFeePerGas;

        const block = await this.getBlock('latest');

        if (block) {
            this.defaultOptions.baseFeePerGas = block.baseFeePerGas;
            return this.defaultOptions.baseFeePerGas;
        }
        
        return null;
    }

    /**
     * Get the block details of the given block number.
     *
     * @param   {Integer}  blockNumber  The number of the block to retrieve.
     *
     * @return  {Object}                The details of the block.
     */
    async getBlock(blockNumber) {
        return await this.web3.eth.getBlock(blockNumber);
    }

    /**
     * Return the number of the latest block minded.
     *
     * @return  {Integer}   The number of the latest block.
     */
    async getBlockNumber() {
        return await this.web3.eth.getBlockNumber();
    }

    /**
     * Get the user account from the Metamask (or any other clients manager).
     *
     * @return  {string}  The user's wallet address.
     */
    async getUserAccount() {
        if (this.userAccount) return this.userAccount;

        const accounts = await this.web3.eth.getAccounts();

        this.userAccount = accounts[0];

        return this.userAccount;
    }

    /**
     * Append a callback to a given event.
     *
     * @param   {string}  eventName    The name of the event.
     * @param   {function}  callback   The callback function to attach to the event.
     *
     * @return  {EthereumExplorer}
     */
     on(eventName, callback) {
        if (! this.callbacks[eventName]) {
            this.callbacks[eventName] = callback;
        }

        return this;
    }

    /**
     * Emit an event.
     *
     * @param   {string}  eventName  The name of the event.
     * @param   {mixed}  data        The data to attach to the event
     *
     * @return  {mixed}
     */
    emit(eventName, data) {
        if (this.callbacks[eventName]) {
            return this.callbacks[eventName](data);
        }
    }
}

class bc4Grid extends EthereumExplorer {
    constructor() {
        super();
    }

    async createEnergyOffer(energyAmount, validUntil, pricePerEnergyAmount) {
        // Get the user's account address
        const fromAddress = await this.getUserAccount();
    
        // Get the Trading contract instance
        const tradingContract = this.contract('Trading');
    
        // Prepare the transaction options
        const options = {
          from: fromAddress,
          gas: 3000000 // Set an appropriate gas limit for the transaction
          // value: 0, // Add this if the method is payable and requires sending Ether
        };
    
        // Call the CreateEnergyOffer method from the Trading contract
        return tradingContract.methods.CreateEnergyOffer(validUntil, pricePerEnergyAmount, energyAmount).send(options)
          .on('transactionHash', transactionHash => console.log('Transaction Hash:', transactionHash))
          .on('receipt', receipt => console.log('Transaction Receipt:', receipt))
          .on('error', error => console.error('Transaction Error:', error));
      }

    async modifyOffer(offerId, validUntil, pricePerEnergyAmount, energyAmount) {
        // Get the user's account address
        const fromAddress = await this.getUserAccount();

        // Get the Trading contract instance
        const tradingContract = this.contract('Trading');
    
        // Prepare the transaction options
        const options = {
            from: fromAddress,
            gas: 3000000 // Set an appropriate gas limit for the transaction
        };
    
        // Call the ModifyOffer method from the Trading contract
        return tradingContract.methods.ModifyOffer(offerId, validUntil, pricePerEnergyAmount, energyAmount).send(options)
            .on('transactionHash', transactionHash => console.log('Transaction Hash:', transactionHash))
            .on('receipt', receipt => console.log('Transaction Receipt:', receipt))
            .on('error', error => console.error('Transaction Error:', error));
    }

    async cancelOffer(offerId) {
        // Get the user's account address
        const fromAddress = await this.getUserAccount();

        // Get the Trading contract instance
        const tradingContract = this.contract('Trading');
    
        // Prepare the transaction options
        const options = {
            from: fromAddress,
            gas: 3000000 // Set an appropriate gas limit for the transaction
        };
    
        // Call the CancelOffer method from the Trading contract
        return tradingContract.methods.CancelOffer(offerId).send(options)
            .on('transactionHash', transactionHash => console.log('Transaction Hash:', transactionHash))
            .on('receipt', receipt => console.log('Transaction Receipt:', receipt))
            .on('error', error => console.error('Transaction Error:', error));
    }

    async buyEnergyFromOffer(offerId, energyAmount, txValue) {
        // Get the user's account address
        const fromAddress = await this.getUserAccount();
    
        // Get the Trading contract instance
        const tradingContract = this.contract('Trading');
    
        // Prepare the transaction options
        const options = {
            from: fromAddress,
            gas: 3000000, // Set an appropriate gas limit for the transaction
            value: txValue
        };
    
        // Call the BuyEnergyFromOffer method from the Trading contract
        return tradingContract.methods.BuyEnergyFromOffer(offerId, energyAmount).send(options)
            .on('transactionHash', transactionHash => console.log('Transaction Hash:', transactionHash))
            .on('receipt', receipt => console.log('Transaction Receipt:', receipt))
            .on('error', error => console.error('Transaction Error:', error));
    }

    async getAllOfferDetails() {
        // Get the Trading contract instance
        const tradingContract = this.contract('Trading');

        // Call the GetAllOfferDetails method from the Trading contract
        return tradingContract.methods.GetAllOfferDetails().call()
            .then(offerDetails => {
                //console.log('Offer Details:', offerDetails);
                return offerDetails;
            })
            .catch(error => console.error('Error fetching offer details:', error));
    }
      
    async retrieveTokens(offerId) {
        // Get the user's account address
        const fromAddress = await this.getUserAccount();
            
        // Get the TokenDispenser contract instance
        const tokenDispenserContract = this.contract('TokenDispenser');

        // Prepare the transaction options
        const options = {
            from: fromAddress,
            gas: 3000000 // Set an appropriate gas limit for the transaction
        };

        // Call the RetrieveTokens method from the TokenDispenser contract
        return tokenDispenserContract.methods.RetrieveTokens(offerId).send(options)
            .on('transactionHash', transactionHash => console.log('Transaction Hash:', transactionHash))
            .on('receipt', receipt => console.log('Transaction Receipt:', receipt))
            .on('error', error => console.error('Transaction Error:', error));
    }

    async getBalance(userAddress) {
        return this.web3.eth.getBalance(userAddress);
    }

    async getTokenBalance(userAddress) {
        
        const tokenDispenserContract = this.contract('TokenDispenser');
        
        const res = await tokenDispenserContract.methods.balanceOf(userAddress).call(); 
        const decimals = await tokenDispenserContract.methods.decimals().call();
        const balance = new BigNumber(res + "e-" + decimals);
        return balance.toString();
    }

    async approveSmartContract(spender, amount) {
        // Get the user's account address
        const fromAddress = await this.getUserAccount();
            
        // Get the TokenDispenser contract instance
        const tokenDispenserContract = this.contract('TokenDispenser');

        // Prepare the transaction options
        const options = {
            from: fromAddress,
            gas: 3000000 // Set an appropriate gas limit for the transaction
        };

        // Call the approve method from the TokenDispenser contract
        return tokenDispenserContract.methods.approve(spender, amount).send(options)
            .on('transactionHash', transactionHash => console.log('Transaction Hash:', transactionHash))
            .on('receipt', receipt => console.log('Transaction Receipt:', receipt))
            .on('error', error => console.error('Transaction Error:', error));
    }
      
    // event handler
    async loadEventsFromLatestBlocks(fromBlockNumber) {        
        var blockNumber = await this.getBlockNumber();
        var from = blockNumber - fromBlockNumber;
    
        if (from < 0) {
            console.log(`The blockchain has ${blockNumber} blocks. Loading the events from the block 0.`);
            from = 0;
        } else {
            console.log('Loading the events from the latest ' + fromBlockNumber + ' blocks');
        }
    
        loadEventsFromSmartContracts(from);
    }
    
    
    async loadEventsFromSmartContracts(fromBlockNumber) {
        for (let contractName in window.ethExp.contractDetails) {
            this.contract(contractName).events.allEvents({
                fromBlock: fromBlockNumber //'latest'
            }, function(error, event) { 
                console.log(event);
            })
            .on("connected", function(subscriptionId){
                console.log({ on:'connected', subscriptionId });
            })
            .on('data', function(event){
                console.log({ on:'data', event }); // same results as the optional callback above
            })
            .on('changed', function(event){
                console.log({ on:'changed', event });
            })
            .on('error', function(error, receipt) {
                // If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.
                if (receipt) {
                    console.log({ on:'error', receipt, error });
                } else {
                    console.log({ on:'error', error});
                }
            });
        }
    }

    async initSmartContractEvents() {
        // Subscribe to events from the `latest` block
        for (let contractName in this.contractDetails) {
            const subscription = await this.contract(contractName).events.allEvents({ fromBlock: 'latest' });

            subscription.on('connected', subscriptionId => {
                console.log({ on:'connected', subscriptionId });
            });

            subscription.on('data', event => {
                console.log({ on:'data', event });
                this.handleContractEvent(event);
            });
            
            subscription.on('changed', event => {
                console.log({ on:'changed', event });
            });
            
            subscription.on('error', (error, receipt) => {
                // If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.
                if (receipt) {
                    console.log({ on:'error', receipt, error });
                } else {
                    console.log({ on:'error', error});
                }
            });
        }
    }

    handleContractEvent(event) {
        switch (event.event) {
            case 'OfferCreated':
                // this affects the market, propagate appropriately
                console.log(`Event: OfferCreated. Offer Details:
                    ID: ${event.returnValues.id}
                    Seller: ${event.returnValues.seller}
                    Valid Until: ${event.returnValues.validUntil}
                    Price: ${event.returnValues.pricePerEnergyAmount}
                    Amount: ${event.returnValues.energyAmount}`);
                break;
            case 'OfferModified':
                // this affects the market, propagate appropriately
                console.log(`Event: OfferModified. Offer Details:
                    ID: ${event.returnValues.id}
                    Seller: ${event.returnValues.seller}
                    Valid Until: ${event.returnValues.validUntil}
                    Price: ${event.returnValues.pricePerEnergyAmount}
                    Amount: ${event.returnValues.energyAmount}
                    Buyer: ${event.returnValues.buyer}`);
                break;
            case 'OfferClosed':
                // this affects the market, propagate appropriately
                console.log(`Event: OfferClosed. Offer Details:
                    ID: ${event.returnValues.id}
                    Seller: ${event.returnValues.seller}
                    Valid Until: ${event.returnValues.validUntil}
                    Price: ${event.returnValues.pricePerEnergyAmount}
                    Amount: ${event.returnValues.energyAmount}
                    Buyer: ${event.returnValues.buyer}`);
                break;
            case 'TokenRetrieved':
                console.log(`Event: TokenRetrieved. Offer Details:
                    ID: ${event.returnValues.id}
                    Seller: ${event.returnValues.seller}`);
                break;
            default:
                break;
            }
    }
      
}

async function bc4grid() {
    const ethExplorer = new bc4Grid();
    await ethExplorer.bootWeb3();
  
    // Load contracts directly using the imported JSON files
    await ethExplorer.loadContractFromJson(TokenDispenser, 'TokenDispenser');
    await ethExplorer.loadContractFromJson(Trading, 'Trading');

    // Get the user account
    await ethExplorer.getUserAccount();
    await ethExplorer.getNetworkId();

    // initialize events
    await ethExplorer.initSmartContractEvents();

    return ethExplorer;
}  
  
  export default bc4grid;