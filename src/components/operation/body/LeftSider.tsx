import { observer } from "mobx-react";
import React from "react";
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import classNames from 'classnames';
import { Operation } from "../../../store";
import { leftSideTypes } from 'constants/operationConstants';
import LeftDragItem from './LeftDragItem';

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
        <div className="left-body">
          <SearchBox
            placeholder="搜索"
            underlined={true}
          />
          <div className="left-drag-content">
            <LeftDragItem operation={operation}/>
            <LeftDragItem operation={operation}/>
            <LeftDragItem operation={operation}/>
            <LeftDragItem operation={operation}/>
            <LeftDragItem operation={operation}/>
            <LeftDragItem operation={operation}/>
            <LeftDragItem operation={operation}/>
            <LeftDragItem operation={operation}/>
            <LeftDragItem operation={operation}/>
          </div>
        </div>
      </div>
    );
  }
}
