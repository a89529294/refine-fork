import {
    Action,
    IResourceItem,
    useParsed,
    useTranslate,
} from "@refinedev/core";
import React, { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import { generateDefaultDocumentTitle } from "@refinedev/core";

type Props = {
    handler?: (options: {
        resource?: IResourceItem;
        action?: Action;
        params?: Record<string, string | undefined>;
        pathname?: string;
        autoGeneratedTitle: string;
    }) => string;
};

export function DocumentTitleHandler({ handler }: Props) {
    const location = useLocation();
    const { action, id, params, pathname, resource } = useParsed();
    const translate = useTranslate();

    useLayoutEffect(() => {
        const autoGeneratedTitle = generateDefaultDocumentTitle(
            translate,
            resource!,
            action,
            id + "",
        );
        if (handler) {
            document.title = handler({
                action,
                resource,
                params,
                pathname,
                autoGeneratedTitle,
            });
        } else {
            document.title = autoGeneratedTitle;
        }
    }, [location]);

    return <></>;
}
