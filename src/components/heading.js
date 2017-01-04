import React, { Component, createElement, PropTypes } from "react";
import { withTheme } from "styled-components";
import { getStyles } from "../utils/base";
import Radium from "radium";

@Radium
@withTheme
export default class Heading extends Component {
  static defaultProps = {
    size: 1,
    lineHeight: 1
  }

  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    fit: PropTypes.bool,
    lineHeight: PropTypes.number,
    size: PropTypes.number,
    style: PropTypes.object,
    theme: PropTypes.object
  }

  static contextTypes = {
    store: PropTypes.object,
    typeface: PropTypes.object
  }

  constructor() {
    super();
    this.resize = this.resize.bind(this);
    this.state = {
      scale: 1,
      height: 16
    };
  }
  componentDidMount() {
    this.resize();
    window.addEventListener("load", this.resize);
    window.addEventListener("resize", this.resize);
  }
  componentWillReceiveProps() {
    this.resize();
  }
  componentWillUnmount() {
    window.removeEventListener("load", this.resize);
    window.removeEventListener("resize", this.resize);
  }
  resize() {
    if (this.props.fit) {
      const text = this.textRef;
      const container = this.containerRef;
      text.style.display = "inline-block";
      const scale = (container.offsetWidth / text.offsetWidth);
      const height = (text.offsetHeight * scale) || 0;
      text.style.display = "block";
      this.setState({
        scale,
        height
      });
    }
  }
  render() {
    const { size, lineHeight, fit, style, children } = this.props;
    const Tag = `H${size}`;
    const styles = {
      container: {
        display: "block",
        width: "100%",
        height: this.state.height
      },
      text: {
        fontSize: 16,
        display: "block",
        margin: "0",
        padding: "0",
        lineHeight,
        transform: `scale(${this.state.scale})`,
        transformOrigin: "center top"
      },
      nonFit: {
        lineHeight
      }
    };
    const typefaceStyle = this.context.typeface || {};
    return (
      fit ? (
        <div
          className={this.props.className}
          ref={(c) => { this.containerRef = c; }}
          style={[
            this.props.theme.components.heading[`h${size}`],
            getStyles.call(this), styles.container
          ]}
        >
          <span ref={(t) => { this.textRef = t; }} style={[styles.text, style, typefaceStyle]}>
            {children}
          </span>
        </div>
      ) : (
        createElement(Tag, {
          className: this.props.className,
          style: [this.props.theme.components.heading[`h${size}`], getStyles.call(this), styles.nonFit, style, typefaceStyle]
        }, children)
      )
    );
  }
}
