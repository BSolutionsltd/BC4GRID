"use client";

import React, { useState, useEffect } from "react";
import { Table, Input, Checkbox, Button } from "semantic-ui-react";



const Market = ( { marketItems, isBuyPage } ) => {
 
  // market data
  const [data, setData] = useState([]);
  // selected items from market
  const [selectedItems, setSelectedItems] = useState([]);
  // filters
  const [accountFilter, setAccountFilter] = useState("");
  const [amountFilter, setAmountFilter] = useState("");
  const [pricePerUnitFilter, setPricePerUnitFilter] = useState("");
  const [totalPriceFilter, setTotalPriceFilter] = useState("");

  // update data
  useEffect(() => {
    setData(marketItems);
  }, [marketItems]);

  
  // event handlers
  const handleAccountFilterChange = (e) => {
    const searchTerm = e.target.value;
    setAccountFilter(searchTerm);
    filterData();
  };

  const handleAmountFilterChange = (e) => {
    const searchTerm = e.target.value;
    setAmountFilter(searchTerm);
    filterData();
  };

  const handlePricePerUnitFilterChange = (e) => {
    const searchTerm = e.target.value;
    setPricePerUnitFilter(searchTerm);
    filterData();
  };

  const handleTotalPriceFilterChange = (e) => {
    const searchTerm = e.target.value;
    setTotalPriceFilter(searchTerm);
    filterData();
  };

  const filterData = () => {
    // Filter the data based on the search terms for each column
    const filteredData = initialData.filter((item) =>
      item.account.toLowerCase().includes(accountFilter.toLowerCase()) &&
      item.amount.toString().includes(amountFilter) &&
      item.pricePerUnit.toString().includes(pricePerUnitFilter) &&
      item.totalPrice.toString().includes(totalPriceFilter)
    );
    setData(filteredData);
  };

  const handleCheckboxChange = (index, checked) => {
    const newSelectedItems = [...selectedItems];
    if (newSelectedItems.includes(index)) {
      const itemIndex = newSelectedItems.indexOf(index);
      newSelectedItems.splice(itemIndex, 1);
    } else {
      newSelectedItems.push(index);
    }
    setSelectedItems(newSelectedItems);
  };

  const handleBuyClick = () => {
    const itemsToBuy = selectedItems.map((index) => data[index]);
    console.log(itemsToBuy);
    // Process the items to buy
  };


  // ui elements
  const { Header, Row, HeaderCell, Body, Cell } = Table;

  return (
    <div>
      <Table celled>
        <Header>
          <Row>
            <HeaderCell>
              <Input
                icon="search"
                placeholder="Filter by Account"
                value={accountFilter}
                onChange={handleAccountFilterChange}
              />
            </HeaderCell>
            <HeaderCell>
              <Input
                icon="search"
                placeholder="Filter by Amount"
                value={amountFilter}
                onChange={handleAmountFilterChange}
              />
            </HeaderCell>
            <HeaderCell>
              <Input
                icon="search"
                placeholder="Filter by Price per Unit"
                value={pricePerUnitFilter}
                onChange={handlePricePerUnitFilterChange}
              />
            </HeaderCell>
            <HeaderCell>
              <Input
                icon="search"
                placeholder="Filter by Total Price"
                value={totalPriceFilter}
                onChange={handleTotalPriceFilterChange}
              />
            </HeaderCell>
            {isBuyPage ? (
              <HeaderCell><Button primary onClick={handleBuyClick}>Add</Button></HeaderCell>
            ) : null }
            
          </Row>
        </Header>
        <Body>
          {data.map((item, index) => (
            <Row key={index}>
              <Cell>{item.account}</Cell>
              <Cell>{item.amount}</Cell>
              <Cell>{item.pricePerUnit}</Cell>
              <Cell>{item.totalPrice}</Cell>
              {isBuyPage ? (
                <Cell>
                  <Checkbox onChange={(e, {checked}) => handleCheckboxChange(index, checked)} />                  
                </Cell>
              ) : (
                null
              )}
            </Row>
          ))}
        </Body>
      </Table>
    </div>
  );
};

export default Market;
