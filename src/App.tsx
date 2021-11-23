import React from "react";
import "antd/dist/antd.css";
import "./App.css";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import FormLogin from "./Login/FormLogin";


function App() {

	return (
		<div className="App">
			<GoogleReCaptchaProvider
				useRecaptchaNet
				reCaptchaKey="6LcJCk8dAAAAAHHaH_kRwhK9_m-xG0OiNdTz6B2N"
				scriptProps={{ async: false, defer: false, appendTo: 'head' }}
			>
				<FormLogin />
			</GoogleReCaptchaProvider>
		</div>
	);
}

export default App;
