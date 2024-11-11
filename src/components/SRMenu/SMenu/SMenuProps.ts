import {SMenuItemType} from "@/components/SRMenu/SMenuModel/SMenuItemType.ts";
import {SMenuGen} from "@/components/SRMenu/SMenu/SMenuGen.ts";
import {SMenuNodeStatus} from "@/components/SRMenu/SMenuModel/SMenuNodeStatus.ts";
import React, {CSSProperties} from "react";

// 菜单组件参数
export interface SMenuProps {
    // 选项被点击
    eventHand?: (itemKey: string, itemTypes: SMenuItemType, status: SMenuNodeStatus, itemDta: any) => void;
    // 菜单节点列表
    menuNodes: Array<SMenuGen>;
    // 选项默认使用的组件,如果选项设置了自己的UI将被忽略
    defaultItemUI: React.ComponentType<any>;
    // 选项组默认使用的组件,如果选项设置了自己的UI将被忽略
    defaultItemGroupUI: React.ComponentType<any>;
    // 获取菜单拥有的权限池
    getPermissionPool?: () => Promise<Array<string>>;
    // 样式
    style?: CSSProperties | undefined;
}
