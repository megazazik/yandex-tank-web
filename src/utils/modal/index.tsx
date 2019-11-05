import * as React from "react";

declare const $: any;

export interface IProps {
  labelId: string;
  title: string;
  onConfirm: () => void;
  onClose: () => void;
  isOpen: boolean;
}

export default (props: React.PropsWithChildren<IProps>) => {
  const isOpen = React.useRef<boolean>(false);
  const buttonRef = React.useRef<HTMLButtonElement>();
  const modalRef = React.useRef<HTMLDivElement>();

  React.useLayoutEffect(() => {
    const onClick = (ev: MouseEvent) => {
      props.onConfirm();
      ev.preventDefault();
      ev.stopPropagation();
    };
    buttonRef.current.addEventListener("click", onClick, { capture: true });

    return () => {
      buttonRef.current.removeEventListener("click", onClick, {
        capture: true
      });
    };
  }, [props.onConfirm]);

  React.useEffect(() => {
    if (props.isOpen === isOpen.current) {
      return undefined;
    }

    isOpen.current = props.isOpen;
    if (props.isOpen) {
      $(modalRef.current).modal("show");
      const onHide = () => {
        props.onClose();
        return false;
      };

      $(modalRef.current).on("hide.bs.modal", onHide);

      return () => {
        $(modalRef.current).off("hide.bs.modal", onHide);
      };
    } else {
      $(modalRef.current).modal("hide");
    }

    return undefined;
  }, [props.onClose, props.isOpen, modalRef.current]);

  return (
    <div
      className="modal fade"
      tabIndex={-1}
      role="dialog"
      aria-labelledby={props.labelId}
      aria-hidden="false"
      ref={modalRef}
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id={props.labelId}>
              {props.title}
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">{props.children}</div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
            >
              Закрыть
            </button>
            <button
              type="button"
              className="btn btn-primary"
              data-dismiss="modal"
              ref={buttonRef}
            >
              Ok
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
