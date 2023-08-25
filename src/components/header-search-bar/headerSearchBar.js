import React, { Component } from 'react'
import { Input } from 'antd'
import _debounce from 'lodash/debounce'
import './headerSearchBar.css'

export default class HeaderSearchBar extends Component {
  state = {
    inputValue: '',
  }

  handleDelayedSearch = _debounce((value) => {
    if (this.props.onSearch) {
      this.props.onSearch(value)
    }
  }, 1000)

  handleInputChange = (event) => {
    const newValue = event.target.value
    this.setState({
      inputValue: newValue,
    })
    this.handleDelayedSearch(newValue)
  }

  render() {
    return (
      <div className="search-bar">
        <Input placeholder="Search" onChange={this.handleInputChange} value={this.state.inputValue} />
      </div>
    )
  }
}
