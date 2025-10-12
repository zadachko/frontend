/**
 * Handles the scroll event for the sidebar.
 * @param event - The wheel event.
 * @param mainContentRef - The ref to the main content.
 */
const handleSidebarScroll = (
	event: React.WheelEvent,
	mainContentRef: React.RefObject<HTMLDivElement>
) => {
	if (mainContentRef.current) {
		// Prevent the default scroll behavior on the sidebar
		event.preventDefault();

		// Apply the scroll delta to the main content
		mainContentRef.current.scrollTop += event.deltaY;
	}
};

export default handleSidebarScroll;
