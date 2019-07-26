import { notification } from "antd";

export default ({ type = "success", message = "", description = "" }) => {
  notification[type]({
    message,
    description
  });
};
