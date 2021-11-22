import { Form, Input, Button, Checkbox } from "antd";
import { Fragment, useState } from "react";
import axios from "axios";
import {
	GoogleReCaptcha,
	GoogleReCaptchaProvider,
} from "react-google-recaptcha-v3";

const FormLogin = () => {
	const onFinish = (values: any) => {
		console.log("Success:", values);
	};

	const onFinishFailed = (errorInfo: any) => {
		console.log("Failed:", errorInfo);
	};
	const [formStatus, setFormStatus] = useState(false);
	const [query, setQuery] = useState({
		name: "",
		email: "",
		platform: "",
		"g-recaptcha-response": "",
	});

	const handleChange = () => (e: any) => {
		const name = e.target.name;
		const value = e.target.value;
		setQuery((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleSubmit = (e: any) => {
		e.preventDefault();
		const formData = new FormData();
		Object.entries(query).forEach(([key, value]) => {
			formData.append(key, value);
		});

		axios
			.post(
				"https://getform.io/f/b22f10be-75a6-40c0-9ec6-3519dc38fe29",
				formData,
				{ headers: { Accept: "application/json" } }
			)
			.then(function (response) {
				setFormStatus(true);
				setQuery({
					name: "",
					email: "",
					platform: "",
					"g-recaptcha-response": "",
				});
				console.log(response);
			})
			.catch(function (error) {
				console.log(error);
			});
	};

	return (
		<Fragment>
			<GoogleReCaptchaProvider reCaptchaKey="6LcJCk8dAAAAAHHaH_kRwhK9_m-xG0OiNdTz6B2N">
				<Form
					name="basic"
					labelCol={{ span: 8 }}
					wrapperCol={{ span: 8 }}
					initialValues={{ remember: true }}
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

					<GoogleReCaptcha
						onVerify={(verify) => {
							console.log(verify);
						}}
					></GoogleReCaptcha>
					<Form.Item wrapperCol={{ offset: 4, span: 16 }}>
						<Button
							type="primary"
							htmlType="submit"
							size="large"
							onSubmit={handleSubmit}
						>
							Submit
						</Button>
					</Form.Item>
				</Form>
			</GoogleReCaptchaProvider>
		</Fragment>
	);
};

export default FormLogin;
