import { inject, observer } from "mobx-react";
import React from "react";
import { System, Operation } from "../../store";
import Toolbar from './toolbar/Toolbar';
import Body from './body/Body';

interface IProps {
  system: System,
  operation: Operation,
}

@inject('system', 'operation')
@observer
export default class OperationDom extends  React.Component<IProps> {
  render() {
    const { operation, system } = this.props;
    return <div className='operation' >
      <Toolbar operation={operation}/>
      <Body operation={operation} system={system}/>
    </div>
  }
}
