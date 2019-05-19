import { Options, ProductInfo } from "./typings";

export async function saveRecord(productInfo: ProductInfo, options: Options) {
  const data = {
    app: options.appId,
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
  const response = await fetch(url, init);
  const json = await response.json();
  console.log(json);
  return json;
}
