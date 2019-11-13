import { observer } from "mobx-react";
import React from "react";
import { DetailsList, DetailsListLayoutMode, IColumn, Selection, MarqueeSelection } from "office-ui-fabric-react";
import { Operation } from "../../../../../store";

interface IProps {
  operation: Operation,
  vId: string,
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

@observer
export default class TagReview extends  React.Component<IProps, IState> {

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

  componentDidMount(): void {
    const { vId } = this.props;
    console.log(vId);
  }

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
    const { items } = this.state;
    return (
      <div>
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
      </div>
    )
  }
}
