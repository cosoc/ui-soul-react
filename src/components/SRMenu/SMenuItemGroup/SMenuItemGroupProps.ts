import {ReactElement} from "react";
import {SMenuGen} from "@/components/SRMenu/SMenu/SMenuGen.ts";
import {SMenuItemType} from "@/components/SRMenu/SMenuModel/SMenuItemType.ts";
import {SMenuNodeStatus} from "@/components/SRMenu/SMenuModel/SMenuNodeStatus.ts";

export interface SMenuItemGroupProps {
    // 唯一key
    itemKey: string;
    // 层级
    level: number;
    // 父节点
    parentNodeItemKey: string | undefined;
    // 路径节点
    nodePath: Set<string>;
    // 携带的数据
    itemDta?: any;
    // 是否禁用
    disabled?: boolean;
    // 子菜单选项
    eventHand?: (itemKey: string, itemTypes: SMenuItemType, status: SMenuNodeStatus, itemDta: any) => void;
    // 选项
    menuItems?: Array<SMenuGen>;
    // ui组件
    ui: ReactElement;
}
