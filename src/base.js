import Rebase from "re-base";
import firebase from "firebase/app";
import "firebase/database";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCyCtxH1xfi2jGQApAUjJfuvh37-0I_87U",
  authDomain: "catchin-fishes.firebaseapp.com",
  databaseURL: "https://catchin-fishes.firebaseio.com",
});

// create rebase bindings
const base = Rebase.createClass(firebaseApp.database());
// named export
export { firebaseApp };
// default export
export default base;
