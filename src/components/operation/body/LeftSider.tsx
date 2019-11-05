import { observer } from "mobx-react";
import React from "react";
import classNames from 'classnames';
import { Operation } from "../../../store";
import { leftSideTypes } from 'constants/operationConstants';

interface IProps {
  operation: Operation,
  height: number;
}

@observer
export default class LeftSider extends  React.Component<IProps> {
  render() {
    const { height, operation } = this.props;
    const { leftSideType, leftWidth, setLeftSideType } = operation;
    return (
      <div className="left-sider" style={{ height, width: leftWidth }}>
        <div className="left-sider-bar">
          <ul>
            {leftSideTypes.map((sideType: { code: string, text: string }) => {
              return (
                <li key={sideType.code}>
                  <a className={classNames({active: sideType.code === leftSideType})} onClick={() => setLeftSideType(sideType.code)} >
                    <span>{sideType.text}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}
