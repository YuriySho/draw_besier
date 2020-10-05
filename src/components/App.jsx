import React, { useState } from 'react';
import _ from 'lodash';

import '../styles/App.scss';

const App = () => {
  const [controlPoint1, setControlPoint1] = useState({});
  const [controlPoint2, setControlPoint2] = useState({});

  const handleChange1 = ({ target }) => {
    const axis = target.placeholder;
    setControlPoint1({ ...controlPoint1, [axis]: target.value });
  };

  const handleChange2 = ({ target }) => {
    const axis = target.placeholder;
    setControlPoint2({ ...controlPoint2, [axis]: target.value });
  };

  const [circles, setCircles] = useState([]);

  const [paths, setPathLine] = useState([]);

  const handleDraw = (e) => {
    e.preventDefault();
    setPathLine([...paths,
      {
        id: _.uniqueId(),
        d: `M${controlPoint1.x} ${controlPoint1.y} L ${controlPoint2.x} ${controlPoint2.y}`,
        stroke: '#369',
        fill: 'transparent',
        strokewidth: '2',
      },
    ]);
    setCircles([...circles,
      {
        id: _.uniqueId(),
        cx: `${controlPoint1.x}`,
        cy: `${controlPoint1.y}`,
        r: '3',
        stroke: 'transparent',
        fill: '#f63',
        strokewidth: '1',
      },
      {
        id: _.uniqueId(),
        cx: `${controlPoint2.x}`,
        cy: `${controlPoint2.y}`,
        r: '3',
        stroke: 'transparent',
        fill: '#f63',
        strokewidth: '1',
      },
    ]);
    const form = document.getElementById('formCreateLine');
    form.reset();
  };

  const handleClear = () => {
    setPathLine([]);
    setCircles([]);
    setControlPoint2([]);
  };

  const handleRemoveLastLine = () => {
    setPathLine(() => {
      const withoutLastLine = paths.slice(0, paths.length - 1);
      return withoutLastLine;
    });

    setCircles(() => {
      const withoutLastCircles = circles.slice(0, circles.length - 2);
      return withoutLastCircles;
    });
  };

  const renderLastPoint = () => {
    const lastPoint = _.last(circles);
    return `Last point: x(${lastPoint.cx}), y(${lastPoint.cy})`;
  };

  const renderPath = () => paths.map(({
    id, d, stroke, fill, strokewidth,
  }) => (
    <path id={id} key={id} d={d} stroke={stroke} fill={fill} strokeWidth={strokewidth} />
  ));

  const renderCircles = () => circles.map(({
    id, cx, cy, r, stroke, fill, strokewidth,
  }) => (
    <circle
      id={id}
      key={id}
      cx={cx}
      cy={cy}
      r={r}
      stroke={stroke}
      fill={fill}
      strokeWidth={strokewidth}
    />
  ));

  return (
    <div className="container container-fluid h-100 mt-5">
      <div className="row h-100">
        <aside className="col-6 col-md-4 col-lg-3 mt-2">
          <p className="text d-flex justify-content-center">Create line</p>
          <form onSubmit={handleDraw} id="formCreateLine">
            <div className="form-group">
              <div className="input-group mb-2">
                <div className="input-group-prepead">
                  <span className="input-group-text">Point 1</span>
                </div>
                <input onChange={handleChange1} type="number" className="form-control" placeholder="x" />
                <input onChange={handleChange1} type="number" className="form-control" placeholder="y" />
              </div>
              <div className="input-group mb-2">
                <div className="input-group-prepead">
                  <span className="input-group-text">Point 2</span>
                </div>
                <input onChange={handleChange2} type="number" className="form-control" placeholder="x" />
                <input onChange={handleChange2} type="number" className="form-control" placeholder="y" />
              </div>
              <button type="submit" className="btn btn-primary">Draw</button>
            </div>
          </form>
          <button onClick={handleRemoveLastLine} className="btn btn-outline-secondary d-flex mb-2">Remove last line</button>
          <button onClick={handleClear} className="btn btn-info d-flex mb-2">Clear</button>
          {
            circles.length !== 0 && (
              <span className="text">{renderLastPoint()}</span>
            )
          }
        </aside>
        <main className="col">
          <div className="h-75">
            <svg className="w-100 h-100 border border-dark">
              {renderPath()}
              {renderCircles()}
            </svg>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
