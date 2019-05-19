import React, { useEffect, useState } from "react";
import "./Popup.scss";
import { Options, ProductInfo } from "../typings";
import { Card } from "./Card";
import { saveToKintone } from "../kintoneApi";

type Props = {
  tabId: number;
};

const Popup: React.FC<Props> = props => {
  const [options, setOptions] = useState<Options>({});
  const [productInfo, setProductInfo] = useState<ProductInfo>({});

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

  let children;
  if (!options) {
    children = "Please set options.";
  } else if (!productInfo) {
    children = "Getting product info...";
  } else {
    children = (
      <Card
        {...productInfo}
        onClickSave={() => saveToKintone(productInfo, options)}
      />
    );
  }
  return <div className="popupContainer">{children}</div>;
};

export default Popup;
