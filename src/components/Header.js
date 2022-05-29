import React, { useState } from "react";
import { withRouter } from "react-router";
import { Layout, Button, Divider, Icon } from "antd";
import cubejsLogo from "../octo.jfif";
import tracker from "../tracker";

const Header = ({ location }) => {
  const [sendingEvent, setSendingEvent] = useState(false);
  return (
    <Layout.Header
      style={{
        padding: "0 32px"
      }}
    >
      <div
        style={{
          float: "left"
        }}
      >
        <h2
          style={{
            color: "#fff",
            margin: 0,
            marginRight: "1em"
          }}
        >
          <img alt="cubejs-logo" src={cubejsLogo} height={40} />
          <p className="stats">Real Time Demo</p>
        </h2>
      </div>
      <div className="top-menu">
        {/* <Button
          onClick={() => {
            setSendingEvent(true);
            setTimeout(() => setSendingEvent(false), 2500);
            tracker.event("buttonClicked");
          }}
          loading={sendingEvent}
          type="primary"
        >
          {sendingEvent
            ? "Adding random campaigns ..."
            : "Add random campaigns"}
        </Button> */}
      </div>
    </Layout.Header>
  )
};

export default withRouter(Header);
