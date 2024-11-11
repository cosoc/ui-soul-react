import {SMenuGen} from "@/components/SRMenu/SMenu/SMenuGen.ts";
import React, {ReactElement} from "react";


/**
 * 获取ui
 * @param DefaultUi 默认的ui
 * @param gen SMenuGen
 */
export const getUI = (DefaultUi: React.ComponentType<any>,  gen: SMenuGen ): ReactElement =>{
    let ui = gen?.ui;
    if (ui !== undefined) {
        return ui;
    }
    let uiProps =  gen?.uiProps;
    if (uiProps) {
        return <DefaultUi {...uiProps} />
    }
    return <DefaultUi />
}