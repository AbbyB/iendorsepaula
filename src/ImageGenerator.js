import React from 'react';

export default function ImageGenerator(props) {
  return (
    // <canvas id="canvas" >
    <div id="generated-image" className={props.bgColor}>
      {/* background image */}
      <img
        className="background"
        src={props.bgPhoto}
        alt="background"
        style={{ zIndex: 0 }}
      />

      {/* avatar */}
      <div className="avatar-container" style={{ zIndex: 4 }}>
        <img className="avatar" src={props.file} alt="avatar" />
      </div>

      {/* text */}
      <div className="text" style={{ zIndex: 5 }}>
        {props.location && <h3 className="location">{props.location}</h3>}

        {/* endorsement */}
        <div className="endorsement">
          <h2 className="name-output">{props.name}</h2>
          <h2>
            {' '}
            <i>endorses</i> Booker
          </h2>
        </div>

        <div className="blurb">
          <span className="quote-mark">“</span>
          <h3>{props.blurb}”</h3>
        </div>
      </div>

      {/* fine print */}
      <div className="fine-print">
        <p>
          Generated at IENDORSEBOOKER.COM{' '}
          <span className="bold">#IEndorseBooker</span>
        </p>
      </div>

      {/* background color */}
      <div className="background-color" style={{ zIndex: 1 }}></div>

      {/* color overlay */}
      <div className="overlay-color" style={{ zIndex: 2 }}></div>
    </div>
  );
}
