import React, { Component } from 'react';
import './style.scss'

export class NormalTextarea extends Component {
  render() {
    let {
      className = "form-control textarea",
      placeholder = "",
      onChange,
      value = "",
      rows = "",
      name,
      disabled = false,
    } = this.props;
    console.log(this.props)
    return (
      <>
        <textarea
          className={className}
          name={name}
          disabled={disabled}
          value={value}
          placeholder={placeholder}
          rows={rows}
          onChange={e => {

            let body = {}

            body = {
              target: {
                name: e.target.name,
                value: e.target.value
              }
            }

            onChange(body)

          }}
        ></textarea>
      </>
    )
  }
}