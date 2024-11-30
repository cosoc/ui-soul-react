import {SMenuItemGroupConfig} from "@/components/SMenu/SMenuItemGroup/SMenuItemGroupConfig.ts";

export interface SMenuItemGroupUISoulProps {
    // 唯一key
    itemKey: string;
    // 层级
    level: number;
    // 是否展开
    isExpand: boolean;
    // 是否激活
    isActivated: boolean;
    // 携带的数据
    itemDta?: any;
    // 是否禁用
    disabled?: boolean;
    // 选项配置
    nodeConfig?: SMenuItemGroupConfig;
}
