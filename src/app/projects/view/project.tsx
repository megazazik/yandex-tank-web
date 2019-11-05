import * as React from "react";
import { IProject } from "../../project";

export interface IProps {
  project: IProject;
  className?: string;
  onClick?: () => void;
  onDoubleClick?: () => void;
}

export default function ProjectItem(props: IProps) {
  return (
    <tr
      className={props.className}
      onClick={props.onClick}
      onDoubleClick={props.onDoubleClick}
    >
      <td>{props.project.name}</td>
    </tr>
  );
}
