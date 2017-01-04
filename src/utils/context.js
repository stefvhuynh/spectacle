import { Component, PropTypes } from "react";
import { updateRoute } from "../actions";

class Context extends Component {
  static displayName = "Context";
  static propTypes = {
    children: PropTypes.node,
    history: PropTypes.object,
    store: PropTypes.object,
  };
  static childContextTypes = {
    history: PropTypes.object,
    store: PropTypes.object
  };
  constructor() {
    super(...arguments);
    this._handleLocationChange = this._handleLocationChange.bind(this);
    this._handleLocationChange(this.props);
  }
  getChildContext() {
    const { history, store } = this.props;
    return {
      history,
      store
    };
  }
  componentWillReceiveProps(nextProps) {
    this._handleLocationChange(nextProps);
  }
  _handleLocationChange({ history, store, children: deck }) {
    const slideCount = deck.props.children.length;
    store.dispatch(updateRoute({
      location: history.location,
      slideCount
    }));
  }
  render() {
    return this.props.children;
  }
}

export default Context;
