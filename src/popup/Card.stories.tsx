import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import { Card } from "./Card";

const productInfo = {
  imageUrl:
    "https://images-na.ssl-images-amazon.com/images/I/51YsiMZMD1L._SX393_BO1,204,203,200_.jpg",
  title:
    "Web制作者のためのCSS設計の教科書 モダンWeb開発に欠かせない「修正しやすいCSS」の設計手法",
};

storiesOf("Card", module).add("default", () => {
  return (
    <div style={{ width: "300px" }}>
      <Card
        {...productInfo}
        onClickSave={action("Save")}
        onClickCancel={action("Cancel")}
      />
    </div>
  );
});
