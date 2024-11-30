import {SMenuItemType} from "@/components/SMenu/SMenuModel/SMenuItemType.ts";
import {SMenuGen} from "@/components/SMenu/SMenu/SMenuGen.ts";
import {SMenuNodeStatus} from "@/components/SMenu/SMenuModel/SMenuNodeStatus.ts";
import React, {CSSProperties} from "react";
import TwoDimensionalDirection from "@/model/TwoDimensionalDirection.ts";

// 菜单组件参数
export interface SMenuProps {
    // 选项被点击
    eventHand?: (event: React.MouseEvent, itemKey: string, itemTypes: SMenuItemType, status: SMenuNodeStatus, itemDta: any) => void;
    // 菜单节点列表
    menuNodes: Array<SMenuGen>;
    // 选项默认使用的组件,如果选项设置了自己的UI将被忽略
    defaultItemUI: React.ComponentType<any>;
    // 选项组默认使用的组件,如果选项设置了自己的UI将被忽略
    defaultItemGroupUI: React.ComponentType<any>;
    // 获取菜单拥有的权限池
    getPermissionPool?: () => Promise<Array<string>>;
    // 菜单容器样式
    style?: CSSProperties;
    // 选项组子节点展开方方向
    itemGroupChildExpansionDirection?: TwoDimensionalDirection;
    // 选项组子节点布局方向
    itemGroupChildLayoutDirection?: TwoDimensionalDirection;
    // 选项组容器样式
    itemGroupContainerStyle?: CSSProperties;
    // 选项组子节点容器样式
    itemGroupChildContainerStyle?: CSSProperties;
}
