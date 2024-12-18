import { SMenuProvider} from "@/components/SMenu/SMenuProvider/SMenuProvider";
import {SMenuProps} from "@/components/SMenu/SMenu/SMenuProps.ts";
import {SMenuItem} from "@/components/SMenu/SMenuItem";
import {SMenuItemGroup} from "@/components/SMenu/SMenuItemGroup";
import {SMenuItemType} from "@/components/SMenu/SMenuModel/SMenuItemType";
import {SMenuNodeStatus} from "@/components/SMenu/SMenuModel/SMenuNodeStatus";
import {SMenuGen} from "@/components/SMenu/SMenu/SMenuGen.ts";
import {isIncludesPermissions} from "@/components/SMenu/SMenuUtils/permissionUtils.ts";
import React, { useEffect, useState} from "react";
import {getUI} from "@/components/SMenu/SMenuUtils/sMenuUtils.tsx";

export const SMenu = (props: SMenuProps)=> {

    const { menuNodes,
        style,
        getPermissionPool,
        defaultItemUI,
        defaultItemGroupUI,
        itemGroupChildExpansionDirection,
        itemGroupChildLayoutDirection,
        itemGroupContainerStyle,
        itemGroupChildContainerStyle
    }  = props;
    const [ nods, setNodes]  = useState<Array<SMenuGen>>([]);

    const childrenEventHand = (event:React.MouseEvent,itemKey: string, itemType: SMenuItemType, status: SMenuNodeStatus, itemDta: any) => {
        props?.eventHandler?.(event,itemKey, itemType,status,itemDta);
    }


    /**
     * 权限预处理
     * 如果权限池没有指定或者为空： 所有指定权限的项被移除
     * 如果权限池存在：如果选择有权限指定将检查权限，如果没有指定则会保留
     * @param pool 权限池
     * @param nodes 节点
     */
    const permissionsPretreatment = (pool: Array<string> | undefined, nodes: Array<SMenuGen>) => {
        if (pool == undefined) {
            for (let i = 0; i < nodes.length; i++) {
               let item =  nodes[i];
               if (item.children) {
                   permissionsPretreatment(pool,item.children);
               }else {
                   // 删除有权限的项,因为没有权限池无法校验，默认不显示
                   if (item.permissions && item?.permissions?.length > 0) {
                       nodes.splice(i, 1); // 删除当前元素
                       i--; // 调整索引，以免跳过下一个元素
                   }
               }
            }
        }else {
            for (let i = 0; i < nodes.length; i++) {
                let item =  nodes[i];
                if (item.children) {
                    permissionsPretreatment(pool,item.children);
                }else {
                    if (item.permissions && item?.permissions?.length > 0 && !isIncludesPermissions(pool, item.permissions)) {
                        nodes.splice(i, 1); // 删除当前元素
                        i--; // 调整索引，以免跳过下一个元素
                    }
                }
            }
        }
    }

    /**
     * 如果选项指定了ui则使用指定的ui
     * 如果没有指定使用全局指定的ui
     * @param nodes 节点
     */
    const uiPretreatment = (nodes: Array<SMenuGen>) => {
        for (let node of nodes) {
            if (node.children) {
                node.ui = getUI(defaultItemGroupUI,node);
                uiPretreatment(node.children);
            }else {
                node.ui = getUI(defaultItemUI,node);
            }
        }
    }

    /**
     * 预处理默认参数
     * @param nodes
     */
    const defaultValuePretreatment = (nodes: Array<SMenuGen>) => {
        for (let node of nodes) {
            if (node.children) {
                if (!node.nodeConfig) {
                    node.nodeConfig = {
                        itemGroupChildExpansionDirection: itemGroupChildExpansionDirection,
                        itemGroupChildLayoutDirection: itemGroupChildLayoutDirection,
                        itemGroupContainerStyle: itemGroupContainerStyle,
                        itemGroupChildContainerStyle: itemGroupChildContainerStyle
                    }
                }
                defaultValuePretreatment(node.children);
            }else {
                if (!node.nodeConfig) {
                    node.nodeConfig = {
                        itemGroupChildExpansionDirection: itemGroupChildExpansionDirection,
                        itemGroupChildLayoutDirection: itemGroupChildLayoutDirection
                    }
                }
            }
        }
    }

    /**
     * 节点预处理
     * 处理权限
     * 处理ui
     */
    const menuNodesPretreatment = async () => {

        // 权限预处理
        const pool = await getPermissionPool?.();
        let nodes =  Object.assign([],menuNodes);
        permissionsPretreatment(pool,nodes);
        // 处理默认值
        defaultValuePretreatment(nodes);
        // ui预处理
        // 处理ui,如果用户特定选项提供了ui则使用他提供的ui
        // 并且会忽略uiProps
        // 如果用户没有给定ui,那么使用指定默认的ui,并且吧uiPros传入组件
        uiPretreatment(nodes);
        setNodes(nodes);
    }

    useEffect(() => {
        menuNodesPretreatment().then();
    }, [menuNodes]);

    return (
        <SMenuProvider>
            <div style={style}>
                {
                    nods?.map(item => {
                        if (item.children) {
                            return <SMenuItemGroup
                                        key={item.itemKey}
                                        level={0}
                                        itemKey={item.itemKey}
                                        parentNodeItemKey={undefined}
                                        nodePath={new Set<string>().add(item.itemKey)}
                                        itemDta={item.itemDta}
                                        disabled={item.disabled}
                                        eventHandler={childrenEventHand}
                                        menuItems={item.children}
                                        nodeConfig={item.nodeConfig}
                                        ui={item.ui as any}
                                    />
                        }
                        return <SMenuItem
                                    key={item.itemKey}
                                    level={0}
                                    itemKey={item.itemKey}
                                    parentNodeItemKey={undefined}
                                    nodePath={new Set<string>().add(item.itemKey)}
                                    itemDta={item.itemDta}
                                    disabled={item.disabled}
                                    eventHandler={childrenEventHand}
                                    nodeConfig={item.nodeConfig}
                                    ui={item.ui as any}
                                />
                    })
                }
            </div>
        </SMenuProvider>
    )
}
