import React, { useState } from "react";

import { MdFullscreen, MdFullscreenExit } from "react-icons/md";

export const FullScreen = () => {
    const [isFullScreen, setisFullScreen] = useState(false);
    
    const click = () => {
        
        let midocumento = document.documentElement;

        setisFullScreen(!isFullScreen);

        if (isFullScreen === false ) {
            if (midocumento.requestFullscreen) {
                midocumento.requestFullscreen();
            } else if (midocumento.msrequestFullscreen) {
                midocumento.msrequestFullscreen();
            } else if (midocumento.mozrequestFullscreen) {
                midocumento.mozrequestFullscreen();
            } else if (midocumento.webkitrequestFullscreen) {
                midocumento.webkitrequestFullscreen();
            }
    
        }
    
        if(isFullScreen === true) {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.msexitFullscreen) {
                document.msexitFullscreen();
            } else if (document.mozexitFullscreen) {
                document.mozexitFullscreen();
            } else if (document.webkitexitFullscreen) {
                document.webkitexitFullscreen();
            }
        }

    };

  

    return (
        <div
            className=" hidden hover:scale-105 duration-200 transition-all hover:bg-blue-50 rounded-full p-1 lg:fixed bottom-8 right-8 lg:flex flex-col items-center cursor-pointer"
            onClick={click}
        >
            {isFullScreen ? (
                <MdFullscreenExit size={22} className="fill-primario"/>
            ) : (
                <MdFullscreen size={22} className="fill-primario" />
            )}

        </div>
    );
};
