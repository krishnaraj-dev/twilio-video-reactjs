import React, { Component } from 'react'
import VideoChat from 'component/twilio/VideoChat';
import 'assets/scss/pages/home.scss'

export class Home extends Component {
  render() {
    return (
      <>
        <VideoChat />
      </>
    )
  }
}