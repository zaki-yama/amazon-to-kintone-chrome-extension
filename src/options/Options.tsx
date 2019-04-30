import React, { useState } from "react";

type Form = {
  subdomain?: string;
  appId?: string;
  apiToken?: string;
  titleFieldCode?: string;
  urlFieldCode?: string;
  imageUrlFieldCode?: string;
};

export const Options: React.FC = props => {
  const [form, setForm] = useState<Form>({});

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSave = e => {
    // TODO
    console.log(form);
  };

  return (
    <>
      <label>
        Subdomain
        <input name="subdomain" type="text" onChange={handleChange} value={form.subdomain} />
      </label>
      <label>
        App Id
        <input name="appId" type="text" onChange={handleChange} value={form.appId} />
      </label>
      <label>
        Api Token
        <input name="apiToken" type="text" onChange={handleChange} value={form.apiToken} />
      </label>
      <label>
        Field Code for Product Title
        <input name="titleFieldCode" type="text" onChange={handleChange} value={form.titleFieldCode} />
      </label>
      <label>
        Field Code for Product Url
        <input name="urlFieldCode" type="text" onChange={handleChange} value={form.urlFieldCode} />
      </label>
      <label>
        Field Code for Product Image Url
        <input name="imageUrlFieldCode" type="text" onChange={handleChange} value={form.imageUrlFieldCode} />
      </label>
      <button onClick={onSave}>Save</button>
    </>
  );
};
