import { observer } from "mobx-react";
import { useUser } from "../../hooks/useUser";
import { useEffect } from "react";

export const Login = observer(() => {
	const { user, initUI } = useUser();

	useEffect(() => {
		initUI();
	}, []);

	if (user) {
		return null;
	}

	return (
		<div className="mt-10">
			<div id="firebaseui-auth-container"></div>
			<div id="loader"></div>
		</div>
	);
});
