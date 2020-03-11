import React, {Component} from 'react';
import styles from './DropdownSelect.module.scss';
import PropTypes from 'prop-types';
import { style, allStyles } from '../../utility';


class DropdownSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
        this.toggle = this.toggle.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClick);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClick);
    }

    toggle() {
        if (!this.props.disabled) {
            this.setState({
                open: !this.state.open
            })
        }
    }

    handleClick(e) {
        if (!this.targetNode.contains(e.target) && this.state.open) {
            this.toggle();
        }
    }

    render() {
        return(
            <div className={style([
                { className: styles.dropdownWrapper },
                { className: (this.props.style) ? this.props.style : "" }
                ])} ref={(ref) => this.targetNode = ref}>
                <div className={style([
                    { className: styles.selectedWrapper },
                    { className: styles.disabled, disabled: !this.props.disabled }
                ])} onClick={this.toggle} >
                    {
                        this.props.options.length > 0 && (this.props.selected >= 0) ? this.props.options[this.props.selected] : <span className={styles.selectedPlaceholderText}>{this.props.placeholder}</span>
                    }
                </div>
                <div className={style([
                    {className: styles.dropdownContainer}, 
                    {className: styles.dropdownHidden, disabled: this.state.open},
                ])}>
                    <div className={styles.dropdownLabel}>{this.props.innerLabel}</div>
                    {
                        this.props.options.map((content, i) => 
                            <div className={styles.dropdownItem} key={i} onClick={() => {
                                this.setState({open: false})
                                this.props.callback(i)}}>
                                {content}
                            </div>
                        )
                    }
                </div>
            </div>
        )
    }
}

DropdownSelect.propTypes = {
    selected: PropTypes.number.isRequired,
    options: PropTypes.arrayOf(PropTypes.string),
    callback: PropTypes.func.isRequired,
    innerLabel: PropTypes.string,
    style: PropTypes.string,
    placeholder: PropTypes.string.isRequired
}

export default DropdownSelect