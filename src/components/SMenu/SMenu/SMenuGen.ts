import {ReactElement} from "react";
import {SMenuItemConfig} from "@/components/SMenu/SMenuItem/SMenuItemConfig.ts";
import {SMenuItemGroupConfig} from "@/components/SMenu/SMenuItemGroup/SMenuItemGroupConfig.ts";

// 菜单生成
export interface SMenuGen {
    // 唯一key
    itemKey: string;
    // 携带的数据
    itemDta?: any;
    // 是否禁用
    disabled?: boolean;
    // 选项可用需要的权限
    permissions?: string[];
    // ui组件
    ui?: ReactElement;
    // ui要传递的属性
    uiProps?: Object;
    // 选项配置
    nodeConfig?: SMenuItemGroupConfig | SMenuItemConfig;
    // 如果是选项组需要传入children
    children?: Array<SMenuGen>;
}
