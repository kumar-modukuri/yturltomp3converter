import axios from "axios";
import { useState } from "react";

const Body = () => {
	const [url, setUrl] = useState("");
	const [loading, setLoading] = useState(false);

	const handleDownload = async () => {
		if (url === "") {
			alert("Please Enter a valid URL");
			return;
		}

		setLoading(true);

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
					filename = decodeURIComponent(filenameMatch[1]).replace(/\+/g, " ");
				}
			}

			const blob = new Blob([response.data], { type: "audio/mpeg" });

			const link = document.createElement("a");
			link.href = URL.createObjectURL(blob);
			link.download = filename;
			link.click();
		} catch (error) {
			console.log("Error downloading the file : ", error);
			alert("Failed to download the file");
		} finally {
			setLoading(false);
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
			<button onClick={handleDownload} disabled={loading}>
				{loading ? "Downloading..." : "Download Mp3"}
			</button>
		</div>
	);
};

export default Body;
