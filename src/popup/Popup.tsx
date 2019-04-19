import * as React from 'react';
import './Popup.scss';

export default class Popup extends React.Component {
  constructor(props: any) {
    super(props);
  }

  componentDidMount() {
    console.log('mount');
    // Example of how to send a message to eventPage.ts.
    chrome.runtime.sendMessage({ popupMounted: true });
  }

  render() {
    return (
      <div className="popupContainer">
        hello
      </div>
    )
  }
}
