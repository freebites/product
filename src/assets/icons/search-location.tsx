import React from "react";
import Svg, { Path, G, Defs, ClipPath, Rect } from "react-native-svg";

const SearchLocation = () => (
<Svg width="18" height="21" viewBox="0 0 18 21" fill="none">
    <G clip-path="url(#clip0_5998_3250)">
        <Path
        d="M12 8.5C12 10.1569 10.6569 11.5 9 11.5C7.34315 11.5 6 10.1569 6 8.5C6 6.84315 7.34315 5.5 9 5.5C10.6569 5.5 12 6.84315 12 8.5Z"
        stroke="#0F172A"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        />
        <Path
        d="M16.5 8.5C16.5 15.6421 9 19.75 9 19.75C9 19.75 1.5 15.6421 1.5 8.5C1.5 4.35786 4.85786 1 9 1C13.1421 1 16.5 4.35786 16.5 8.5Z"
        stroke="#0F172A"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        />
    </G>
    <Defs>
        <ClipPath id="clip0_5998_3250">
        <Rect width="18" height="21" fill="white" />
        </ClipPath>
    </Defs>
</Svg>
);

export default SearchLocation;