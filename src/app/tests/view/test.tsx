import * as React from "react";
import { ITest } from "../../test";

export interface IProps {
  test: ITest;
  className?: string;
  onClick?: () => void;
}

export default function TestItem(props: IProps) {
  return (
    <tr className={props.className} onClick={props.onClick}>
      <td>{props.test.date}</td>
    </tr>
  );
}
