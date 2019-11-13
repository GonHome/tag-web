import { Operation } from "../../../../../store";
import { observer } from "mobx-react";
import classNames from 'classnames';
import React from "react";
import { rightTypes } from 'constants/operationConstants';

interface IProps {
  operation: Operation,
  vId: string,
  height: number,
  rightType: string | null,
}

@observer
export default class RightSiderBar extends  React.Component<IProps> {
  render() {
    const { height, rightType, operation } = this.props;
    const { changeRightType } = operation;
    return (
      <nav className="right-sider-bar" style={{ height }}>
        <ul>
          <li>
            <a
              className={classNames({ active: rightType === rightTypes.REVIEW  })}
              onClick={() => changeRightType(rightType === rightTypes.REVIEW ? null : rightTypes.REVIEW )}
            >
              <span>预览数据</span>
            </a>
          </li>
          <li>
            <a
              className={classNames({ active: rightType === rightTypes.DETAILS })}
              onClick={() => changeRightType(rightType === rightTypes.DETAILS ? null : rightTypes.DETAILS )}
            >
              <span>标签信息</span>
            </a>
          </li>
        </ul>
      </nav>
    );
  }
}