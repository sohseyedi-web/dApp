import "./index.css";
import React from "react";
import App from "./App.jsx";
import { store } from "./store/store";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import { persistStore } from "redux-persist";
import { BrowserRouter } from "react-router-dom";
import { publicProvider } from "wagmi/providers/public";
import { PersistGate } from "redux-persist/integration/react";
import { configureChains, mainnet, WagmiConfig, createConfig } from "wagmi";

const { provider, webSocketProvider } = configureChains(
  [mainnet],
  [publicProvider()]
);

const config = createConfig({
  autoConnect: true,
  provider,
  webSocketProvider,
});

const persistor = persistStore(store);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <WagmiConfig config={config}>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <App />
          </PersistGate>
        </Provider>
      </WagmiConfig>
    </BrowserRouter>
  </React.StrictMode>
);
