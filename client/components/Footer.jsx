import React from 'react'
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from "mdb-react-ui-kit";

function Footer() {
  return (  
    <MDBFooter
    bgColor="headOrange"
    className="text-center text-lg-start text-white border-top"
    >
    <section className="">
    <MDBContainer className="text-center text-md-start mt-5">
        <MDBRow className="mt-3">
        <MDBCol md="3" lg="4" xl="3" className="mx-auto mb-4 ">
            <h6 className="text-uppercase fw-bold mb-4">
                <img src='https://raw.githubusercontent.com/cheblankenshipUTD/ml-dataset/main/img/Footer%20Logo.png' alt="logo" />
            </h6>
            <p>
            UTD TUTOR mission is to provide students a way to get help
            from and to help other students.
            </p>
        </MDBCol>
        <MDBCol md="2" lg="2" xl="2" className="mx-auto mb-4">
            <h6 className="text-uppercase fw-bold mb-4">Support</h6>
            <p>
                <a href="#!" className="text-reset">
                    Contact Us
                </a>
            </p>
            <p>
                <a href="#!" className="text-reset">
                    Suggestions
                </a>
            </p>
            <p>
                <a href="#!" className="text-reset">
                    Tutoring Tips
                </a>
            </p>
            <p>
                <a href="#!" className="text-reset">
                    Report
                </a>
            </p>
        </MDBCol>

        <MDBCol md="3" lg="2" xl="2" className="mx-auto mb-4">
        <h6 className="text-uppercase fw-bold mb-4">About Us</h6>
        <p>
            <a href="#!" className="text-reset">
            Our Story
            </a>
        </p>
        <p>
            <a href="#!" className="text-reset">
            Blog
            </a>
        </p>
        <p>
            <a href="#!" className="text-reset">
            News
            </a>
        </p>
        <p>
            <a href="#!" className="text-reset">
            Help
            </a>
        </p>
        </MDBCol>
  </MDBRow>
</MDBContainer>
</section>

    <div
        className="text-center p-4"
        style={{ backgroundColor: "#C9803C" }}
    >
    © 2023 UTD TUTOR. All Rights Reserved.
</div>
</MDBFooter>
    )
}

export default Footer