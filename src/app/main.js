import path from "path";
import { app, ipcMain, BrowserWindow  } from "electron";
import { createStore, applyMiddleware, bindActionCreators } from "redux";
import { createPatch } from "rfc6902";
import inject from "../common/middleware/inject";
import reducers from "./reducers";
import MIDIDevice from "./midi/MIDIDevice";
import SocketServer from "./server/SocketServer";
import * as actionCreators from "./actions";
import * as types from "../common/ActionTypes";
import { DEVICE_NAME } from "../common/constants";

const PUBLIC_PATH = path.join(__dirname, "..", "..", "public");

const store = createStore(reducers, applyMiddleware(inject(midiHandler)));
const actions = bindActionCreators(actionCreators, store.dispatch);
const midiDevice = new MIDIDevice(DEVICE_NAME, actions);

let mainWindow = null;
let server = null;
let state = store.getState();

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

