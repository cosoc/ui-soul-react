import React, { useState } from "react";
import { SMenuContextType } from "@/components/SRMenu/SMenuProvider/SMenuContextModel.ts";
import { SMenuProviderProps } from "@/components/SRMenu/SMenuProvider/SMenuProviderProps.ts";

export const SMenuContext = React.createContext<SMenuContextType>({
    currentlyActiveNodePath: new Set<string>(),
    setCurrentlyActiveNodePath: () => {},
    currentlyExpandItemGroup: new Set<string>(),
    setCurrentlyExpandItemGroup: () => {},
    multipleSelect: false,
    setMultipleSelect: () => {},
    exclusiveExpand: false,
    setExclusiveExpand: () => {}
});

export const SMenuProvider = (props: SMenuProviderProps) => {
     // 当前激活的路径
    const [currentlyActiveNodePath, setCurrentlyActiveNodePath] = useState<Set<string>>(new Set());
    // 当前展开的选项组
    const [currentlyExpandItemGroup, setCurrentlyExpandItemGroup] = useState<Set<string>>(new Set());
    // 是否多选
    const [multipleSelect, setMultipleSelect] = useState<boolean>(false);
    // 是否互斥展开
    const [exclusiveExpand, setExclusiveExpand] = useState<boolean>(false);

    const value = {
        currentlyActiveNodePath,
        setCurrentlyActiveNodePath,
        currentlyExpandItemGroup,
        setCurrentlyExpandItemGroup,
        multipleSelect,
        setMultipleSelect,
        exclusiveExpand,
        setExclusiveExpand,
    };

    return (
        <SMenuContext.Provider value={value}>
            {props.children}
        </SMenuContext.Provider>
    );
};
