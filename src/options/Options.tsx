import React, { useState, useEffect } from "react";
import { Form, Input, Button, Toast } from 'react-lightning-design-system';
import './Options.scss';

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
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    chrome.storage.local.get("options", data => {
      setForm(data.options);
    });
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSave = e => {
    chrome.storage.local.set({ options: form }, () => {
      setShowToast(true);
    });
  };

  return (
    <div className="optionsContainer">
      {showToast
        ? <Toast
            className="toast"
            level="success"
            icon="success"
            onClose={() => setShowToast(false)}
          >
            Successfully Saved.
          </Toast>
        : null}
      <div className="slds-text-heading_medium">Options</div>
      <Form className="form">
        <Input name="subdomain" label="Subdomain" onChange={handleChange} value={form.subdomain} />
        <Input name="appId" label="App Id" onChange={handleChange} value={form.appId} />
        <Input name="apiToken" label="Api Token" onChange={handleChange} value={form.apiToken} />
        <Input name="titleFieldCode" label="Field Code for Product Title" onChange={handleChange} value={form.titleFieldCode} />
        <Input name="urlFieldCode" label="Field Code for Product Url" onChange={handleChange} value={form.urlFieldCode} />
        <Input name="imageUrlFieldCode" label="Field Code for Product Image Url" onChange={handleChange} value={form.imageUrlFieldCode} />
        <Button className="slds-m-top_medium" type="brand" onClick={onSave}>Save</Button>
      </Form>
    </div>
  );
};
