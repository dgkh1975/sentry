import React from 'react';
import {RouteComponentProps} from 'react-router';

import {fetchOrganizationEnvironments} from 'app/actionCreators/environments';
import {Client} from 'app/api';
import LoadingError from 'app/components/loadingError';
import LoadingIndicator from 'app/components/loadingIndicator';
import {t} from 'app/locale';
import OrganizationEnvironmentsStore from 'app/stores/organizationEnvironmentsStore';
import {Environment, GlobalSelection, Group, Organization, Project} from 'app/types';
import {Event} from 'app/types/event';
import withApi from 'app/utils/withApi';
import withGlobalSelection from 'app/utils/withGlobalSelection';
import withOrganization from 'app/utils/withOrganization';

import {ReprocessingStatus} from '../utils';

import GroupEventDetails from './groupEventDetails';

type Props = RouteComponentProps<
  {orgId: string; groupId: string; eventId?: string},
  {}
> & {
  api: Client;
  organization: Organization;
  selection: GlobalSelection;
  project: Project;
  group: Group;
  event: Event;
  loadingEvent: boolean;
  groupReprocessingStatus: ReprocessingStatus;
  eventError: boolean;
  onRetry: () => void;
};

type State = typeof OrganizationEnvironmentsStore['state'];

export class GroupEventDetailsContainer extends React.Component<Props, State> {
  state = OrganizationEnvironmentsStore.get();

  componentDidMount() {
    this.environmentUnsubscribe = OrganizationEnvironmentsStore.listen(
      data => this.setState(data),
      undefined
    );
    const {environments, error} = OrganizationEnvironmentsStore.get();
    if (!environments && !error) {
      fetchOrganizationEnvironments(this.props.api, this.props.organization.slug);
    }
  }

  componentWillUnmount() {
    if (this.environmentUnsubscribe) {
      this.environmentUnsubscribe();
    }
  }

  // TODO(ts): reflux :(
  environmentUnsubscribe: any;

  render() {
    if (this.state.error) {
      return (
        <LoadingError
          message={t("There was an error loading your organization's environments")}
        />
      );
    }
    // null implies loading state
    if (!this.state.environments) {
      return <LoadingIndicator />;
    }
    const {selection, ...otherProps} = this.props;
    const environments: Environment[] = this.state.environments.filter(env =>
      selection.environments.includes(env.name)
    );

    return <GroupEventDetails {...otherProps} environments={environments} />;
  }
}

export default withApi(withOrganization(withGlobalSelection(GroupEventDetailsContainer)));
