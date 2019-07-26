import React from "react";
import { Button } from "antd";

export default ({ onClick }) => (
  <div>
    <h2 className="header">POST CREATOR</h2>
    <Button type="primary" style={{ marginTop: 10 }} onClick={onClick}>
      Add post +
    </Button>
  </div>
);
