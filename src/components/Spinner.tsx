import { Component } from 'react'
import loading from './loading.gif'
import React from 'react'

export default class Spinner extends Component {

  render() {
    return (
      <div>
        <div className='text-center'>
          <img className='my-3' src={loading} alt="loading"></img>
        </div>
      </div>
    )
  }
}
