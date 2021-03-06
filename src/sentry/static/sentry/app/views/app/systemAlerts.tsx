import React from 'react';
import createReactClass from 'create-react-class';
import {ThemeProvider} from 'emotion-theming';
import Reflux from 'reflux';

import AlertStore from 'app/stores/alertStore';
import {lightTheme} from 'app/utils/theme';

import AlertMessage from './alertMessage';

type Props = {className?: string};
type Alert = React.ComponentProps<typeof AlertMessage>['alert'];
type State = {
  alerts: Array<Alert>;
};

const Alerts = createReactClass<Props, State>({
  displayName: 'Alerts',
  mixins: [Reflux.connect(AlertStore, 'alerts') as any],

  getInitialState() {
    return {
      alerts: [],
    };
  },

  render() {
    const {className} = this.props;
    const alerts = this.state.alerts as Array<Alert>;
    return (
      <ThemeProvider theme={lightTheme}>
        <div className={className}>
          {alerts.map((alert, index) => (
            <AlertMessage alert={alert} key={`${alert.id}-${index}`} system />
          ))}
        </div>
      </ThemeProvider>
    );
  },
});

export default Alerts;
