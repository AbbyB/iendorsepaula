import React, { Component } from 'react';
import { Facebook, Twitter, YouTube, Instagram } from '@material-ui/icons';
import { ReactComponent as PaulaJeanLogo } from './icons/logo.svg';
import './App.scss';
import ImageGenerator from './ImageGenerator';
import html2canvas from 'html2canvas';
import fitty from 'fitty';

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
			showGeneratedImage: false,
			isIE: false,
		};
		this.handleChange = this.handleChange.bind(this);
		this.readFile = this.readFile.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
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

	handleSubmit(e) {
		e.preventDefault();

		// change name font-size to fit
		fitty('.name-output', { maxSize: 50 });

		this.setState(
			{
				...this.state,
				showGeneratedImage: true,
			},
			() => this.makeCanvas()
		);
	}

	makeCanvas() {
		let divImage = document.getElementById('generated-image');
		let button = document.getElementById('btn-download');
		const androidDevice = window.navigator.userAgent.indexOf('Android');

		// otherwise generated-image and button are hidden
		if (this.state.showGeneratedImage) {
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
			file: '/img/default.jpg',
			bgColor: 'purpleBg',
			bgPhoto: '/img/photo1.png',
			isIE: old_ie > -1 || new_ie > -1,
		});
	}

	render() {
		return (
			<div className="App">
				{/* header */}
				<header className="App-header">
					<PaulaJeanLogo />
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
							<form onSubmit={this.handleSubmit}>
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
									<label htmlFor="location">Job Title/Location</label>
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
											this.state.file === '/img/default.jpg'
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
										id="yellowBG"
										value="yellowBg"
										checked={this.state.bgColor === 'yellowBg'}
										onChange={this.handleChange}
									/>
									<input
										type="radio"
										name="bgColor"
										id="greenBG"
										value="greenBg"
										checked={this.state.bgColor === 'greenBg'}
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
												value="/img/photo1.png"
												checked={this.state.bgPhoto === '/img/photo1.png'}
												onChange={this.handleChange}
											/>
											<img src="/img/photo1.png" name="photo1" alt="" />
										</div>
										<div className="img-radio">
											<input
												type="radio"
												name="bgPhoto"
												id="choice-2"
												value="/img/photo2.jpg"
												checked={this.state.bgPhoto === '/img/photo2.jpg'}
												onChange={this.handleChange}
											/>
											<img src="/img/photo2.jpg" name="photo2" alt="" />
										</div>
										<div className="img-radio">
											<input
												type="radio"
												name="bgPhoto"
												id="choice-3"
												value="/img/photo3.jpg"
												checked={this.state.bgPhoto === '/img/photo3.jpg'}
												onChange={this.handleChange}
											/>
											<img src="/img/photo3.jpg" name="photo3" alt="" />
										</div>
									</div>

									<label htmlFor="bgPhoto">Image</label>
								</div>

								{/* submit */}
								<input type="submit" name="Generate!" />
							</form>
						</div>
					)}

					<div className="right-group">
						{/* generated image */}
						{this.state.showGeneratedImage ? (
							<div>
								<ImageGenerator
									name={this.state.name}
									location={this.state.location}
									file={this.state.file}
									blurb={this.state.blurb}
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
						) : (
							// example image
							<img className="example" src="/img/example.png" alt="example" />
						)}

						{/* social */}
						<div className="social">
							<a
									href="https://www.facebook.com/PaulaJean2020"
									target="_blank"
									rel="noopener noreferrer">
								<Facebook style={{ color: "black" }} />
							</a>
							<a
								href="https://twitter.com/paulajean2020"
								target="_blank"
								rel="noopener noreferrer">
								<Twitter style={{ color: "black" }} />
							</a>
							<a
								href="https://www.youtube.com/channel/UCS13Bc2abLkLym-7NkNOiRQ/"
								target="_blank"
								rel="noopener noreferrer">
								<YouTube style={{ color: "black" }} />
							</a>
							<a
								href="https://www.instagram.com/paulajeanwv2020"
								target="_blank"
								rel="noopener noreferrer">
								<Instagram style={{ color: "black" }} />
							</a>
							<p>
								If you like this, please follow me on social media — and say
								hello! And when you share your image include the hashtag{' '}
								<span className="bold">#IEndorsePaulaJean</span>.
							</p>
						</div>
					</div>
				</section>
				<footer className="App-footer">
					<img
						className="disclaimer"
						src="/img/disclaimer.png"
						alt="Disclaimer"
					/>
				</footer>
			</div>
		);
	}
}

export default App;
