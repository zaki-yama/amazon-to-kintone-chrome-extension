import React, { useEffect, useState } from "react";
import "./Popup.scss";
import { Options, ProductInfo } from "../typings";
import { Card } from "./Card";

const API_TOKEN = "YOUR_API_TOKEN";
const DOMAIN = "YOUR_DOMAIN";
const API_ENDPOINT = `https://${DOMAIN}.cybozu.com/k/v1/record.json`;

type Props = {
  tabId: number;
};

const Popup: React.FC<Props> = props => {
  const [options, setOptions] = useState<Options>({});
  const [productInfo, setProductInfo] = useState({});

  useEffect(function loadOptions() {
    chrome.storage.local.get("options", data => {
      setOptions(data.options);
    });
  }, []);

  useEffect(function extractPageInfo() {
    chrome.tabs.sendMessage(props.tabId, {}, response => {
      setProductInfo(response);
    });
  }, []);

  /*
      const data = {
        app: "3",
        record: {
          Title: { value: response.title },
          ImageUrl: { value: response.imageUrl },
          Link: { value: response.url }
        }
      };
      const headers = {
        "Content-Type": "application/json",
        "X-Cybozu-API-Token": API_TOKEN
      };
      const init = {
        method: "POST",
        body: JSON.stringify(data),
        headers
      };
      fetch(API_ENDPOINT, init)
        .then(res => res.json())
        .then(response => console.log("Success:", JSON.stringify(response)))
        .catch(error => console.error("Error:", error));
      */

  let children;
  if (!options) {
    children = "Please set options.";
  } else if (!productInfo) {
    children = "Getting product info...";
  } else {
    children = <Card {...productInfo} />;;
  }
  return <div className="popupContainer">{children}</div>;
};

export default Popup;
