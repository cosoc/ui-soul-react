import React, {ReactElement} from "react";
import {SMenuNodeStatus} from "@/components/SMenu/SMenuModel/SMenuNodeStatus.ts";
import {SMenuItemType} from "@/components/SMenu/SMenuModel/SMenuItemType.ts";
import {SMenuItemGroupConfig} from "@/components/SMenu/SMenuItemGroup/SMenuItemGroupConfig.ts";
import {SMenuItemConfig} from "@/components/SMenu/SMenuItem/SMenuItemConfig.ts";

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
    eventHandler?: (event: React.MouseEvent, itemKey: string, itemTypes: SMenuItemType, status: SMenuNodeStatus, itemDta: any) => void;
    // ui组件
    ui: ReactElement;
    // 选项配置
    nodeConfig?: SMenuItemGroupConfig | SMenuItemConfig;
}
