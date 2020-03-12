import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import ColorDefs from "../components/ColorDefs";
import FrontPanel from "../components/FrontPanel";
import OctaveViewer from "../components/OctaveViewer";
import VelocityViewer from "../components/VelocityViewer";
import MIDIChannelViewer from "../components/MIDIChannelViewer";
import PianoKeyboard from "../components/PianoKeyboard";
import { WIDTH, HEIGHT } from "../designer";
import { keyDown, keyUp } from "./KeyHandler";

class App extends Component {
  static propTypes = {
    actions : PropTypes.objectOf(PropTypes.func).isRequired,
    data    : PropTypes.arrayOf(PropTypes.number).isRequired,
    octave  : PropTypes.number.isRequired,
    velocity: PropTypes.number.isRequired,
  };

  constructor(...args) {
    super(...args);

    this.state = { width: window.innerWidth, height: window.innerHeight };

    this.onResize = ::this.onResize;
    this.onTouchStart = ::this.onTouchStart;
    this.onTouchEnd = ::this.onTouchEnd;
    this.onKeyDown = ::this.onKeyDown;
    this.onKeyUp = ::this.onKeyUp;
    this.onMIDIChannelSelect = ::this.onMIDIChannelSelect;
    this.onNoteOn = ::this.onNoteOn;
    this.onNoteOff = ::this.onNoteOff;
    this.onOctaveSelect = ::this.onOctaveSelect;
    this.onVelocitySelect = ::this.onVelocitySelect;
  }

  componentDidMount() {
    window.addEventListener("resize", this.onResize);
    window.addEventListener("touchstart", this.onTouchStart);
    window.addEventListener("touchend", this.onTouchEnd);
    window.addEventListener("keydown", this.onKeyDown);
    window.addEventListener("keyup", this.onKeyUp);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.onResize);
    window.removeEventListener("touchstart", this.onTouchStart);
    window.removeEventListener("touchend", this.onTouchEnd);
    window.removeEventListener("keydown", this.onKeyDown);
    window.removeEventListener("keyup", this.onKeyUp);
  }
