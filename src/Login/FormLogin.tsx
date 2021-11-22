import { Form, Input, Button, Checkbox } from "antd";
import { Fragment } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

const FormLogin = () => {
	const onFinish = (values: any) => {
		console.log("Success:", values);
	};

	const onFinishFailed = (errorInfo: any) => {
		console.log("Failed:", errorInfo);
	};

	return (
		<Fragment>
			<Form
				name="basic"
				labelCol={{ span: 8 }}
				wrapperCol={{ span: 8 }}
				initialValues={{ remember: true }}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				autoComplete="off"
				className="center"
			>
				<Form.Item
					label="Username"
					name="username"
					rules={[{ required: true, message: "Please input your username!" }]}
				>
					<Input />
				</Form.Item>

				<Form.Item
					label="Password"
					name="password"
					rules={[{ required: true, message: "Please input your password!" }]}
				>
					<Input.Password />
				</Form.Item>

				<Form.Item
					name="remember"
					valuePropName="checked"
					wrapperCol={{ offset: 4, span: 16 }}
				>
					<Checkbox>Remember me</Checkbox>
				</Form.Item>

				<Form.Item wrapperCol={{ offset: 4, span: 16 }}>
					<Button type="primary" htmlType="submit" size="large">
						Submit
					</Button>
				</Form.Item>
			</Form>
		</Fragment>
	);
};

export default FormLogin;
