import React, { Component } from "react";
import fishes from "../sample-fishes";
import Fish from "./Fish";
import Header from "./Header";
import Inventory from "./Inventory";
import Order from "./Order";
import base from "../base";

export default class App extends Component {
  state = {
    fishes: {},
    order: {},
  };
  addFish = (fish) => {
    const fishes = { ...this.state.fishes };
    fishes[`fish${Date.now()}`] = fish;
    this.setState({
      fishes: fishes,
    });
  };
  updateFish = (key, updatedFish) => {
    const fishes = { ...this.state.fishes };
    fishes[key] = updatedFish;
    this.setState({ fishes });
  };
  loadSampleFishes = () => {
    this.setState({
      fishes: fishes,
    });
  };
  addToOrder = (key) => {
    const order = { ...this.state.order };
    order[key] = order[key] + 1 || 1;
    this.setState({
      order,
    });
  };
  removeFromOrder = (key) => {
    const order = { ...this.state.order };
    delete order[key];
    this.setState({
      order,
    });
  };
  deleteFish = (key) => {
    const fishes = { ...this.state.fishes };
    fishes[key] = null;
    this.setState({ fishes });
  };
  componentDidMount() {
    const { params } = this.props.match;
    const localStorageRef = localStorage.getItem(params.storeId);
    if (localStorageRef) {
      this.setState({
        order: JSON.parse(localStorageRef),
      });
    }
    this.ref = base.syncState(`${this.props.match.params.storeId}/fishes`, {
      context: this,
      state: "fishes",
    });
  }
  componentDidUpdate(prevProps, prevState) {
    localStorage.setItem(
      this.props.match.params.storeId,
      JSON.stringify(this.state.order)
    );
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="fishes">
            {Object.keys(this.state.fishes).map((key) => (
              <Fish
                key={key}
                index={key}
                details={this.state.fishes[key]}
                addToOrder={this.addToOrder}
              />
            ))}
          </ul>
        </div>
        <Order
          removeFromOrder={this.removeFromOrder}
          fishes={this.state.fishes}
          order={this.state.order}
        />
        <Inventory
          loadSampleFishes={this.loadSampleFishes}
          addFish={this.addFish}
          fishes={this.state.fishes}
          updateFish={this.updateFish}
          deleteFish={this.deleteFish}
          storeId={this.props.match.params.storeId}
        />
      </div>
    );
  }
}
