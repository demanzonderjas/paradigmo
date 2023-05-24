import { useUser } from "../../hooks/useUser";
import { observer } from "mobx-react";

export const Profile = observer(() => {
	const { user } = useUser();

	if (!user) {
		return null;
	}

	return (
		<div className="profile">
			<div id="firebaseui-auth-container"></div>
			<div id="loader"></div>
			<h2>{user.email}</h2>
		</div>
	);
});
