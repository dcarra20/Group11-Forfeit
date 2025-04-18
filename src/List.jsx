import React, { Component } from "react";

class List extends Component {
  render() {
    const { items } = this.props;
    return (
      <ul>
        {items.map((item) => (
          <li key={item.name}>{item.name}</li>
        ))}
      </ul>
    );
  }
}

export default List;
