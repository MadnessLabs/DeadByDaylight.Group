import { r as registerInstance, h, m as Host, n as getElement } from './index-a091ab89.js';

const kanbanCss = ".kanban-container{position:relative;box-sizing:border-box;width:auto}.kanban-container *{box-sizing:border-box}.kanban-container:after{clear:both;display:block;content:\"\"}.kanban-board{position:relative;float:left;background:#e2e4e6;transition:all 0.3s cubic-bezier(0.23, 1, 0.32, 1)}.kanban-board.disabled-board{opacity:0.3}.kanban-board.is-moving.gu-mirror{transform:rotate(3deg)}.kanban-board.is-moving.gu-mirror .kanban-drag{overflow:hidden;padding-right:50px}.kanban-board header{font-size:16px;padding:15px}.kanban-board header .kanban-title-board{font-weight:700;margin:0;padding:0;display:inline}.kanban-board header .kanban-title-button{float:right}.kanban-board .kanban-drag{min-height:200px;padding:20px}.kanban-board:after{clear:both;display:block;content:\"\"}.kanban-item{background:#fff;padding:15px;margin-bottom:20px;transition:all 0.3s cubic-bezier(0.23, 1, 0.32, 1)}.kanban-item:hover{cursor:move}.kanban-item:last-child{margin:0}.kanban-item.is-moving.gu-mirror{transform:rotate(3deg);height:auto !important}.gu-mirror{position:fixed !important;margin:0 !important;z-index:9999 !important}.gu-hide{display:none !important}.gu-unselectable{-webkit-user-select:none !important;-moz-user-select:none !important;-ms-user-select:none !important;user-select:none !important}.gu-transit{opacity:0.2 !important;transform:rotate(0deg) !important}.drag_handler{background:#fff;border-radius:50%;width:24px;height:24px;position:relative;float:left;top:-3px;margin-right:4px}.drag_handler:hover{cursor:move}.drag_handler_icon{position:relative;display:block;background:#000;width:24px;height:2px;top:12px;transition:.5s ease-in-out}.drag_handler_icon:before,.drag_handler_icon:after{background:#000;content:'';display:block;width:100%;height:100%;position:absolute;transition:.5s ease-in-out}.drag_handler_icon:before{top:6px}.drag_handler_icon:after{bottom:6px}fireenjin-kanban{position:relative}";

const Kanban = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  render() {
    return h(Host, null);
  }
  get kanbanEl() { return getElement(this); }
};
Kanban.style = kanbanCss;

export { Kanban as fireenjin_kanban };
