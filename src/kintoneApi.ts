import { Options, ProductInfo } from "./typings";

export function saveToKintone(productInfo: ProductInfo, options: Options) {
  const data = {
    app: "3",
    record: {
      [options.titleFieldCode]: { value: productInfo.title },
      [options.urlFieldCode]: { value: productInfo.url },
      [options.imageUrlFieldCode]: { value: productInfo.imageUrl }
    }
  };
  const headers = {
    "Content-Type": "application/json",
    "X-Cybozu-API-Token": options.apiToken
  };
  const init = {
    method: "POST",
    body: JSON.stringify(data),
    headers
  };
  const url = `https://${options.subdomain}.cybozu.com/k/v1/record.json`;
  fetch(url, init)
    .then(res => res.json())
    .then(response => console.log("Success:", JSON.stringify(response)))
    .catch(error => console.error("Error:", error));
}
