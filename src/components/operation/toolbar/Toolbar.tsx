import { observer } from "mobx-react";
import React from "react";
import { CommandBarButton, IIconProps, Stack } from 'office-ui-fabric-react';
import { Operation } from "../../../store";

interface IProps {
  operation: Operation,
}
const addIcon: IIconProps = { iconName: 'Add' };
const editIcon: IIconProps = { iconName: 'Edit' };
const delIcon: IIconProps = { iconName: 'Delete' };
const shareIcon: IIconProps = { iconName: 'Share' };
const runIcon: IIconProps = { iconName: 'Play' };

@observer
export default class Toolbar extends  React.Component<IProps> {
  render() {
    const { operation } = this.props;
    const { toolbarHeight } = operation;
    return (
      <div className='toolbar' style={{ height: toolbarHeight }}>
        <Stack horizontal>
          <CommandBarButton
            iconProps={addIcon}
            text="新增"
          />
          <CommandBarButton
            iconProps={editIcon}
            text="编辑"
          />
          <CommandBarButton
            iconProps={delIcon}
            text="删除"
          />
          <CommandBarButton
            iconProps={shareIcon}
            text="分享"
          />
          <CommandBarButton
            iconProps={runIcon}
            text="执行"
          />
        </Stack>
      </div>
    );
  }
}
