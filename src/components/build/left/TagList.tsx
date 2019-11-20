import { observer } from "mobx-react";
import React from "react";
import { Build, System } from "store";
import TagItem from './TagItem';
import { SearchBox } from "office-ui-fabric-react";
import { tagTypes } from "../../../constants/commonConstants";

interface IProps {
  system: System,
  build: Build,
  tagType: tagTypes,
}

@observer
export default class TagList extends  React.Component<IProps> {

  render() {
    const { system, build, tagType } = this.props;
    const { tagList } = build;
    const { mainHeight } = system;
    return (
      <div style={{ height: mainHeight - 82 }} className="tag-list">
        <SearchBox
          placeholder="搜索"
          underlined={true}
        />
        <div className="tags">
          {tagList.map((tag: string, index: number) => {
            return <TagItem build={ build } tagName={tag} key={index} tagType={tagType} index={index}/>;
          })}
        </div>
      </div>
    )
  }
}
