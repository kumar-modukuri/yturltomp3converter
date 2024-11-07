import Body from "./components/Body";
import Footer from "./components/Footer";
import Header from "./components/Header";

const App = () => {
	return (
		<div className="landingpage">
			<div className="landingHeader">
				<Header />
			</div>
			<div className="landingContent">
				<Body />
			</div>
			<div className="landingFoter">
				<Footer />
			</div>
		</div>
	);
};

export default App;
