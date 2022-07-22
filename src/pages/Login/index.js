import { Card, Form, Checkbox, Input, Button, message } from "antd";
import { useNavigate } from "react-router-dom";

import { useStore } from "@/store";

import "./index.scss";
import logo from "@/assets/logo.png";

export default function Login() {
  const { loginStore } = useStore();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    const { mobile, code } = values;
    try {
      await loginStore.getToken({
        mobile,
        code,
      });
      navigate("/", { replace: true });
      message.success("登录成功");
    } catch (err) {
      message.error("用户名或密码失败");
    }
  };
  return (
    <div className="login">
      <Card className="login-container">
        <img className="login-logo" src={logo} alt="" />
        {/* 登录表单 */}
        <Form
          initialValues={{
            remember: true,
            mobile: "13811111111",
            code: "246810",
          }}
          validateTrigger={["onBlur"]}
          onFinish={onFinish}
        >
          <Form.Item
            name="mobile"
            rules={[
              {
                required: true,
                message: "请输入手机号",
              },
              {
                pattern: /^1[3-9]\d{9}$/,
                message: "请输入正确的手机号",
                validateTrigger: "onBlur",
              },
            ]}
          >
            <Input size="large" placeholder="请输入手机号" />
          </Form.Item>
          <Form.Item
            name="code"
            rules={[
              {
                required: true,
                message: "请输入密码",
              },
              {
                len: 6,
                message: "请输入正确的密码",
                validateTrigger: "onBlur",
              },
            ]}
          >
            <Input size="large" placeholder="请输入密码" />
          </Form.Item>
          <Form.Item name="remember" valuePropName="checked">
            <Checkbox className="login-checkbox-label">
              我已阅读并同意「用户协议」和「隐私条款」
            </Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" size="large">
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
