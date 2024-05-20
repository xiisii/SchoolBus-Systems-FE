import type { FC } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';

type Size = 'small' | 'medium' | 'large';

type Status = 'online' | 'offline' | 'away' | 'busy';

const sizes = {
  small: 8,
  medium: 16,
  large: 23
};

interface PresenceRootProps {
  ownerState: {
    size: Size;
    status: Status;
  };
}

const PresenceRoot = styled('span')<PresenceRootProps>(
  ({ theme, ownerState }) => {
    const size = sizes[ownerState.size];
    const colors = {
      offline: theme.palette.neutral[100],
      away: theme.palette.warning.main,
      busy: theme.palette.error.main,
      online: theme.palette.success.main
    };
    const color = colors[ownerState.status];

    return {
      backgroundColor: color,
      borderRadius: '50%',
      display: 'inline-block',
      flexGrow: 0,
      flexShrink: 0,
      height: size,
      width: size
    };
  }
);

interface PresenceProps {
  size?: Size;
  status?: Status;
}

export const Presence: FC<PresenceProps> = (props) => {
  const { size = 'medium', status = 'offline', ...other } = props;

  const ownerState = { size, status };

  return (
    <PresenceRoot
      ownerState={ownerState}
      {...other}
    />
  );
};

Presence.propTypes = {
  size: PropTypes.oneOf<Size>(['small', 'medium', 'large']),
  status: PropTypes.oneOf<Status>(['online', 'offline', 'away', 'busy'])
};
