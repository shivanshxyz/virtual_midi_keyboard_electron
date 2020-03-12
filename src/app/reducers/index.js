import patch from "json-touch-patch";
import initState from "../../common/initState";
import * as types from "../../common/ActionTypes";
import { clamp } from "../../common/utils";

export default (state = initState, action) => {
  switch (action.type) {
  case types.MIDI_CHANNEL_SET:
    return patch(state, [
      { op: "replace", path: "/midiChannel", value: midiChannel(action.value) },
    ]);
  case types.MIDI_CHANNEL_SHIFT:
    return patch(state, [
      { op: "replace", path: "/midiChannel", value: midiChannel(state.midiChannel + action.value) },
    ]);
  case types.DATA_SET:
  case types.NOTE_ON:
    return patch(state, [
      { op: "replace", path: `/data/${ action.noteNumber }`, value: velocity(action.velocity) },
    ]);
  case types.NOTE_OFF:
    return patch(state, [
      { op: "replace", path: `/data/${ action.noteNumber }`, value: 0 },
    ]);
  case types.ALL_NOTE_OFF:
    return { ...state, data: state.data.map(() => 0) };
  case types.OCTAVE_SET:
    return patch(state, [
      { op: "replace", path: "/octave", value: octave(action.value) },
    ]);
  case types.OCTAVE_SHIFT:
    return patch(state, [
      { op: "replace", path: "/octave", value: octave(state.octave + action.value) },
    ]);
  case types.VELOCITY_SET:
    return patch(state, [
      { op: "replace", path: "/velocity", value: velocity(action.value) },
    ]);
  case types.VELOCITY_SHIFT:
    return patch(state, [
      { op: "replace", path: "/velocity", value: velocityShift(state.velocity, action.value) },
    ]);
  }
  return state;
};