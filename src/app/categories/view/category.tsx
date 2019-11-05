import * as React from "react";
import { ICategory } from "../../category";

export interface IProps {
  category: ICategory;
  className?: string;
  onClick?: () => void;
  onDoubleClick?: () => void;
}

export default function CategoryItem(props: IProps) {
  return (
    <tr
      className={props.className}
      onClick={props.onClick}
      onDoubleClick={props.onDoubleClick}
    >
      <td>{props.category.name}</td>
    </tr>
  );
}
