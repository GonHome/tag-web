import * as React from 'react';
import { Panel, IPanelProps } from 'office-ui-fabric-react/lib/Panel';
import { Text } from 'office-ui-fabric-react';
import { IRenderFunction } from 'office-ui-fabric-react/lib/Utilities';
import { useConstCallback } from '@uifabric/react-hooks';
import { panelKeys } from "../../constants/headConstants";
import { User } from "../../store";
import { Card } from "@uifabric/react-cards";

interface IProps {
  activePanel: panelKeys | undefined;
  dismissPanel: () => void;
  user: User;
}
const searchboxStyles = { root: { margin: '5px', height: 'auto', width: '100%' } };

const NoticePanel: React.FunctionComponent<IProps> = (props: IProps) => {
  const onRenderNavigationContent: IRenderFunction<IPanelProps> = useConstCallback((props, defaultRender) => (
    <>
      <Text styles={searchboxStyles} variant="xLarge">通知</Text>
      {defaultRender!(props)}
    </>
  ));
  const { activePanel, dismissPanel } = props;
  return (
    <Panel
      className="panel-under-head"
      isLightDismiss={true}
      isOpen={panelKeys.NOTICE === activePanel}
      onRenderNavigationContent={onRenderNavigationContent}
      onDismiss={dismissPanel}
      closeButtonAriaLabel="Close"
    >
      <Card horizontal>
        预警信息
      </Card>
    </Panel>
  )
};

export default NoticePanel;
