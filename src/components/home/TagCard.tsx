import React from 'react';
import { inject, observer } from 'mobx-react';
import { CommandBarButton, IIconProps, Icon, PrimaryButton } from 'office-ui-fabric-react';
import { Card } from '@uifabric/react-cards';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { System } from 'store';

interface IProps {
  system: System;
  _changeIsShow: (isShow: boolean) => void;
  isShow: boolean;
}

const showIcon: IIconProps = { iconName: 'ChevronUp' };
const hideIcon: IIconProps = { iconName: 'ChevronDown' };
const addIcon: IIconProps = { iconName: 'Add' };

@inject('system')
@observer
export default class TagCard extends  React.Component<IProps> {

  addTagButton = <PrimaryButton text='添加标签' iconProps={addIcon} className="add-tag-button"/>;

  render() {
    const { system, _changeIsShow, isShow } = this.props;
    const { width } = system;
    const itemWidth = width * 0.8 / 6;
    const itemHeight = itemWidth * 1.1;
    return (
      <div className="tag-card">
        <div className="create-new-header">
          { isShow ? <span>新建</span> : this.addTagButton }
          <div className="button-right-group">
            <CommandBarButton
              text={isShow ? '隐藏' : '显示'}
              iconProps={isShow ? showIcon : hideIcon}
              onClick={() => _changeIsShow(!isShow)}
            />
            <CommandBarButton
              text="更多"
            />
          </div>
        </div>
        <div className="create-new-body" style={{ height: isShow ? itemHeight : 0 }}>
          {
            isShow ?
              <div className="content">
                <Grid fluid>
                  <Row>
                    <Col md={2} xs={6}>
                      <Card horizontal >
                        <Card.Item>
                          <Icon iconName="Add" />
                        </Card.Item>
                      </Card>
                      <div className='aciton-title'>新建标签</div>
                    </Col>
                    <Col md={2} xs={6}>
                      <div className='aciton-title'>共享标签2</div>
                    </Col>
                    <Col md={2} xs={6}>
                      <div className='aciton-title'>共享标签3</div>
                    </Col>
                    <Col md={2} xs={6}>
                      <div className='aciton-title'>共享标签4</div>
                    </Col>
                    <Col md={2} xs={6}>
                      <div className='aciton-title'>共享标签5</div>
                    </Col>
                    <Col md={2} xs={6}>
                      <div className='aciton-title'>共享标签6</div>
                    </Col>
                  </Row>
                </Grid>
              </div> : null
          }
        </div>
      </div>
    )
  }
}

