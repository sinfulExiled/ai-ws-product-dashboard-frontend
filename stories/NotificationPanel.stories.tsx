import NotificationPanel from "../components/NotificationPanel";

export default { title: "NotificationPanel", component: NotificationPanel };

export const Default = () => {
  // For storybook we can't access store; render bare component with mocked provider in real project
  return <div style={{ width: 300 }}><NotificationPanel /></div>;
};
