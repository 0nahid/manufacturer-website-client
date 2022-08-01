import React from 'react';
import { BsFacebook, BsInstagram, BsTwitter } from "react-icons/bs";
import { GiPegasus } from "react-icons/gi";
import wave from './wave.svg';
export default function Footer() {
    return (
        <div style={{
            backgroundImage: `url(${wave})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
        }}>
            <footer className="footer footer-center p-10  text-primary-content">
                <div>
                    <GiPegasus className="h-16 w-16" />
                    <p className="font-bold">
                        Car Parts BD Ltd. <br />Providing reliable parts since 2022
                    </p>
                    <p>Copyright © 2022 - All right reserved</p>
                </div>
                <div>
                    <div className="grid grid-flow-col gap-4">
                        <BsFacebook className="w-6 h-6" />
                        <BsTwitter className="w-6 h-6" />
                        <BsInstagram className="w-6 h-6" />
                    </div>
                </div>
            </footer>
        </div>
    )
}
