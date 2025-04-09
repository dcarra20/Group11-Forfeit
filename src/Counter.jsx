import React, { Component } from "react";

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 5, // Set default value of count to 5
    };
  }

  incrementCount = () => {
    this.setState((prevState) => ({
      count: prevState.count + 1, // Increase count by 1
    }));
  };

  render() {
    return (
      <div className="counter">
        <h2>Count: {this.state.count}</h2> {/* Display the value of count */}
        <button onClick={this.incrementCount}>Increment</button>{" "}
        {/* Call incrementCount on click */}
      </div>
    );
  }
}

export default Counter;
