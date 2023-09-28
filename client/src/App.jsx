import Wallet from "./Wallet";
import Transfer from "./Transfer";
import "./App.scss";
import { useState } from "react";

function App() {
  // share state
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("");
  // private key
  const [privateKey, setPrivateKey] = useState("");

  return (
    <div className="app">
      <Wallet
        balance={balance}
        privateKey={privateKey}
        setPrivateKey={setPrivateKey}
        setBalance={setBalance}
        address={address}
        setAddress={setAddress} // person sending funds to the recipient
      />
      <Transfer setBalance={setBalance} address={address} />
      /*eventually will take private key to generate a signed
      transaction(signature), then server can take that signature and derive the
      address for the person who sent this message */
    </div>
  );
}

export default App;
