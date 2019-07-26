import React from "react";
import { Form, Icon, Input } from "antd";

const NewOrEditPost = Form.create({ name: "NewOrEditPost" })(
  class extends React.Component {
    render() {
      const {
        currentUser,
        form: { getFieldDecorator }
      } = this.props;
      return (
        <Form className="login-form">
          <Form.Item>
            {getFieldDecorator("userId", {
              rules: [
                {
                  required: true,
                  message: "User id is require"
                }
              ],
              initialValue: currentUser.userId
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="number"
                disabled={currentUser.userId !== undefined}
                placeholder="User id"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("title", {
              rules: [
                {
                  required: true,
                  message: "Title is require"
                }
              ],
              initialValue: currentUser.title
            })(
              <Input
                prefix={
                  <Icon type="edit" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="Title post"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("body", {
              rules: [
                {
                  required: true,
                  message: "body is require"
                }
              ],
              initialValue: currentUser.body
            })(<Input.TextArea autosize={{ minRows: 3 }} placeholder="post" />)}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("id", {
              initialValue: currentUser.id
            })(<Input type="hidden" />)}
          </Form.Item>
        </Form>
      );
    }
  }
);

export default NewOrEditPost;
