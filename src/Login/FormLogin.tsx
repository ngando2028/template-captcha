import { Form, Input, Button } from "antd";
import axios from "axios";
import { FC, useCallback, useEffect, useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

interface IFormData {
	username: string, 
	password: string, 
	recaptchaToken?: string|null
}

const FormLogin: FC = () => {
	const { executeRecaptcha } = useGoogleReCaptcha();
	const [isLogged, setIsLogged] = useState(false);
	const [formData, setFormData] = useState<IFormData>({
		username: '',
		password: '',
		recaptchaToken: null,
	});

	useEffect(() => {
    if (!formData.recaptchaToken) {
      return;
    }
		axios.post(
			"https://assignment-nestjs-api.herokuapp.com/api/auth/loginRecaptcha",
			formData,
			{ headers: { Accept: "application/json" } }
		)
		.then(function (response) {
			setFormData({
				username: '',
				password: '',
				recaptchaToken: null,
			})
			if(response.status === 201) {
				setIsLogged(true);
			}
		})
		.catch(function (error) {
			console.log(error);
		});
  }, [formData, formData.recaptchaToken]);

	const getTokenCaptcha = useCallback(async () => {
		if (!executeRecaptcha) {
			console.log("Execute recaptcha not yet available");
			return;
		}
		try {
			await executeRecaptcha().then((res) => {
				setFormData({
					...formData,
					recaptchaToken: res
				});
			})
		} catch (error) {
			console.log(error);
		}
    
	}, [executeRecaptcha, formData])
	
	const onFinish = async () => {
		getTokenCaptcha();
	};

	const handleChangeUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setFormData({
			...formData,
			username: value
		});
	};

	const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setFormData({
			...formData,
			password: value
		});
	}

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
					<Input value={formData.username} onChange={(e) => handleChangeUserName(e)} />
				</Form.Item>

				<Form.Item
					label="Password"
					name="password"
					rules={[{ required: true, message: "Please input your password!" }]}
				>
					<Input.Password
						value={formData.password}
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
