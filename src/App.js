import React, { Component } from 'react';
import { Button, Grid, Link } from '@material-ui/core';
import { Facebook, Instagram, Twitter, YouTube } from '@material-ui/icons';

import {ReactComponent as HeaderLogo} from './img/header-logo.svg';
import defaultPhoto from './img/default.jpg';
import disclaimer from './img/disclaimer.png';
import photo1 from './img/photo1.jpg';
import photo2 from './img/photo2.jpg';
import photo3 from './img/photo3.jpg';
import photo4 from './img/photo4.jpg';
import photo5 from './img/photo5.jpg';
import photo6 from './img/photo6.jpg';

import './App.scss';
import ImageGenerator from './ImageGenerator';
import html2canvas from 'html2canvas';
import fitty from 'fitty';

const defaultName = 'Your Name Here';
const defaultLocation = 'Voter, United States of America';
const defaultBlurb = 'I support Paula Jean, a coal miner\'s daughter from West Virginia, because she is a fierce advocate for the people. We need Paula Jean in the US Senate.';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			location: '',
			file: '',
			blurb: '',
			bgPhoto: '',
			bgColor: '',
			isIE: false,
		};
		this.handleChange = this.handleChange.bind(this);
		this.readFile = this.readFile.bind(this);
		this.makeCanvas = this.makeCanvas.bind(this);
	}

	handleChange(e) {
		this.setState(
			{
				...this.state,
				[e.target.name]: e.target.value,
			},
			() => this.makeCanvas()
		);

		if (e.target.name === 'name') {
			// change name font-size to fit
			fitty('.name-output', { maxSize: 50 });
		}
	}

	makeCanvas() {
		let divImage = document.getElementById('generated-image');
		let button = document.getElementById('btn-download');
		const androidDevice = window.navigator.userAgent.indexOf('Android');

		let distanceFromTop =
			divImage.getBoundingClientRect().top + window.pageYOffset;

		// NOTE: mobile
		if (window.innerWidth < 766 && androidDevice < 0) {
			// create canvas from html element
			html2canvas(divImage, {
				useCORS: true,
				scrollX: 0,
				scrollY: -window.scrollY,
				height: divImage.offsetHeight,
				y: distanceFromTop,
			}).then((canvas) => {
				// convert canvas to blob
				canvas.toBlob(function (blob) {
					// set href of download button
					button.href = URL.createObjectURL(blob);
				});
			});
		}
		// NOTE: desktop
		else {
			// create canvas from html element
			html2canvas(divImage, {
				useCORS: true,
				scrollX: 0,
				scrollY: -window.scrollY,
				height: divImage.offsetHeight,
				width: divImage.offsetWidth,
			}).then((canvas) => {
				// convert canvas to blob
				canvas.toBlob(function (blob) {
					// set href of download button
					button.href = URL.createObjectURL(blob);
				});
			});
		}
	}

	readFile(e) {
		if (e.target.files[0]) {
			this.setState(
				{
					...this.state,
					file: URL.createObjectURL(e.target.files[0]),
				},
				() => this.makeCanvas()
			);
		}
	}

	componentDidMount() {
		// check browser
		let browser = window.navigator.userAgent;
		let old_ie = browser.indexOf('MSIE ');
		let new_ie = browser.indexOf('Trident/');

		// set defaults
		this.setState({
			file: defaultPhoto,
			bgPhoto: photo1,
			bgColor: 'purpleBg',
			isIE: old_ie > -1 || new_ie > -1,
		});
	}

	render() {
		return (
			<div className="App">
				{/* header */}
				<header className="App-header">
					<HeaderLogo />
					<div className="text">
						<h1>I Endorse Paula Jean</h1>
						<p>
							Create your own endorsement graphic for Paula Jean to share over
							Instagram, Twitter, Facebook, emails, and so forth!
						</p>
					</div>
				</header>

				<section className="body">
					{this.state.isIE === true ? (
						<div className="left-group">
							<h2 class="ie">Sorry, this is not a supported browser</h2>
						</div>
					) : (
						<div className="left-group">
							<form>
								{/* name */}
								<div className="input-group standard">
									<input
										type="text"
										name="name"
										onChange={this.handleChange}
										placeholder="Enter Full Name"
										value={this.state.name}
										required
									/>
									<label htmlFor="name">Name</label>
								</div>

								{/* location */}
								<div className="input-group standard">
									<input
										type="text"
										name="location"
										onChange={this.handleChange}
										placeholder="Enter Location"
										value={this.state.location}
										required
									/>
									<label htmlFor="location">Job Title/ Location</label>
								</div>

                {/* blurb */}
                <div className="input-group standard">
                  <textarea
                    onChange={this.handleChange}
                    name="blurb"
                    placeholder="Your text here"
                    rows="6"
                    value={this.state.blurb}
                    maxLength="385"
                    required
                  />
                  <label htmlFor="blurb">
                    Why do you endorse Paula Jean Swearengin?
                  </label>
                </div>

								{/* photo upload */}
								<div className="input-group non-text">
									<input
										type="file"
										id="file"
										accept="image/*"
										onChange={this.readFile}
									/>
									<label htmlFor="inputImg">Upload photo</label>
									<img
										id="output"
										src={
											this.state.file === defaultPhoto
												? null
												: this.state.file
										}
										alt=""
									/>
								</div>

								{/* colors */}
								<div className="input-group non-text colors">
									<input
										type="radio"
										name="bgColor"
										id="purpleBG"
										value="purpleBg"
										checked={this.state.bgColor === 'purpleBg'}
										onChange={this.handleChange}
									/>
									<input
										type="radio"
										name="bgColor"
										id="blueBG"
										value="blueBg"
										checked={this.state.bgColor === 'blueBg'}
										onChange={this.handleChange}
									/>
									<input
										type="radio"
										name="bgColor"
										id="tealBG"
										value="tealBg"
										checked={this.state.bgColor === 'tealBg'}
										onChange={this.handleChange}
									/>
									<label htmlFor="bgColor">Color</label>
								</div>

								{/* image */}
								<div className="input-group non-text image-selector">
									<div className="options">
										<div className="img-radio">
											<input
												type="radio"
												name="bgPhoto"
												id="choice-1"
												value={photo1}
												checked={this.state.bgPhoto === photo1}
												onChange={this.handleChange}
											/>
											<img src={photo1} name="photo1" alt="" />
										</div>
										<div className="img-radio">
											<input
												type="radio"
												name="bgPhoto"
												id="choice-2"
												value={photo2}
												checked={this.state.bgPhoto === photo2}
												onChange={this.handleChange}
											/>
											<img src={photo2} name="photo2" alt="" />
										</div>
										<div className="img-radio">
											<input
												type="radio"
												name="bgPhoto"
												id="choice-3"
												value={photo3}
												checked={this.state.bgPhoto === photo3}
												onChange={this.handleChange}
											/>
											<img src={photo3} name="photo3" alt="" />
										</div>
										<div className="img-radio">
											<input
												type="radio"
												name="bgPhoto"
												id="choice-4"
												value={photo4}
												checked={this.state.bgPhoto === photo4}
												onChange={this.handleChange}
											/>
											<img src={photo4} name="photo4" alt="" />
										</div>
										<div className="img-radio">
											<input
												type="radio"
												name="bgPhoto"
												id="choice-5"
												value={photo5}
												checked={this.state.bgPhoto === photo5}
												onChange={this.handleChange}
											/>
											<img src={photo5} name="photo5" alt="" />
										</div>
										<div className="img-radio">
											<input
												type="radio"
												name="bgPhoto"
												id="choice-6"
												value={photo6}
												checked={this.state.bgPhoto === photo6}
												onChange={this.handleChange}
											/>
											<img src={photo6} name="photo6" alt="" />
										</div>
									</div>

									<label htmlFor="bgPhoto">Image</label>
								</div>
							</form>
						</div>
					)}

					<div className="right-group">
						{/* generated image */}
						{
							<div>
								<ImageGenerator
									name={this.state.name ? this.state.name : defaultName}
									location={this.state.location ? this.state.location : defaultLocation}
									file={this.state.file}
									blurb={this.state.blurb ? this.state.blurb : defaultBlurb}
									bgColor={this.state.bgColor}
									bgPhoto={this.state.bgPhoto}
								/>

								{/* download button */}
								<a
									href="#top"
									className="button"
									id="btn-download"
									download="myendorsement.png">
									Download
								</a>
							</div>
						}

						{/* social */}
						<div className="social">
							<a
									href="https://www.facebook.com/PaulaJean2020"
									target="_blank"
									rel="noopener noreferrer">
								<Facebook />
							</a>
							<a
								href="https://twitter.com/paulajean2020"
								target="_blank"
								rel="noopener noreferrer">
								<Twitter />
							</a>
							<a
								href="https://www.youtube.com/channel/UCS13Bc2abLkLym-7NkNOiRQ/"
								target="_blank"
								rel="noopener noreferrer">
								<YouTube />
							</a>
							<a
								href="https://www.instagram.com/paulajeanwv2020"
								target="_blank"
								rel="noopener noreferrer">
								<Instagram />
							</a>
							<p>
								If you like this, please follow me on social media — and say
								hello! And when you share your image include the hashtag{' '}
								<span className="bold">#IEndorsePaulaJean</span>.
							</p>
						</div>

						{/* donate */}
						<div className="donate">
							<p>
								Our campaign will <i>never</i> take corporate cash. Every single dollar counts.
							</p>
							<div className="donateButtons">
								<Grid container spacing={2}>
									<Grid item xs>
										<Button component={ Link } href="https://secure.actblue.com/donate/paula-jean-swearengin-2020?express_lane=true&amount=15&refcode=home-express_lane">
											$15
										</Button>
									</Grid>
									<Grid item xs>
										<Button component={ Link } href="https://secure.actblue.com/donate/paula-jean-swearengin-2020?express_lane=true&amount=27&refcode=home-express_lane">
											$27
										</Button>
									</Grid>
									<Grid item xs>
										<Button component={ Link } href="https://secure.actblue.com/donate/paula-jean-swearengin-2020?express_lane=true&amount=50&refcode=home-express_lane">
											$50
										</Button>
									</Grid>
									<Grid item xs>
										<Button component={ Link } href="https://secure.actblue.com/donate/paula-jean-swearengin-2020?express_lane=true&amount=100&refcode=home-express_lane">
											$100
										</Button>
									</Grid>
									<Grid item xs>
										<Button component={ Link } href="https://secure.actblue.com/donate/paula-jean-swearengin-2020?express_lane=true&amount=250&refcode=home-express_lane">
											$250
										</Button>
									</Grid>
									<Grid item xs>
										<Button component={ Link } href="https://secure.actblue.com/donate/paula-jean-swearengin-2020?express_lane=true&amount=500&refcode=home-express_lane">
											$500
										</Button>
									</Grid>
									<Grid item xs>
										<Button component={ Link } href="https://secure.actblue.com/donate/paula-jean-swearengin-2020?express_lane=true&amount=1000&refcode=home-express_lane">
											$1000
										</Button>
									</Grid>
									<Grid item xs>
										<Button component={ Link } href="https://secure.actblue.com/donate/paula-jean-swearengin-2020?express_lane_other=true&refcode=express_lane_other">
											OTHER
										</Button>
									</Grid>
								</Grid>
							</div>
							<p>
								If you've saved payment information with ActBlue Express, your donation will go through immediately.
							</p>
						</div>
					</div>
				</section>
				<footer className="App-footer">
					<img
						className="disclaimer"
						src={disclaimer}
						alt="Disclaimer"
					/>
				</footer>
			</div>
		);
	}
}

export default App;
