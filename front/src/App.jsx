import React from "react";
import AppRoutes from "./Routes/Routes";
import { useEffect } from "react";
import store from "./Redux/store";
import { loadUser } from "./Redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";

const App = () => {
    const { user, loading } = useSelector((state) => state.auth);

    function lightenColor(hex, percent) {
        // Convert hex to RGB
        const num = parseInt(hex.slice(1), 16);
        const r = (num >> 16);
        const g = ((num >> 8) & 0x00ff);
        const b = (num & 0x0000ff);
    
        // Calculate the new RGB values by mixing with white
        const newR = Math.round(r + ((255 - r) * percent / 100));
        const newG = Math.round(g + ((255 - g) * percent / 100));
        const newB = Math.round(b + ((255 - b) * percent / 100));
    
        // Ensure RGB values are within the 0-255 range
        const finalR = Math.min(255, Math.max(0, newR));
        const finalG = Math.min(255, Math.max(0, newG));
        const finalB = Math.min(255, Math.max(0, newB));
    
        // Convert RGB back to hex
        return `#${(0x1000000 + (finalR << 16) + (finalG << 8) + finalB)
            .toString(16)
            .slice(1)}`;
    }

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadUser());
    }, []);

    let primaryColor;
    let secondaryColor;

    useEffect(() => {
        if (user && !loading) {
             primaryColor = user.colorPrimario || "#0256A4";
            const secondaryColor = lightenColor(primaryColor,85);

            document.body.style.setProperty("--primary-color", primaryColor);
            document.body.style.setProperty( "--secondary-color",   secondaryColor       );
        }
    }, [user, loading]);

    return (
        <div
            style={{
                "--primary-color": primaryColor,
                "--secondary-color": secondaryColor,
            }}
        >
            <AppRoutes />
        </div>
    );
};

export default App;
// var(--primary-color)
