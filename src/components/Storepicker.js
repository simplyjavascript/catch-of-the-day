import React from "react";
import { getFunName } from "../helpers";
export class StorePicker extends React.Component {
  myInput = React.createRef();
  handleClick() {}
  // proeprty will be bound to the instance
  handleSubmit = (e) => {
    e.preventDefault();
    const storeName = this.myInput.current.value;
    this.props.history.push(`/store/${storeName}`);
  };
  render() {
    return (
      <form className="store-selector" onSubmit={this.handleSubmit}>
        <h2> Please eneter a store </h2>
        <button onClick={this.handleClick}></button>
        <input
          type="text"
          ref={this.myInput}
          required
          placeholder="Store Name"
          defaultValue={getFunName()}
        />
        <button type="submit"> Visit Store → </button>
      </form>
    );
  }
}
