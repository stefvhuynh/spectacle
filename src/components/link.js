import React, { Component, PropTypes } from "react";
import { withTheme } from "styled-components";
import { getStyles } from "../utils/base";
import Radium from "radium";

@withTheme
@Radium
export default class Link extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    href: PropTypes.string,
    style: PropTypes.object,
    target: PropTypes.string,
    theme: PropTypes.object
  }

  static contextTypes = {
    styles: PropTypes.object,
    store: PropTypes.object,
    typeface: PropTypes.object
  }

  render() {
    const typefaceStyle = this.context.typeface || {};
    return (
      <a className={this.props.className}
        href={this.props.href}
        target={this.props.target}
        style={[this.props.theme.components.link, getStyles.call(this), this.props.style, typefaceStyle]}
      >
        {this.props.children}
      </a>
    );
  }
}
