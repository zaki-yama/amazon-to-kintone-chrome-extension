import React from "react";
import { Button } from "react-lightning-design-system";
import { ProductInfo } from "../typings";

type CardProps = Partial<ProductInfo> & {
  onClickSave: () => void;
  onClickCancel: () => void;
};

export const Card: React.FC<CardProps> = props => {
  return (
    <article className="slds-card">
      <div className="slds-card__body slds-card__body_inner">
        <div className="slds-illustration slds-illustration_small">
          <img src={props.imageUrl} style={{ maxWidth: "200px" }} />
          <div className="slds-text-longform">
            <p className="slds-text-body_regular">{props.title}</p>
          </div>
        </div>
      </div>
      <footer className="slds-card__footer">
        <Button type="neutral" onClick={props.onClickCancel}>
          Cancel
        </Button>
        <Button type="brand" autoFocus={true} onClick={props.onClickSave}>
          Save
        </Button>
      </footer>
    </article>
  );
};
