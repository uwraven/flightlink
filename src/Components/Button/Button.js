import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Button.module.scss';
import { style } from '../../utility';

class Button extends Component {
    render() {
        var buttonType;
        switch(this.props.type) {
            case "primary": buttonType = styles.primary; break;
            case "positive": buttonType = styles.positive; break;
            case "destructive": buttonType = styles.destructive; break;
            default: buttonType = ""; break;
        }
        const buttonStyle = style([
            { className: styles.wrapper },
            { className: buttonType },
            {
                className: styles.disabled,
                disabled: !this.props.disabled
            }])
        return (
            <div className={buttonStyle} onClick={
                (!this.props.disabled) ?this.props.onClick : () => {}}>
                {this.props.children}
            </div>
        );
    }
}

Button.propTypes = {

};

export default Button;