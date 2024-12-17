const presence = new Presence({
	clientId: "904084297831571518",
}),
browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", () => {
const presenceData: PresenceData = {
		largeImageKey:
			"https://cdn.rcd.gg/PreMiD/websites/A/atomicradio/assets/logo.png",
		smallImageKey: Assets.Search,
		startTimestamp: browsingTimestamp,
		type: ActivityType.Listening,
	},
	player = document.querySelector<HTMLDivElement>("div.player");

if (player) {
	presenceData.largeImageKey = JSON.parse(localStorage.getItem("currentTrack")).artwork;
	presenceData.smallImageKey =
		player.querySelector<HTMLButtonElement>('[id*="-button"]').id ===
		"play-button"
			? Assets.Play
			: Assets.Pause;
	presenceData.details =
		JSON.parse(localStorage.getItem("currentTrack")).title;
		
	presenceData.state =
		JSON.parse(localStorage.getItem("currentTrack")).artist;
	presenceData.startTimestamp = Math.floor(new Date(
		JSON.parse(localStorage.getItem("currentTrack")).startingAt
	).getTime() / 1000);
	presenceData.endTimestamp = Math.floor(new Date(
		JSON.parse(localStorage.getItem("currentTrack")).endingAt
	).getTime() / 1000);
	presenceData.smallImageText =
		player.querySelector("div.track-space").textContent;
	presenceData.buttons = [
		{
			label: "Listen",
			url: `https://atomic.radio/${
				player.querySelector("#spaceId").textContent
			}`,
		},
	];
} else if (document.location.pathname === "/") {
	presenceData.details = "Browsing spaces..";
	
} else presenceData.details = `Browsing ${document.location.pathname.split("/").at(-1)}..`;

if (presenceData.details) presence.setActivity(presenceData);
else presence.setActivity();
});
