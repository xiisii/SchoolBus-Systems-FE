import type { FC } from 'react';
import { useCallback, useMemo, useState } from 'react';
import Bell01Icon from '@untitled-ui/icons-react/build/esm/Bell01';
import { Badge, IconButton, SvgIcon, Tooltip } from '@mui/material';
import { usePopover } from 'src/hooks/use-popover';
import type { Notification } from './notifications';
import { notifications as initialNotifications } from './notifications';
import { NotificationsPopover } from './notifications-popover';

const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const unread = useMemo(
    (): number => {
      return notifications.reduce(
        (acc, notification) => acc + (notification.read ? 0 : 1),
        0
      );
    },
    [notifications]
  );

  const handleRemoveOne = useCallback(
    (notificationId: string): void => {
      setNotifications((prevState) => {
        return prevState.filter((notification) => notification.id !== notificationId);
      });
    },
    []
  );

  const handleMarkAllAsRead = useCallback(
    (): void => {
      setNotifications((prevState) => {
        return prevState.map((notification) => ({
          ...notification,
          read: true
        }));
      });
    },
    []
  );

  return {
    handleMarkAllAsRead,
    handleRemoveOne,
    notifications,
    unread
  };
};

export const NotificationsButton: FC = () => {
  const popover = usePopover<HTMLButtonElement>();
  const { handleRemoveOne, handleMarkAllAsRead, notifications, unread } = useNotifications();

  return (
    <>
      <Tooltip title="Notifications">
        <IconButton
          ref={popover.anchorRef}
          onClick={popover.handleOpen}
        >
          <Badge
            color="error"
            badgeContent={unread}
          >
            <SvgIcon>
              <Bell01Icon />
            </SvgIcon>
          </Badge>
        </IconButton>
      </Tooltip>
      <NotificationsPopover
        anchorEl={popover.anchorRef.current}
        notifications={notifications}
        onClose={popover.handleClose}
        onMarkAllAsRead={handleMarkAllAsRead}
        onRemoveOne={handleRemoveOne}
        open={popover.open}
      />
    </>
  );
};
