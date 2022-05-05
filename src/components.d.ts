/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { Firestore } from "firebase/firestore";
import { Auth } from "firebase/auth";
import { AuthService, DatabaseService } from "@fireenjin/sdk";
export namespace Components {
    interface AppAdmin {
        "auth": Auth;
        "db": Firestore;
    }
    interface AppHome {
        "auth": AuthService;
        "db": DatabaseService;
    }
    interface AppList {
    }
    interface AppTournament {
        "auth": AuthService;
        "db": DatabaseService;
        "tournamentId": string;
        "userId": string;
    }
    interface AppTournamentList {
    }
    interface DbdTournamentCard {
        "dateTime": string;
        "href": string;
        "image": string;
        "name": string;
        "rules": string[];
    }
    interface DbdTournamentDetails {
        "dateTime": string;
        "db": DatabaseService;
        "image": string;
        "name": string;
        "rules": string[];
        "tournament": Tournament;
        "tournamentId": string;
    }
    interface DbdgroupRouter {
    }
    interface ModalLogin {
        "auth": AuthService;
    }
    interface ModalProfile {
        "auth": AuthService;
        "db": DatabaseService;
        "documentId": string;
        "headerTitle": string;
        "userId": string;
    }
    interface ModalSuccess {
    }
    interface ModalTournamentDetail {
        "db": DatabaseService;
        "rules": string[];
        "tournament": Tournament;
        "tournamentId": string;
    }
    interface ModalTournamentEdit {
        "mainTitle": "Create Tournament";
        "tournament": Tournament;
        "tournamentId": string;
    }
}
declare global {
    interface HTMLAppAdminElement extends Components.AppAdmin, HTMLStencilElement {
    }
    var HTMLAppAdminElement: {
        prototype: HTMLAppAdminElement;
        new (): HTMLAppAdminElement;
    };
    interface HTMLAppHomeElement extends Components.AppHome, HTMLStencilElement {
    }
    var HTMLAppHomeElement: {
        prototype: HTMLAppHomeElement;
        new (): HTMLAppHomeElement;
    };
    interface HTMLAppListElement extends Components.AppList, HTMLStencilElement {
    }
    var HTMLAppListElement: {
        prototype: HTMLAppListElement;
        new (): HTMLAppListElement;
    };
    interface HTMLAppTournamentElement extends Components.AppTournament, HTMLStencilElement {
    }
    var HTMLAppTournamentElement: {
        prototype: HTMLAppTournamentElement;
        new (): HTMLAppTournamentElement;
    };
    interface HTMLAppTournamentListElement extends Components.AppTournamentList, HTMLStencilElement {
    }
    var HTMLAppTournamentListElement: {
        prototype: HTMLAppTournamentListElement;
        new (): HTMLAppTournamentListElement;
    };
    interface HTMLDbdTournamentCardElement extends Components.DbdTournamentCard, HTMLStencilElement {
    }
    var HTMLDbdTournamentCardElement: {
        prototype: HTMLDbdTournamentCardElement;
        new (): HTMLDbdTournamentCardElement;
    };
    interface HTMLDbdTournamentDetailsElement extends Components.DbdTournamentDetails, HTMLStencilElement {
    }
    var HTMLDbdTournamentDetailsElement: {
        prototype: HTMLDbdTournamentDetailsElement;
        new (): HTMLDbdTournamentDetailsElement;
    };
    interface HTMLDbdgroupRouterElement extends Components.DbdgroupRouter, HTMLStencilElement {
    }
    var HTMLDbdgroupRouterElement: {
        prototype: HTMLDbdgroupRouterElement;
        new (): HTMLDbdgroupRouterElement;
    };
    interface HTMLModalLoginElement extends Components.ModalLogin, HTMLStencilElement {
    }
    var HTMLModalLoginElement: {
        prototype: HTMLModalLoginElement;
        new (): HTMLModalLoginElement;
    };
    interface HTMLModalProfileElement extends Components.ModalProfile, HTMLStencilElement {
    }
    var HTMLModalProfileElement: {
        prototype: HTMLModalProfileElement;
        new (): HTMLModalProfileElement;
    };
    interface HTMLModalSuccessElement extends Components.ModalSuccess, HTMLStencilElement {
    }
    var HTMLModalSuccessElement: {
        prototype: HTMLModalSuccessElement;
        new (): HTMLModalSuccessElement;
    };
    interface HTMLModalTournamentDetailElement extends Components.ModalTournamentDetail, HTMLStencilElement {
    }
    var HTMLModalTournamentDetailElement: {
        prototype: HTMLModalTournamentDetailElement;
        new (): HTMLModalTournamentDetailElement;
    };
    interface HTMLModalTournamentEditElement extends Components.ModalTournamentEdit, HTMLStencilElement {
    }
    var HTMLModalTournamentEditElement: {
        prototype: HTMLModalTournamentEditElement;
        new (): HTMLModalTournamentEditElement;
    };
    interface HTMLElementTagNameMap {
        "app-admin": HTMLAppAdminElement;
        "app-home": HTMLAppHomeElement;
        "app-list": HTMLAppListElement;
        "app-tournament": HTMLAppTournamentElement;
        "app-tournament-list": HTMLAppTournamentListElement;
        "dbd-tournament-card": HTMLDbdTournamentCardElement;
        "dbd-tournament-details": HTMLDbdTournamentDetailsElement;
        "dbdgroup-router": HTMLDbdgroupRouterElement;
        "modal-login": HTMLModalLoginElement;
        "modal-profile": HTMLModalProfileElement;
        "modal-success": HTMLModalSuccessElement;
        "modal-tournament-detail": HTMLModalTournamentDetailElement;
        "modal-tournament-edit": HTMLModalTournamentEditElement;
    }
}
declare namespace LocalJSX {
    interface AppAdmin {
        "auth"?: Auth;
        "db"?: Firestore;
    }
    interface AppHome {
        "auth"?: AuthService;
        "db"?: DatabaseService;
        "onDbdModalOpen"?: (event: CustomEvent<{
    component: string;
    componentProps?: any;
    cssClass?: string;
  }>) => void;
    }
    interface AppList {
    }
    interface AppTournament {
        "auth"?: AuthService;
        "db"?: DatabaseService;
        "onDbdModalOpen"?: (event: CustomEvent<any>) => void;
        "onDbdPopoverOpen"?: (event: CustomEvent<any>) => void;
        "tournamentId"?: string;
        "userId"?: string;
    }
    interface AppTournamentList {
    }
    interface DbdTournamentCard {
        "dateTime"?: string;
        "href"?: string;
        "image"?: string;
        "name"?: string;
        "rules"?: string[];
    }
    interface DbdTournamentDetails {
        "dateTime"?: string;
        "db"?: DatabaseService;
        "image"?: string;
        "name"?: string;
        "onDbdModalOpen"?: (event: CustomEvent<{
    component?: string;
    cssClass?: string;
    componentProps?: any;
  }>) => void;
        "onFireenjinShare"?: (event: CustomEvent<any>) => void;
        "rules"?: string[];
        "tournament"?: Tournament;
        "tournamentId"?: string;
    }
    interface DbdgroupRouter {
    }
    interface ModalLogin {
        "auth"?: AuthService;
    }
    interface ModalProfile {
        "auth"?: AuthService;
        "db"?: DatabaseService;
        "documentId"?: string;
        "headerTitle"?: string;
        "onDbdModalClose"?: (event: CustomEvent<any>) => void;
        "userId"?: string;
    }
    interface ModalSuccess {
    }
    interface ModalTournamentDetail {
        "db"?: DatabaseService;
        "onDbdModalClose"?: (event: CustomEvent<any>) => void;
        "rules"?: string[];
        "tournament"?: Tournament;
        "tournamentId"?: string;
    }
    interface ModalTournamentEdit {
        "mainTitle"?: "Create Tournament";
        "onDbdModalClose"?: (event: CustomEvent<any>) => void;
        "tournament"?: Tournament;
        "tournamentId"?: string;
    }
    interface IntrinsicElements {
        "app-admin": AppAdmin;
        "app-home": AppHome;
        "app-list": AppList;
        "app-tournament": AppTournament;
        "app-tournament-list": AppTournamentList;
        "dbd-tournament-card": DbdTournamentCard;
        "dbd-tournament-details": DbdTournamentDetails;
        "dbdgroup-router": DbdgroupRouter;
        "modal-login": ModalLogin;
        "modal-profile": ModalProfile;
        "modal-success": ModalSuccess;
        "modal-tournament-detail": ModalTournamentDetail;
        "modal-tournament-edit": ModalTournamentEdit;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "app-admin": LocalJSX.AppAdmin & JSXBase.HTMLAttributes<HTMLAppAdminElement>;
            "app-home": LocalJSX.AppHome & JSXBase.HTMLAttributes<HTMLAppHomeElement>;
            "app-list": LocalJSX.AppList & JSXBase.HTMLAttributes<HTMLAppListElement>;
            "app-tournament": LocalJSX.AppTournament & JSXBase.HTMLAttributes<HTMLAppTournamentElement>;
            "app-tournament-list": LocalJSX.AppTournamentList & JSXBase.HTMLAttributes<HTMLAppTournamentListElement>;
            "dbd-tournament-card": LocalJSX.DbdTournamentCard & JSXBase.HTMLAttributes<HTMLDbdTournamentCardElement>;
            "dbd-tournament-details": LocalJSX.DbdTournamentDetails & JSXBase.HTMLAttributes<HTMLDbdTournamentDetailsElement>;
            "dbdgroup-router": LocalJSX.DbdgroupRouter & JSXBase.HTMLAttributes<HTMLDbdgroupRouterElement>;
            "modal-login": LocalJSX.ModalLogin & JSXBase.HTMLAttributes<HTMLModalLoginElement>;
            "modal-profile": LocalJSX.ModalProfile & JSXBase.HTMLAttributes<HTMLModalProfileElement>;
            "modal-success": LocalJSX.ModalSuccess & JSXBase.HTMLAttributes<HTMLModalSuccessElement>;
            "modal-tournament-detail": LocalJSX.ModalTournamentDetail & JSXBase.HTMLAttributes<HTMLModalTournamentDetailElement>;
            "modal-tournament-edit": LocalJSX.ModalTournamentEdit & JSXBase.HTMLAttributes<HTMLModalTournamentEditElement>;
        }
    }
}
