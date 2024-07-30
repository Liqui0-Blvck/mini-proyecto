import NotificationPartial from '../_partial/Notification.partial';
import SettingsPartial from '../_partial/Settings.partial';

const DefaultHeaderRightCommon = () => {
	return (
		<>
			<NotificationPartial />
			<SettingsPartial />
		</>
	);
};

export default DefaultHeaderRightCommon;
