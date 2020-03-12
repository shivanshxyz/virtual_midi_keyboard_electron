import * as types from "../../common/ActionTypes";

const state = { midiChannel: 0 };

export function setState(nextState) {
  state.midiChannel = nextState.midiChannel;
}

export function doAction(action, send) {
  switch (action.type) {
  case types.NOTE_ON:
    send(noteOn(action.noteNumber, action.velocity));
    break;
  case types.NOTE_OFF:
    send(noteOff(action.noteNumber));
    break;
  case types.ALL_NOTE_OFF:
    send(allNoteOff());
    break;
  }
}

