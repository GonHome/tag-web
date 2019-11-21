import { observer } from "mobx-react";
import React from "react";
import {
  DetailsList,
  DetailsListLayoutMode,
  IColumn,
  Selection,
  MarqueeSelection,
  SearchBox,
  SelectionMode
} from 'office-ui-fabric-react';
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { System } from "../../../store";

interface IProps {
  closeDialog: () => void;
  system: System;
}

interface IDetailsListBasicExampleItem {
  key: number;
  name: string;
  value: number;
}

interface IState {
  items: IDetailsListBasicExampleItem[];
  selectionDetails: {};
  name: string;
}
@observer
export default class SqlDialog extends  React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);
    const _allItems = [];
    for (let i = 0; i < 20; i++) {
      _allItems.push({
        key: i,
        name: 'Item ' + i,
        value: i
      });
    }
    this.state = { items: _allItems, selectionDetails: this._getSelectionDetails(), name: '' };
  }

  _selection = new Selection({
    onSelectionChanged: () => this.setState({ selectionDetails: this._getSelectionDetails() })
  });

  private _getSelectionDetails(): string {
    const selectionCount = this._selection.getSelectedCount();
    switch (selectionCount) {
      case 0:
        return 'No items selected';
      case 1:
        return '1 item selected: ' + (this._selection.getSelection()[0] as IDetailsListBasicExampleItem).name;
      default:
        return `${selectionCount} items selected`;
    }
  }

  private _submit = () => {

  };

  _nameChange = (event?: React.ChangeEvent<HTMLInputElement>, newValue?: string) => {
    this.setState({ name: newValue || '' });
  };

  _columns: IColumn[] = [
    { key: 'column1', name: 'SQL名', fieldName: 'name', minWidth: 100, maxWidth: 200, isResizable: true },
    { key: 'column2', name: '创建时间', fieldName: 'value', minWidth: 100, maxWidth: 200, isResizable: true },
    { key: 'column3', name: '证件字段', fieldName: 'who', minWidth: 100, maxWidth: 200, isResizable: true },
  ];

  render() {
    const { closeDialog, system } = this.props;
    const { items, name } = this.state;
    const { mainHeight, width } = system;
    return (
      <Dialog
        hidden={false}
        onDismiss={closeDialog}
        className="sql-dialog"
        dialogContentProps={{
          type: DialogType.largeHeader,
          title: '选择SQL',
        }}
        modalProps={{
          isBlocking: true,
        }}
      >
        <div style={{ width: width * 0.6, height: mainHeight * 0.7 }}>
          <div style={{ width: 200 }}>
            <SearchBox
              placeholder="搜索"
              underlined={true}
              value={''}
              onChange={this._nameChange}
            />
          </div>
          <MarqueeSelection selection={this._selection}>
            <DetailsList
              items={items}
              columns={this._columns}
              setKey="set"
              layoutMode={DetailsListLayoutMode.justified}
              selectionMode={SelectionMode.single}
              selection={this._selection}
              selectionPreservedOnEmptyClick={true}
              ariaLabelForSelectionColumn="Toggle selection"
              ariaLabelForSelectAllCheckbox="Toggle selection for all items"
              checkButtonAriaLabel="Row checkbox"
            />
          </MarqueeSelection>
        </div>
        <DialogFooter>
          <PrimaryButton onClick={this._submit} text="确定" />
          <DefaultButton onClick={closeDialog} text="取消" />
        </DialogFooter>
      </Dialog>
    )
  }
}
