import { observer } from "mobx-react";
import React from "react";
import { Build } from "store";
import { IRowConfig } from "../../../../models/build";

interface IProps {
  build: Build,
  rowConfig: IRowConfig,
}

@observer
export default class LabelShow extends  React.Component<IProps> {
  render() {
    const { rowConfig } = this.props;
    const { labelText, color, fontSize, textAlign } = rowConfig;
    return (
      <div title={labelText} style={{ color, fontSize, textAlign }} className="label">
        {labelText}
      </div>
    );
  }
}
