import { observer } from "mobx-react";
import React from "react";
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import { Tag } from 'antd';
import { Operation } from "store";
import { tagAllTypeList, tagTypes } from 'constants/commonConstants';
import LeftDragItem from './LeftDragItem';
import { sideTypes } from "../../../../constants/operationConstants";

const { CheckableTag } = Tag;

interface IProps {
  operation: Operation,
}

@observer
export default class LeftStaticSide extends  React.Component<IProps> {

  render() {
    const { operation } = this.props;
    const { changeStaticActiveTag, leftMap } = operation;
    const { name, activeTag, dataMap } = leftMap[sideTypes.static];
    return (
      <div className="left-body">
        <SearchBox
          placeholder="搜索"
          underlined={true}
          value={name}
        />
        {tagAllTypeList.map(({ code, text }: { code: tagTypes, text: string }) => {
          return (
            <CheckableTag
              checked={code === activeTag || activeTag === tagTypes.all}
              onChange={() => changeStaticActiveTag(code)}
              key={code}
            >
              {text}
            </CheckableTag >
          );
        })}
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
    );
  }
}
