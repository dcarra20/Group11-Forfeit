import React, { Component } from "react";
import { DropdownButton, Dropdown } from "react-bootstrap";
import List from "./List";

class FilteredList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "all", // Default filter type
      search: "", // Default search value
    };
  }

  onSearch = (event) => {
    // Update the search state with lowercase, trimmed input
    this.setState({
      search: event.target.value.trim().toLowerCase(),
    });
  };

  onSelectFilterType = (eventKey) => {
    // Update the filter type based on selected value
    this.setState({
      type: eventKey,
    });
  };

  matchesFilterType = (item) => {
    // Return true if type is "all" or item type matches selected type
    return this.state.type === "all" || item.type === this.state.type;
  };

  filterAndSearch = (item) => {
    // Check both search and filter conditions
    const { search } = this.state;
    return (
      item.name.toLowerCase().includes(search) && this.matchesFilterType(item)
    );
  };

  render() {
    const { items } = this.props;

    return (
      <div className="filter-list">
        <h1>Cereal Search</h1>

        {/* Dropdown for filter type selection */}
        <DropdownButton
          title="Type"
          id="dropdown-basic-button"
          onSelect={this.onSelectFilterType}
        >
          <Dropdown.Item eventKey="all">All</Dropdown.Item>
          <Dropdown.Item eventKey="Circular">Circular</Dropdown.Item>
          <Dropdown.Item eventKey="Square">Square</Dropdown.Item>
        </DropdownButton>

        {/* Search input */}
        <input type="text" placeholder="Search" onChange={this.onSearch} />

        {/* Filtered list passed to List component */}
        <List items={items.filter(this.filterAndSearch)} />
      </div>
    );
  }
}

export default FilteredList;
