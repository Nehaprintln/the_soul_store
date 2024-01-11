import React from 'react'
import './Footer.css';

export default function Footer() {
  return (
    <div className='footer-section'>
        <hr />
        <div className='footer-title'>
        HOMEGROWN INDIAN BRAND
        </div>
        <div className='footer-customers'>
        Over <span>6 Million</span> Happy Customers
        </div>
        <div className='footer-info'>
            <table>
                <thead>
                    <tr>
                    <th>NEED HELP</th>
                    <th>COMPANY</th>
                    <th>MORE INFO</th>
                    <th>STORE NEAR ME</th>
                    
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td>Contact Us</td>
                    <td>About us</td>
                    <td>T & C</td>
                    <td>Bandra</td>
                    </tr>
                    <tr>
                    <td>Track Order</td>
                    <td>Careers</td>
                    <td>Privacy Policy</td>
                    <td>Thane</td>
                    </tr>
                    <tr>
                    <td>Return & Refunds</td>
                    <td>Community Initiatives</td>
                    <td>Sitemap</td>
                    <td>Colaba</td>
                    </tr>
                    <tr>
                    <td></td>
                    <td></td>
                    <td>Location</td>
                    <td>Jaipur</td>
                    </tr>
                    <tr>
                    <td></td>
                    <td></td>
                    <td ></td>
                    <td>Chennai</td>
                    </tr>
                    <tr>
                    <td></td>
                    <td></td>
                    <td ></td>
                    <td>Pune</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div className='footer-details'>
            <p> The Souled Store 2024-25</p>
        </div>
    </div>
  )
}
