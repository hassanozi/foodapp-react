import React from 'react';
import logo from '../../../assets/images/logo.png';
import styles from './NotFound.module.css';
import robot from '../../../assets/images/robot.png';

export default function NotFound() {


  
  return (
    <section className={styles.notFoundWrapper}>
      <div className="container-fluid h-100">
        <div className="row h-100">

          
          <div className="col-md-6 d-flex flex-column justify-content-center px-5">
            <img src={logo} alt="Logo" className="mb-4 w-50" />

            <h1 className="fw-bold mt-5">Oops....</h1>
            <h2 className="text-success">Page not found</h2>
            <h2 className="text-success">...</h2>
            <p className="my-3">
              This Page doesn’t exist or was removed!
              We suggest you go back to home.
            </p>

            <a href="/dashboard" className="btn btn-success w-25">
              Go to Homepage
            </a>
          </div>

          {/* RIGHT SIDE */}
          <div className={`col-md-6 ${styles.rightSide}`}>
            <img src={robot} alt="Robot" className={styles.robotImage} />
          </div>

        </div>
      </div>
    </section>
  );
}
