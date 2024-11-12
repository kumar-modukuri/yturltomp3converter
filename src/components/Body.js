import axios from "axios";
import { useState } from "react";

const Body = () => {
	const [url, setUrl] = useState("");
	const [loadingAudio, setLoadingAudio] = useState(false);
	const [loadingVideo, setLoadingVideo] = useState(false);

	// Function to download audio
	const downloadAudio = async () => {
		if (url === "") {
			alert("Please Enter a valid URL");
			return;
		}

		setLoadingAudio(true);

		try {
			const response = await axios.get(
				process.env.REACT_APP_API_URL + "/audio?url=" + encodeURIComponent(url),
				{
					responseType: "blob",
				}
			);

			const disposition = response.headers["content-disposition"];
			let filename = "default_name.mp3";

			if (disposition) {
				const filenameMatch = disposition.match(/filename="([^"]+)"/);
				if (filenameMatch && filenameMatch[1]) {
					// Decode using decodeURIComponent and replace + with spaces
					filename = decodeURIComponent(filenameMatch[1].replace(/\+/g, " "));
				}
			}

			const blob = new Blob([response.data], { type: "audio/mpeg" });
			const link = document.createElement("a");
			link.href = URL.createObjectURL(blob);
			link.download = filename;
			link.click();
		} catch (error) {
			console.log("Error downloading the Audio : ", error);
			alert("Failed to download the Audio");
		} finally {
			setLoadingAudio(false);
			setUrl("");
		}
	};

	// Function to download video
	const downloadVideo = async () => {
		if (url === "") {
			alert("Please Enter a valid URL");
			return;
		}

		setLoadingVideo(true);

		try {
			const response = await axios.get(
				process.env.REACT_APP_API_URL + "/video?url=" + encodeURIComponent(url),
				{
					responseType: "blob",
				}
			);

			const disposition = response.headers["content-disposition"];
			let filename = "default_name.mp4";

			if (disposition) {
				const filenameMatch = disposition.match(/filename="([^"]+)"/);
				if (filenameMatch && filenameMatch[1]) {
					// Decode using decodeURIComponent and replace + with spaces
					filename = decodeURIComponent(filenameMatch[1].replace(/\+/g, " "));
				}
			}

			const blob = new Blob([response.data], { type: "video/mp4" });
			const link = document.createElement("a");
			link.href = URL.createObjectURL(blob);
			link.download = filename;
			link.click();
		} catch (error) {
			console.log("Error downloading the Video : ", error);
			alert("Failed to download the Video");
		} finally {
			setLoadingVideo(false);
			setUrl("");
		}
	};

	return (
		<div>
			<input
				type="text"
				placeholder="Enter URL"
				value={url}
				onChange={(e) => setUrl(e.target.value)}
			/>
			<button onClick={downloadAudio} disabled={loadingAudio}>
				{loadingAudio ? "Downloading..." : "Download Audio"}
			</button>
			<button onClick={downloadVideo} disabled={loadingVideo}>
				{loadingVideo ? "Downloading..." : "Download Video"}
			</button>
		</div>
	);
};

export default Body;
