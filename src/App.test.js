import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { PostProvider } from "./context/postContext";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <PostProvider>
      <App />
    </PostProvider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
