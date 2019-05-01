import React, { useState } from "react";
import { Form, Input, Button } from 'react-lightning-design-system';

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
    <div className="optionsContainer">
      <Form className="form">
        <Input name="subdomain" label="Subdomain" onChange={handleChange} value={form.subdomain} />
        <Input name="appId" label="App Id" onChange={handleChange} value={form.appId} />
        <Input name="apiToken" label="Api Token" onChange={handleChange} value={form.apiToken} />
        <Input name="titleFieldCode" label="Field Code for Product Title" onChange={handleChange} value={form.titleFieldCode} />
        <Input name="urlFieldCode" label="Field Code for Product Url" onChange={handleChange} value={form.urlFieldCode} />
        <Input name="imageUrlFieldCode" label="Field Code for Product Image Url" onChange={handleChange} value={form.imageUrlFieldCode} />
        <Button type="brand" onClick={onSave}>Save</Button>
      </Form>
    </div>
  );
};
