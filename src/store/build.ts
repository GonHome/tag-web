import { action, observable } from 'mobx';
import { IBasicInfo, IRowConfig } from "../models/build";
import { inputTypes, tagTypes, textAligns } from "../constants/commonConstants";
import { getMaxVId } from 'util/operate';

// 标签模板
class Build {
  @observable leftWidth: number;
  @observable rightWidth: number;
  @observable basicInfo: IBasicInfo;
  @observable rowConfigs: IRowConfig[];
  @observable activeId: string;

  constructor () {
    this.leftWidth = 280;
    this.rightWidth = 280;
    this.basicInfo = { name: '新建标签', type: tagTypes.people, sql: '' };
    this.rowConfigs = [
      {
        rowId: 'r-1',
        type: inputTypes.label,
        colNum: 2,
        labelText: '',
        fontSize: 12,
        color: 'black',
        options: '',
        textAlign: textAligns.left,
        defaultValue: '',
        maxValue: undefined,
        minValue: undefined,
      }
    ];
    this.activeId = '';
  }

  @action changeBasicInfo = (basicInfo: IBasicInfo) => {
    this.basicInfo = basicInfo;
  };

  @action addRowConfig = () => {
    const rowIds = this.rowConfigs.map((row: IRowConfig) => row.rowId);
    const rowId = `r-${getMaxVId(rowIds)}`;
    this.rowConfigs.push(
      {
        rowId,
        type: inputTypes.label,
        colNum: 2,
        labelText: '',
        fontSize: 12,
        color: 'black',
        options: '',
        textAlign: textAligns.left,
        defaultValue: '',
        maxValue: undefined,
        minValue: undefined,
      }
    );
    this.activeId = rowId;
  };

  @action delRowConfig = () => {
    if (this.activeId) {
      const rowIds = this.rowConfigs.map((rowConfig: IRowConfig) => {
        return rowConfig.rowId;
      });
      const activeIndex = rowIds.indexOf(this.activeId);
      this.rowConfigs = this.rowConfigs.filter((rowConfig: IRowConfig) => {
        return rowConfig.rowId !== this.activeId;
      });
      if (rowIds[activeIndex + 1]) {
        this.activeId = rowIds[activeIndex + 1];
      } else if (rowIds[activeIndex - 1]) {
        this.activeId = rowIds[activeIndex - 1];
      } else {
        this.activeId = '';
      }
    }
  };

  @action checkActiveId = (activeId: string) => {
    this.activeId = activeId;
  };

  @action changeConfigType = (val: inputTypes) => {
    if (this.activeId) {
      this.rowConfigs.forEach((rowConfig: IRowConfig) => {
        if (rowConfig.rowId === this.activeId) {
          rowConfig.type = val;
        }
      });
    }
  };

  @action changeConfigAlign = (val: textAligns) => {
    if (this.activeId) {
      this.rowConfigs.forEach((rowConfig: IRowConfig) => {
        if (rowConfig.rowId === this.activeId) {
          rowConfig.textAlign = val;
        }
      });
    }
  };

  @action changeConfigColNum = (colNum: number) => {
    if (this.activeId) {
      this.rowConfigs.forEach((rowConfig: IRowConfig) => {
        if (rowConfig.rowId === this.activeId) {
          rowConfig.colNum = colNum;
        }
      });
    }
  };

  @action changeConfigFontSize = (fontSize: number) => {
    if (this.activeId) {
      this.rowConfigs.forEach((rowConfig: IRowConfig) => {
        if (rowConfig.rowId === this.activeId) {
          rowConfig.fontSize = fontSize;
        }
      });
    }
  };

  @action changeConfigColor = (color: string) => {
    if (this.activeId) {
      this.rowConfigs.forEach((rowConfig: IRowConfig) => {
        if (rowConfig.rowId === this.activeId) {
          rowConfig.color = color;
        }
      });
    }
  };

  @action changeConfigLabelText = (labelText: string) => {
    if (this.activeId) {
      this.rowConfigs.forEach((rowConfig: IRowConfig) => {
        if (rowConfig.rowId === this.activeId) {
          rowConfig.labelText = labelText;
        }
      });
    }
  };

  @action changeConfigDefaultValue = (defaultValue: string) => {
    if (this.activeId) {
      this.rowConfigs.forEach((rowConfig: IRowConfig) => {
        if (rowConfig.rowId === this.activeId) {
          rowConfig.defaultValue = defaultValue;
        }
      });
    }
  };

  @action changeConfigOptions = (options: string) => {
    if (this.activeId) {
      this.rowConfigs.forEach((rowConfig: IRowConfig) => {
        if (rowConfig.rowId === this.activeId) {
          rowConfig.options = options;
        }
      });
    }
  };

  @action changeConfigMax = (maxValue: number) => {
    if (this.activeId) {
      this.rowConfigs.forEach((rowConfig: IRowConfig) => {
        if (rowConfig.rowId === this.activeId) {
          rowConfig.maxValue = maxValue;
        }
      })
    }
  };

  @action changeConfigMin = (minValue: number) => {
    if (this.activeId) {
      this.rowConfigs.forEach((rowConfig: IRowConfig) => {
        if (rowConfig.rowId === this.activeId) {
          rowConfig.minValue = minValue;
        }
      })
    }
  };


}

export default Build;
