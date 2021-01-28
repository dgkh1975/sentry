import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

import space from 'app/styles/space';

import {t} from '../../locale';
import ExternalLink from '../links/externalLink';

type Props = {
  hasSeen?: boolean;
  title?: string;
  image?: string;
  message?: React.ReactNode;
  link?: string;
  cta?: string;
  children?: React.ReactNode;
};

const SidebarPanelItem = ({
  hasSeen,
  title,
  image,
  message,
  link,
  cta,
  children,
}: Props) => (
  <SidebarPanelItemRoot>
    {title && <Title hasSeen={hasSeen}>{title}</Title>}
    {image && (
      <ImageBox>
        <img src={image} />
      </ImageBox>
    )}
    {message && <Message>{message}</Message>}

    {children}

    {link && (
      <Text>
        <ExternalLink href={link}>{cta || t('Read More')}</ExternalLink>
      </Text>
    )}
  </SidebarPanelItemRoot>
);

SidebarPanelItem.propTypes = {
  title: PropTypes.string,
  image: PropTypes.string,
  message: PropTypes.node,
  link: PropTypes.string,
  hasSeen: PropTypes.bool,
  cta: PropTypes.string,
};

export default SidebarPanelItem;

const SidebarPanelItemRoot = styled('div')`
  padding: 15px 20px;
  line-height: 1.5;
  border-bottom: 1px solid ${p => p.theme.innerBorder};
  background: ${p => p.theme.background};
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06);
  font-size: 14px;
`;

const ImageBox = styled('div')`
  border: 1px solid #e1e4e5;
  padding: ${space(2)};
  border-radius: 2px;
`;

const Title = styled('div')<Pick<Props, 'hasSeen'>>`
  font-size: ${p => p.theme.fontSizeLarge};
  margin-bottom: ${space(1)};
  color: ${p => p.theme.textColor};
  ${p => !p.hasSeen && 'font-weight: 600;'};

  .culprit {
    font-weight: normal;
  }
`;

const Text = styled('div')`
  margin-bottom: 5px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const Message = styled(Text)`
  color: ${p => p.theme.subText};
`;
