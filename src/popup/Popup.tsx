import React, { useEffect, useState } from "react";
import "./Popup.scss";
import { Options, ProductInfo } from "../typings";
import { Card } from "./Card";
import { Spinner } from "react-lightning-design-system";
import { saveRecord } from "../kintoneApi";

type Props = {
  tabId: number;
};

const Popup: React.FC<Props> = props => {
  const [options, setOptions] = useState<Options>({});
  const [loading, setLoading] = useState(false);
  const [productInfo, setProductInfo] = useState<ProductInfo>({});

  useEffect(() => {
    chrome.storage.local.get("options", data => {
      setOptions(data.options);
    });
  }, []);

  useEffect(() => {
    chrome.tabs.sendMessage(props.tabId, {}, response => {
      setProductInfo(response);
    });
  }, [props.tabId]);

  const saveToKintone = async (productInfo: ProductInfo, options: Options) => {
    setLoading(true);
    await saveRecord(productInfo, options);
    setLoading(false);
  };

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
  return (
    <div className="popupContainer">
      {loading && <Spinner type="brand" size="large" />}
      {children}
    </div>
  );
};

export default Popup;
