import { useUser } from "../../hooks/useUser";
import { observer } from "mobx-react";

export const Profile = observer(() => {
	const { user } = useUser();

	if (!user) {
		return null;
	}

	return (
		<div className="profile mt-10">
			<h2>{user.email}</h2>
		</div>
	);
});
