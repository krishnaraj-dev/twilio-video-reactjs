import React, { Component } from 'react';
import './style.scss'

export class NormalCheckbox extends Component {
  render() {
    let {
      className = "custom-checkbox",
      label = "",
      value = "",
      name = "",
      onChange,
      checked,
      disable = false,
    } = this.props;
    return (
      <label className={className}>
        <input
          className="checkbox"
          type="checkbox"
          name={name}
          value={value}
          checked={checked}
          disabled={disable}
          onChange={({ target: { name, checked: Checked } }) => {
            onChange && onChange({ target: { name, value: Checked } })
          }}
        />
        <span>
          {label ? <span className="label-txt text-c6 fs-16">{label}</span> : ""}
        </span>
      </label>
    )
  }
}
