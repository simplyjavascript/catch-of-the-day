import React, { Component } from "react";
import AddFishForm from "./AddFishForm";
import EditFishForm from "./EditFishForm";
import Login from "./Login";
import firebase from "firebase";
import base, { firebaseApp } from "../base";
export default class Inventory extends Component {
  state = {
    uid: null,
    owner: null,
  };
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.authHandler({ user });
      }
    });
  }
  authHandler = async (authData) => {
    console.log("HIT AUTH");
    // 1 .Look up the current store in the firebase database
    const store = await base.fetch(this.props.storeId, { context: this });
    console.log(store);
    // 2. Claim it if there is no owner
    if (!store.owner) {
      // save it as our own
      await base.post(`${this.props.storeId}/owner`, {
        data: authData.user.uid,
      });
    }
    // 3. Set the state of the inventory component to reflect the current user
    this.setState({
      uid: authData.user.uid,
      owner: store.owner || authData.user.uid,
    });
  };
  authenticate = (provider) => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    firebaseApp.auth().signInWithPopup(authProvider).then(this.authHandler);
  };
  logout = async () => {
    console.log("Logging out!");
    await firebase.auth().signOut();
    this.setState({ uid: null });
  };
  render() {
    const logout = <button onClick={this.logout}>Log Out!</button>;
    // 1. Check if they are logged in
    if (!this.state.uid) {
      return <Login authenticate={this.authenticate} />;
    }
    // 2. check if they are not the owner of the store
    if (this.state.uid !== this.state.owner) {
      return (
        <div>
          <p>Sorry you are not the owner!</p>
          {logout}
        </div>
      );
    }
    return (
      <div className="inventory">
        <h2> Inventory</h2>
        {logout}
        {Object.keys(this.props.fishes).map((key) => (
          <EditFishForm
            updateFish={this.props.updateFish}
            deleteFish={this.props.deleteFish}
            key={key}
            fish={this.props.fishes[key]}
            index={key}
          />
        ))}
        <AddFishForm addFish={this.props.addFish} />
        <button onClick={this.props.loadSampleFishes}>
          Load sample fishes
        </button>
      </div>
    );
  }
}
