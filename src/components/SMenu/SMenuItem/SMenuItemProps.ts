import {ReactElement} from "react";
import {SMenuNodeStatus} from "@/components/SMenu/SMenuModel/SMenuNodeStatus.ts";
import {SMenuItemType} from "@/components/SMenu/SMenuModel/SMenuItemType.ts";

export interface SMenuItemProps {
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
    // 选项事件处理
    eventHand?: (itemKey: string, itemTypes: SMenuItemType, status: SMenuNodeStatus, itemDta: any) => void;
    // ui组件
    ui: ReactElement;
}
