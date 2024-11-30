import { css } from "@emotion/react";
import TwoDimensionalDirection from "@/model/TwoDimensionalDirection.ts";

export interface SMenuItemGroupContainerDefaultStyleProps {
    itemGroupChildExpansionDirection?: TwoDimensionalDirection;
}

export const SMenuItemGroupContainerDefaultStyle = ({itemGroupChildExpansionDirection}: SMenuItemGroupContainerDefaultStyleProps ) => css`
    display: flex;
    flex-wrap: wrap;
    position: relative;
    box-sizing: border-box;
    flex-shrink: 0;
    width: 100%;
    flex-direction: ${
            itemGroupChildExpansionDirection === "Bottom"
            ? "column"
             
            : itemGroupChildExpansionDirection === "Top"
            ? "column-reverse"
             
            : itemGroupChildExpansionDirection === "Left"
            ? "row-reverse"

            :itemGroupChildExpansionDirection === "Right"
            ? "row" 
                                    
            : "column"};
`;
