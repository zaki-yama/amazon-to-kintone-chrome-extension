import * as React from "react";
import "./Popup.scss";

const API_TOKEN = "YOUR_API_TOKEN";
const DOMAIN = "YOUR_DOMAIN";
const API_ENDPOINT = `https://${DOMAIN}.cybozu.com/k/v1/record.json`;

type Props = {
  tabId: number;
};

export default class Popup extends React.Component<Props, {}> {
  constructor(props: Readonly<Props>) {
    super(props);
  }

  componentDidMount() {
    console.log("mount");
    chrome.tabs.sendMessage(
      this.props.tabId,
      {},
      response => {
        console.log(response);
        const data = {
          app: "3",
          record: {
            Title: { value: response.title },
            ImageUrl: { value: response.imageUrl },
            Link: { value: response.url },
          }
        };

        const headers = {
          'Content-Type': 'application/json',
          'X-Cybozu-API-Token' : API_TOKEN,
        };
        const init = {
          method: 'POST',
          body: JSON.stringify(data),
          headers,
        };
        fetch(API_ENDPOINT, init)
          .then(res => res.json())
          .then(response => console.log("Success:", JSON.stringify(response)))
          .catch(error => console.error("Error:", error));
          }
    );
  }

  render() {
    return <div className="popupContainer">hello</div>;
  }
}
