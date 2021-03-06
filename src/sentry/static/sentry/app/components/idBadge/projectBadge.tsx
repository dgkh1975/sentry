import React from 'react';
import styled from '@emotion/styled';

import BadgeDisplayName from 'app/components/idBadge/badgeDisplayName';
import BaseBadge from 'app/components/idBadge/baseBadge';
import Link from 'app/components/links/link';
import {Organization} from 'app/types';
import withOrganization from 'app/utils/withOrganization';

type BaseBadgeProps = React.ComponentProps<typeof BaseBadge>;
type Project = NonNullable<BaseBadgeProps['project']>;

type Props = Partial<Omit<BaseBadgeProps, 'project' | 'organization' | 'team'>> & {
  project: Project;
  organization?: Organization;
  /**
   * If true, will use default max-width, or specify one as a string
   */
  hideOverflow?: boolean | string;
  /**
   * If true, this component will not be a link to project details page
   */
  disableLink?: boolean;
};

const ProjectBadge = ({
  project,
  organization,
  hideOverflow = true,
  disableLink = false,
  ...props
}: Props) => {
  const {slug, id} = project;

  const badge = (
    <BaseBadge
      displayName={
        <BadgeDisplayName hideOverflow={hideOverflow}>{slug}</BadgeDisplayName>
      }
      project={project}
      {...props}
    />
  );

  if (
    !disableLink &&
    organization?.features.includes('project-detail') &&
    organization?.features.includes('project-detail-links')
  ) {
    return (
      <StyledLink
        to={`/organizations/${organization.slug}/projects/${slug}/${
          id ? `?project=${id}` : ''
        }`}
      >
        {badge}
      </StyledLink>
    );
  }

  return badge;
};

const StyledLink = styled(Link)`
  flex-shrink: 0;

  img:hover {
    cursor: pointer;
  }
`;

export default withOrganization(ProjectBadge);
