import React, { Component } from "react";

class Homepage extends Component {
  render() {
    return (
      <div id="booking" class="section">
        <div class="section-center">
          <div class="container">
            <div class="row">
              <div class="booking-form">
                <div class="form-header">
                  <h1>Book a car</h1>
                </div>
                <form>
                  <div class="form-group">
                    <span class="form-label">Pickup Location</span>
                    <input
                      class="form-control"
                      type="text"
                      placeholder="Enter Location"
                    />
                  </div>
                  <div class="form-group">
                    <span class="form-label">Destination</span>
                    <input
                      class="form-control"
                      type="text"
                      placeholder="Enter ZIP/Location"
                    />
                  </div>
                  <div class="row">
                    <div class="col-sm-5">
                      <div class="form-group">
                        <span class="form-label">Pickup Date</span>
                        <input class="form-control" type="date" required />
                      </div>
                    </div>
                    <div class="col-sm-5">
                      <div class="form-group">
                        <span class="form-label">Return Date</span>
                        <input class="form-control" type="date" required />
                      </div>
                    </div>
                  </div>

                  <div class="form-btn">
                    <button class="submit-btn">Book Now</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Homepage;
