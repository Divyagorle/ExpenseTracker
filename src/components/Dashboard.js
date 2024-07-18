import React from 'react';

const Dashboard = () => {
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Profile</h5>
              <p className="card-text">User information goes here.</p>
              <a href="#!" className="btn btn-primary">Edit Profile</a>
            </div>
          </div>
        </div>
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Recent Activities</h5>
              <p className="card-text">List of recent activities or data visualization.</p>
              <a href="#!" className="btn btn-primary">View All</a>
            </div>
          </div>
          <div className="card mt-3">
            <div className="card-body">
              <h5 className="card-title">Statistics</h5>
              <p className="card-text">Statistics or charts go here.</p>
              <a href="#!" className="btn btn-primary">View Details</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
