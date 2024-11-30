import TwoDimensionalDirection from "@/model/TwoDimensionalDirection.ts";
import {CSSProperties} from "react";

export interface SMenuItemGroupConfig {
    // 选项组子节点展开方方向
    itemGroupChildExpansionDirection?: TwoDimensionalDirection
    // 选项组子节点布局方向
    itemGroupChildLayoutDirection?: TwoDimensionalDirection
    // 选项组容器样式
    itemGroupContainerStyle?: CSSProperties
    // 选项组子节点容器样式
    itemGroupChildContainerStyle?: CSSProperties
}
