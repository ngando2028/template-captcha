import { Form, Input, Button } from "antd";
import axios from "axios";
import { FC, useCallback, useEffect, useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

const FormLogin: FC = () => {
	const [isLogged, setIsLogged] = useState(false);
	const [token, setToken] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const { executeRecaptcha } = useGoogleReCaptcha();

	const handleReCaptchaVerify = useCallback(async () => {
		if (!executeRecaptcha) {
			return;
		}

		const token = await executeRecaptcha("SignIn");
		setToken(token);
	}, [executeRecaptcha]);

	useEffect(() => {
		handleReCaptchaVerify();
	}, [handleReCaptchaVerify]);

	const onFinish = (values: any) => {
		if (token) {
			const formData = {
				username,
				password,
				recaptchaToken: token,
			};
			axios
				.post("http://localhost:3000/api/auth/loginRecaptcha", formData, {
					headers: { Accept: "application/json" },
				})
				.then(function (response) {
					console.log(response);
					setUsername("");
					setPassword("");
					setToken("");
					if (response.status === 201) {
						setIsLogged(true);
					}
				})
				.catch(function (error) {
					console.log(error);
				});
		} else {
			alert("Doi xiu di nao!");
		}
	};

	const handleChangeUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setUsername(value);
	};

	const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setPassword(value);
	};

	if (isLogged) return <h1>Đã đăng nhập</h1>;

	return (
		<div className="login-form">
			<h1>Login</h1>
			<Form
				name="basic"
				labelCol={{ span: 8 }}
				wrapperCol={{ span: 8 }}
				initialValues={{ remember: true }}
				onFinish={onFinish}
				autoComplete="off"
				className="center"
			>
				<Form.Item
					label="Username"
					name="username"
					rules={[{ required: true, message: "Please input your username!" }]}
				>
					<Input value={username} onChange={(e) => handleChangeUserName(e)} />
				</Form.Item>

				<Form.Item
					label="Password"
					name="password"
					rules={[{ required: true, message: "Please input your password!" }]}
				>
					<Input.Password
						value={password}
						onChange={(e) => handleChangePassword(e)}
					/>
				</Form.Item>

				<Form.Item wrapperCol={{ offset: 4, span: 16 }}>
					<Button type="primary" htmlType="submit" size="large">
						Submit
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
};

export default FormLogin;
