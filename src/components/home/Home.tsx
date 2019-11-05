import React from 'react';
import { inject, observer } from 'mobx-react';
import { Label, ILabelStyles } from 'office-ui-fabric-react/lib/Label';
import { Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot';
import { IStyleSet } from 'office-ui-fabric-react/lib/Styling';
import { DetailsList, DetailsListLayoutMode, Selection, IColumn } from 'office-ui-fabric-react/lib/DetailsList';
import { MarqueeSelection } from 'office-ui-fabric-react/lib/MarqueeSelection';

import { System } from 'store';
import TagCard from './TagCard';

interface IProps {
  system: System;
}

interface IDetailsListBasicExampleItem {
  key: number;
  name: string;
  value: number;
}

interface IState {
  isShow: boolean;
  items: IDetailsListBasicExampleItem[];
  selectionDetails: {};
}
const labelStyles: Partial<IStyleSet<ILabelStyles>> = {
  root: { marginTop: 10 }
};
@inject('system')
@observer
export default class Home extends  React.Component<IProps, IState> {

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
    this.state = { isShow: true,items: _allItems, selectionDetails: this._getSelectionDetails() }
  }

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

  _changeIsShow = (isShow: boolean) => {
    this.setState({ isShow });
  };

  _columns: IColumn[] = [
    { key: 'column1', name: '标签名', fieldName: 'name', minWidth: 100, maxWidth: 200, isResizable: true },
    { key: 'column2', name: '最近操作时间', fieldName: 'value', minWidth: 100, maxWidth: 200, isResizable: true },
    { key: 'column3', name: '最近操作人', fieldName: 'who', minWidth: 100, maxWidth: 200, isResizable: true },
    { key: 'column4', name: '共享', fieldName: 'who', minWidth: 100, maxWidth: 200, isResizable: true }
  ];

  _selection = new Selection({
    onSelectionChanged: () => this.setState({ selectionDetails: this._getSelectionDetails() })
  });

  render() {
    const { system } = this.props;
    const { isShow, items } = this.state;
    const { mainHeight } = system;
    return (
      <div className="home" style={{ height: mainHeight }}>
        <TagCard isShow={isShow} system={system} _changeIsShow={this._changeIsShow}/>
        <Pivot>
          <PivotItem
            headerText="最近操作"
          >
            <MarqueeSelection selection={this._selection}>
              <DetailsList
                items={items}
                columns={this._columns}
                setKey="set"
                layoutMode={DetailsListLayoutMode.justified}
                selection={this._selection}
                selectionPreservedOnEmptyClick={true}
                ariaLabelForSelectionColumn="Toggle selection"
                ariaLabelForSelectAllCheckbox="Toggle selection for all items"
                checkButtonAriaLabel="Row checkbox"
              />
            </MarqueeSelection>
          </PivotItem>
          <PivotItem headerText="关注">
            <Label styles={labelStyles}>Pivot #2</Label>
          </PivotItem>
          <PivotItem headerText="共享">
            <Label styles={labelStyles}>Pivot #3</Label>
          </PivotItem>
        </Pivot>
      </div>
    )
  }
}

