import { css } from "@emotion/react";
import TwoDimensionalDirection from "@/model/TwoDimensionalDirection.ts";

export interface SMenuItemGroupChildContainerDefaultStyleProps {
    itemGroupChildExpansionDirection?: TwoDimensionalDirection;
    itemGroupChildLayoutDirection?: TwoDimensionalDirection
}

export const SMenuItemGroupChildContainerDefaultStyle = ({
                                                             itemGroupChildExpansionDirection  = TwoDimensionalDirection.Bottom,
                                                             itemGroupChildLayoutDirection = TwoDimensionalDirection.Bottom}:SMenuItemGroupChildContainerDefaultStyleProps) => css`
    box-sizing: border-box;
    display: flex;
    flex-direction: ${
                    itemGroupChildLayoutDirection === "Bottom"
                    ? "column"
                    
                    : itemGroupChildLayoutDirection === "Top"
                    ? "column-reverse"
                    
                    : itemGroupChildLayoutDirection === "Left"
                    ? "row-reverse"
                    
                    :itemGroupChildLayoutDirection === "Right"
                    ? "row"
                    
                    : "column"};
    z-index: 10;
    width: 100%;
    position: ${
    itemGroupChildExpansionDirection === TwoDimensionalDirection.Bottom ||
    itemGroupChildExpansionDirection === TwoDimensionalDirection.Top
        ? "relative" 
        : "absolute"
    };

    // 下方显示
    ${itemGroupChildExpansionDirection === TwoDimensionalDirection.Bottom && `
        top: 100%;
        left: 0;
    `}
    
    // 上方显示
    ${itemGroupChildExpansionDirection === TwoDimensionalDirection.Top && `
        bottom: 100%; 
        left: 0;
    `}

    // 左侧显示
    ${itemGroupChildExpansionDirection === TwoDimensionalDirection.Left && `
        top: 0;
        right: ${itemGroupChildLayoutDirection === "Left" ? "100%" : "calc(100% + 5px)"};
    `}
    
    // 右侧显示
    ${itemGroupChildExpansionDirection === TwoDimensionalDirection.Right && `
        top: 0;
        left: ${itemGroupChildLayoutDirection === "Right" ? "100%" : "calc(100% + 5px)"};
    `}
    
`;
