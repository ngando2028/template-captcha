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
				reCaptchaKey="6Ldsfk8dAAAAAA8KoF9rJ5Hix3hsqxxRi55OnSh9"
				scriptProps={{ async: false, defer: false, appendTo: 'head' }}
			>
				<FormLogin />
			</GoogleReCaptchaProvider>
		</div>
	);
}

export default App;
