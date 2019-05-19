export type ProductInfo = {
  url: string;
  title: string;
  imageUrl: string;
};

export type Options = {
  subdomain?: string;
  appId?: string;
  apiToken?: string;
  titleFieldCode?: string;
  urlFieldCode?: string;
  imageUrlFieldCode?: string;
};
