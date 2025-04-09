import React, { Component } from "react";
import "./App.css";
import HelloWorld from "./HelloWorld"; // Import HelloWorld
import Counter from "./Counter"; // Import Counter
import FilteredList from "./FilteredList"; // Import FilteredList

const produce = [
  { name: "Apple Jacks", type: "Circular" },
  { name: "Banana Nut Cheerios", type: "Circular" },
  { name: "Cookie Crisps", type: "Circular" },
  { name: "Honey Nut Cheerios", type: "Circular" },
  { name: "Fruit Loops", type: "Circular" },
  { name: "Reeses Puffs", type: "Circular" },
  { name: "Captain Crunch", type: "Square" },
  { name: "Cinnamon Toast Crunch", type: "Square" },
  { name: "Golden Grahams", type: "Square" },
  { name: "Chex", type: "Square" },
  { name: "Life", type: "Square" },
  { name: "Frosted Mini Wheats", type: "Square" },
];

class App extends Component {
  render() {
    return (
      <div className="App">
        <HelloWorld />
        <Counter />
        <FilteredList items={produce} /> {/* Pass produce array as props */}
      </div>
    );
  }
}

export default App;
