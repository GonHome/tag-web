import { observer } from "mobx-react";
import React from "react";
import { CommandBarButton, IIconProps, Stack } from 'office-ui-fabric-react';
import { Operation } from "../../../store";
import TagAddDialog from './TagAddDialog';
import { dialogTypes } from 'constants/operationConstants';
interface IProps {
  operation: Operation,
}
interface IState {
  dialogType: string | null,
}
const addIcon: IIconProps = { iconName: 'Add' };
const editIcon: IIconProps = { iconName: 'Edit' };
const delIcon: IIconProps = { iconName: 'Delete' };
const shareIcon: IIconProps = { iconName: 'Share' };
const runIcon: IIconProps = { iconName: 'Play' };

@observer
export default class Toolbar extends  React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);
    this.state = { dialogType: null }
  }

  _closeDialog = () => {
    this.setState({ dialogType: null });
  };

  render() {
    const { operation } = this.props;
    const { dialogType } = this.state;
    const { toolbarHeight } = operation;
    return (
      <div className='toolbar' style={{ height: toolbarHeight }}>
        <Stack horizontal>
          <CommandBarButton
            iconProps={addIcon}
            onClick={() => this.setState({ dialogType: dialogTypes.ADDTAG })}
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
        <TagAddDialog operation={operation} isHidden={dialogType !== dialogTypes.ADDTAG} closeDialog={this._closeDialog} />
      </div>
    );
  }
}
