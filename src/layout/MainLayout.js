import React, { Component } from 'react';
import '../assets/scss/layout/MainLayout.scss';

import '../assets/scss/pages/Main/main.scss';

export class MainLayout extends Component {

  render() {
    let { children } = this.props;

    return (
      <>
        <div className="main-layout">
          {children}
        </div>
      </>
    );
  }
}






