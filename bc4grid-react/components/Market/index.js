import React, { useState } from "react";
import { Table, Input } from "semantic-ui-react";

const Market = () => {
  const initialData = [
    { account: "Account 1", amount: 100, pricePerUnit: 10, totalPrice: 1000 },
    { account: "Account 2", amount: 200, pricePerUnit: 8, totalPrice: 1600 },
    { account: "Account 3", amount: 150, pricePerUnit: 12, totalPrice: 1800 },
    // Add more data as needed
  ];

  const [data, setData] = useState(initialData);
  const [accountFilter, setAccountFilter] = useState("");
  const [amountFilter, setAmountFilter] = useState("");
  const [pricePerUnitFilter, setPricePerUnitFilter] = useState("");
  const [totalPriceFilter, setTotalPriceFilter] = useState("");

  const { Header, Row, HeaderCell, Body, Cell } = Table;

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
          </Row>
        </Header>
        <Body>
          {data.map((item, index) => (
            <Row key={index}>
              <Cell>{item.account}</Cell>
              <Cell>{item.amount}</Cell>
              <Cell>{item.pricePerUnit}</Cell>
              <Cell>{item.totalPrice}</Cell>
            </Row>
          ))}
        </Body>
      </Table>
    </div>
  );
};

export default Market;
