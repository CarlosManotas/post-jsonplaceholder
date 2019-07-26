import React from "react";
import { Icon, Modal } from "antd";

const { confirm } = Modal;

export default ({ type, onClick, post }) => {
  return (
    <Icon
      type={type}
      theme="twoTone"
      twoToneColor={type === "delete" ? "#eb2f96" : "#52c41a"}
      onClick={() =>
        type === "delete"
          ? confirm({
              title: "Do you Want to delete these post?",
              onOk() {
                onClick(post.id);
              },
              onCancel() {
                console.log("Cancel");
              }
            })
          : onClick(post)
      }
    />
  );
};
