import React, { Component, PropTypes } from "react";

import { Provider } from "react-redux";
import configureStore from "../store";

import Controller from "../utils/controller";
import Manager from "./manager";

const store = configureStore();

export default class Deck extends Component {
  static displayName = "Deck";

  static propTypes = {
    children: PropTypes.node,
    controls: PropTypes.bool,
    globalStyles: PropTypes.bool,
    history: PropTypes.object,
    progress: PropTypes.oneOf(["pacman", "bar", "number", "none"]),
    theme: PropTypes.object,
    transition: PropTypes.array,
    transitionDuration: PropTypes.number
  };

  render() {
    const {
      children,
      controls,
      globalStyles,
      history,
      progress,
      theme,
      transition,
      transitionDuration
    } = this.props;

    return (
      <Provider store={store}>
        <Controller theme={theme} store={store} history={history}>
          <Manager
            controls={controls}
            globalStyles={globalStyles}
            progress={progress}
            transition={transition}
            transitionDuration={transitionDuration}
          >
            {children}
          </Manager>
        </Controller>
      </Provider>
    );
  }
}
