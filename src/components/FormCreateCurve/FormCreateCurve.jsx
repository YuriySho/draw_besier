import React from 'react';

const FormCreateCurve = () => {
  return (
    <div className="form-group">
      <div className="input-group mb-2">
        <div className="input-group-prepead">
          <span className="input-group-text">Point 1</span>
        </div>
        <input type="number" className="form-control" placeholder="x" />
        <input type="number" className="form-control" placeholder="y" />
      </div>
      <div className="input-group mb-2">
        <div className="input-group-prepead">
          <span className="input-group-text">Point 2</span>
        </div>
        <input type="number" className="form-control" placeholder="x" />
        <input type="number" className="form-control" placeholder="y" />
      </div>
      <div className="input-group mb-2">
        <div className="input-group-prepead">
          <span className="input-group-text">Point 3</span>
        </div>
        <input type="number" className="form-control" placeholder="x" />
        <input type="number" className="form-control" placeholder="y" />
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
    </div>
  );
};

export default FormCreateCurve;