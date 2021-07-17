import React, { useEffect, useState } from "react";
import {
	Checkbox,
	FormGroup,
	FormControlLabel,
	CircularProgress,
} from "@material-ui/core";
import "./Landing.css";
import Card from "./component/Card";

function Landing() {
	const [colleges, setColleges] = useState([]);
	const [filteredColleges, setFilteredColleges] = useState([]);
	const [isCollegeSet, setIsCollegeSet] = useState(false);
	const [code, setCode] = useState("");
	const [domain, setDomain] = useState("");
	const [search, setSearch] = useState("");

	useEffect(async () => {
		let colleges = await getDataApi();
		setColleges(colleges);
		setFilteredColleges(colleges);
	}, [search]);

	useEffect(async () => {
		let colleges = await getDataApi();
		setFilteredColleges(colleges);
	}, [code, domain]);

	const getDataApi = async () => {
		setIsCollegeSet(false);
		try {
			let response = await fetch(
				`http://localhost:8081/api/collegeList?code=${code}&domain=${domain}&name=${search}`,
				{
					method: "GET",
				}
			);
			let data = await response.json();
			setIsCollegeSet(true);
			return data;
		} catch (err) {
			console.log(err);
		}
	};

	const filterData = async (type, e) => {
		if (e.target.checked) {
			if (type === "code") {
				setCode(e.target.value);
			}
			if (type === "domain") {
				setDomain(e.target.value);
			}
		} else {
			if (type === "code") {
				setCode("");
			}
			if (type === "domain") {
				setDomain("");
			}
		}
	};

	const searchFunction = (e) => {
		if (e.keyCode == 13) {
			setDomain("");
			setCode("");
			setSearch(e.target.value);
		}
	};

	return (
		<div className="LandingContainer">
			<div className="searchbarContainer">
				<input
					type="text"
					id="searchbar"
					placeholder="Start typing..."
					onKeyUp={searchFunction}
				/>
				<div className="filtersContainer">
					<div className="FormTitle">Countries</div>
					<FormGroup row id="formGroup">
						{Object.keys(colleges)?.map((i) => (
							<FormControlLabel
								key={i}
								control={<Checkbox name="checkbox" color="secondary" />}
								label={colleges[i].alpha_two_code}
								checked={code === colleges[i].alpha_two_code}
								value={colleges[i].alpha_two_code}
								onChange={(e) => filterData("code", e)}
							/>
						))}
					</FormGroup>
				</div>
				<div className="filtersContainer">
					<div className="FormTitle">Domain</div>
					<FormGroup row id="formGroup">
						{Object.keys(colleges)?.map((i) => (
							<FormControlLabel
								key={i}
								control={<Checkbox name="checkbox" color="secondary" />}
								label={colleges[i].domain.split(".")[0].toUpperCase()}
								checked={domain === colleges[i].domain.split(".")[0]}
								value={colleges[i].domain.split(".")[0]}
								onChange={(e) => filterData("domain", e)}
							/>
						))}
					</FormGroup>
				</div>
			</div>
			<div className="CardsContainer">
				{isCollegeSet ? (
					<>
						{Object.keys(filteredColleges)?.map((i) => (
							<Card key={i} collegeName={filteredColleges[i].name} />
						))}
					</>
				) : (
					<>
						<CircularProgress />
					</>
				)}
			</div>
		</div>
	);
}

export default Landing;
