import React from 'react';
import {RouteComponentProps} from 'react-router';

import {
  addErrorMessage,
  addLoadingMessage,
  addSuccessMessage,
} from 'app/actionCreators/indicator';
import Button from 'app/components/button';
import {Panel, PanelBody, PanelHeader} from 'app/components/panels';
import {IconAdd} from 'app/icons';
import {t} from 'app/locale';
import {ApiApplication} from 'app/types';
import AsyncView from 'app/views/asyncView';
import Row from 'app/views/settings/account/apiApplications/row';
import EmptyMessage from 'app/views/settings/components/emptyMessage';
import SettingsPageHeader from 'app/views/settings/components/settingsPageHeader';

const ROUTE_PREFIX = '/settings/account/api/';

type Props = RouteComponentProps<{}, {}>;
type State = {
  appList: ApiApplication[];
} & AsyncView['state'];

class ApiApplications extends AsyncView<Props, State> {
  getEndpoints(): ReturnType<AsyncView['getEndpoints']> {
    return [['appList', '/api-applications/']];
  }

  getTitle() {
    return t('API Applications');
  }

  handleCreateApplication = async () => {
    addLoadingMessage();

    try {
      const app = await this.api.requestPromise('/api-applications/', {
        method: 'POST',
      });

      addSuccessMessage(t('Created a new API Application'));
      this.props.router.push(`${ROUTE_PREFIX}applications/${app.id}/`);
    } catch (_err) {
      addErrorMessage(t('Unable to remove application. Please try again.'));
    }
  };

  handleRemoveApplication = (app: ApiApplication) => {
    this.setState({
      appList: this.state.appList.filter(a => a.id !== app.id),
    });
  };

  renderBody() {
    const action = (
      <Button
        priority="primary"
        size="small"
        onClick={this.handleCreateApplication}
        icon={<IconAdd size="xs" isCircled />}
      >
        {t('Create New Application')}
      </Button>
    );

    const isEmpty = this.state.appList.length === 0;

    return (
      <div>
        <SettingsPageHeader title="API Applications" action={action} />

        <Panel>
          <PanelHeader>{t('Application Name')}</PanelHeader>

          <PanelBody>
            {!isEmpty ? (
              this.state.appList.map(app => (
                <Row
                  api={this.api}
                  key={app.id}
                  app={app}
                  onRemove={this.handleRemoveApplication}
                />
              ))
            ) : (
              <EmptyMessage>
                {t("You haven't created any applications yet.")}
              </EmptyMessage>
            )}
          </PanelBody>
        </Panel>
      </div>
    );
  }
}

export default ApiApplications;
