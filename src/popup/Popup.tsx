import React, { useEffect, useState } from "react";
import "./Popup.scss";
import { Options, ProductInfo } from "../typings";
import { Card } from "./Card";
import { Spinner } from "react-lightning-design-system";
import { saveRecord } from "../kintoneApi";
import { Success } from "./Success";
import { Text } from "./Text";

type Props = {
  tabId: number;
};

type Status =
  | "FETCH_OPTION_FAILURE"
  | "FETCH_PRODUCT_INFO_SUCCESS"
  | "FETCH_PRODUCT_INFO_FAILURE"
  | "SAVE_START"
  | "SAVE_SUCCESS";

const Popup: React.FC<Props> = (props) => {
  const [status, setStatus] = useState<Status>();
  const [options, setOptions] = useState<Options>({});
  const [productInfo, setProductInfo] = useState<ProductInfo>({});
  const [recordId, setRecordId] = useState("");

  useEffect(() => {
    chrome.storage.local.get("options", (data) => {
      setOptions(data.options);
      if (!data.options) {
        setStatus("FETCH_OPTION_FAILURE");
      }
    });
  }, []);

  useEffect(() => {
    chrome.tabs.sendMessage(props.tabId, {}, (response) => {
      if (response) {
        setStatus("FETCH_PRODUCT_INFO_SUCCESS");
        setProductInfo(response);
      } else {
        setStatus("FETCH_PRODUCT_INFO_FAILURE");
      }
    });
  }, [props.tabId]);

  // eslint-disable-next-line no-shadow
  const saveToKintone = async (productInfo: ProductInfo, options: Options) => {
    setStatus("SAVE_START");
    // eslint-disable-next-line no-shadow
    const recordId = await saveRecord(productInfo, options);
    setStatus("SAVE_SUCCESS");
    setRecordId(recordId);
  };

  let content;
  console.log("Status: ", status);
  switch (status) {
    case "FETCH_OPTION_FAILURE":
      content = <Text type="error">Please set options</Text>;
      break;
    case "FETCH_PRODUCT_INFO_FAILURE":
      content = <Text type="error">Failed to fetch product info.</Text>;
      break;
    case "FETCH_PRODUCT_INFO_SUCCESS":
      content = (
        <Card
          {...productInfo}
          onClickSave={() => saveToKintone(productInfo, options)}
        />
      );
      break;
    case "SAVE_START":
      content = <Spinner type="brand" size="large" />;
      break;
    case "SAVE_SUCCESS":
      content = (
        <Success
          appId={options.appId}
          recordId={recordId}
          subdomain={options.subdomain}
        />
      );
      break;
    default:
      content = <Text>Fetching product info...</Text>;
      break;
  }
  return (
    <div className="popupContainer slds-align_absolute-center">{content}</div>
  );
};

export default Popup;
