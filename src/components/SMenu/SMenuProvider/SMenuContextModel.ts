import React from "react";

export interface SMenuContextType {
    // 当前激活的路径
    currentlyActiveNodePath: Set<string>;
    setCurrentlyActiveNodePath: React.Dispatch<React.SetStateAction<Set<string>>>;
    // 当前展开的选项组
    currentlyExpandItemGroup: Set<string>;
    setCurrentlyExpandItemGroup: React.Dispatch<React.SetStateAction<Set<string>>>;
    // 是否多选，默认false
    multipleSelect: boolean;
    setMultipleSelect: React.Dispatch<React.SetStateAction<boolean>>;
    // 是否互斥展开，默认false
    exclusiveExpand: boolean;
    setExclusiveExpand: React.Dispatch<React.SetStateAction<boolean>>;
}