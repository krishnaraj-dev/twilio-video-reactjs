import React, { Component } from "react";
import './style.scss';

export class NormalSelect extends Component {
  render() {
    let {
      className = "form-control select-form-control",
      options = [],
      keyName = "label",
      valueName = "value",
      handleChange,
      value = "",
      name = "",
      placeholder = "Select",
      isPlaceholderNeed = true,
      disabled = false,
    } = this.props;

    return (
      <>
        <div className={`select-wrapper`}>
          <select
            className={`${className}`}
            value={value}
            disabled={disabled}
            onChange={e => {
              let body = {
                target: {
                  name: e.target.name,
                  value: e.target.value // === "" ? e.target.value : Number(e.target.value)
                }
              };
              handleChange(body);
            }}
            name={name}
          >
            {isPlaceholderNeed ? <option value="">{placeholder}</option> : ""}
            {options.map((option, index) => (
              <option
                value={option[valueName]}
                key={`${option[keyName]}_${index}`}
              >
                {option[keyName]}
              </option>
            ))}
          </select>
        </div>
      </>
    );
  }
}
