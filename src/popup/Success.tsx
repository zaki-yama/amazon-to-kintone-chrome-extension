import React from "react";
import { Icon, Grid, Row, Col } from "react-lightning-design-system";

type Props = {
  appId: string;
  recordId: string;
  subdomain: string;
};

export const Success: React.FC<Props> = ({ appId, recordId, subdomain }) => {
  const url = `https://${subdomain}.cybozu.com/k/${appId}/show#record=${recordId}`;
  return (
    <Grid>
      <Row cols={1} align="center">
        <Icon
          category="action"
          icon="approval"
          container="circle"
          size="large"
        />
      </Row>
      <Row cols={1} align="center">
        <Col>
          <div className="slds-text-heading_medium">
            <a href={url} target="_blank" rel="noopener noreferrer">
              Saved as #{recordId}
            </a>
          </div>
        </Col>
      </Row>
    </Grid>
  );
};
