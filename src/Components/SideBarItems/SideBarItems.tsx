import { useSideBarItems } from './Hook/useSideBarItems';
import { IconName } from '@Types/index';
import styles from './styles/SideBarItems.module.css';
import { SideBarSkeleton } from '@/Components/index';
import { Link } from 'react-router-dom';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import {
  Badge,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Tooltip,
  useTheme,
} from '@mui/material';
import TaskListMenu from '../TaskListMenu/TaskListMenu';
import React from 'react';

export default function SideBarItems({
  open,
  handleDrawerClose,
  handleCreateTaskListDialogOpen,
}: {
  open: boolean;
  handleDrawerClose?: () => void;
  handleCreateTaskListDialogOpen: () => void;
}) {
  const { query, iconsDictionary, location } = useSideBarItems();
  const theme = useTheme();

  if (query.isLoading) {
    return <SideBarSkeleton />;
  }
  return (
    <>
      <List sx={{ paddingTop: '0px' }}>
        {query.data &&
          query.data.data?.map((item, index) => (
            <React.Fragment key={item.url}>
              <Tooltip title={item.name} placement="right" arrow>
                <ListItem
                  disablePadding
                  sx={{ display: 'block', paddingY: '5px' }}
                  onClick={(event) => {
                    event.stopPropagation();
                    handleDrawerClose?.();
                  }}
                >
                  <Link
                    to={`${item.url}`}
                    viewTransition
                    className={styles.linkStyles}
                  >
                    <ListItemButton
                      selected={location.pathname === item.url}
                      className={styles.listItemButton}
                      sx={[
                        open
                          ? {
                              justifyContent: 'initial',
                            }
                          : {
                              justifyContent: 'center',
                            },
                      ]}
                    >
                      <ListItemIcon
                        className={styles.ListItemIconStyles}
                        sx={[
                          open
                            ? {
                                mr: 3,
                              }
                            : {
                                mr: 'auto',
                              },
                        ]}
                      >
                        <Badge
                          badgeContent={item.amoundOfTasks}
                          color="primary"
                          invisible={item.amoundOfTasks > 0 ? false : true}
                        >
                          {iconsDictionary[item.name as IconName] ??
                            iconsDictionary['Default']}
                        </Badge>
                      </ListItemIcon>
                      <ListItemText
                        primary={item.name}
                        sx={[
                          open
                            ? {
                                opacity: 1,
                                display: 'flex',
                                alignItems: 'center',
                                textAlign: 'center',
                                justifyContent: 'space-between',
                                '& span': {
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                },
                              }
                            : {
                                opacity: 0,
                              },
                        ]}
                      />
                      {item.isDefault === false && open && item.id && (
                        <TaskListMenu
                          taskListId={item.id}
                          taskListName={item.name}
                        />
                      )}
                    </ListItemButton>
                  </Link>
                </ListItem>
              </Tooltip>
              {index === 4 && <Divider />}
            </React.Fragment>
          ))}
        <Tooltip title="Create new Task List" placement="right">
          <ListItem disablePadding sx={{ display: 'block', paddingY: '5px' }}>
            <ListItemButton
              onClick={handleCreateTaskListDialogOpen}
              className={styles.listItemButton}
              sx={[
                open
                  ? {
                      justifyContent: 'initial',
                    }
                  : {
                      justifyContent: 'center',
                    },
              ]}
            >
              <ListItemIcon
                className={styles.ListItemIconStyles}
                sx={[
                  open
                    ? {
                        mr: 3,
                      }
                    : {
                        mr: 'auto',
                      },
                ]}
              >
                <CreateNewFolderIcon
                  sx={{ color: theme.palette.primary.main }}
                />
              </ListItemIcon>
              <ListItemText
                primary="New List"
                sx={[
                  open
                    ? {
                        opacity: 1,
                        display: 'flex',
                        alignItems: 'center',
                        textAlign: 'center',
                        justifyContent: 'space-between',
                        fontWeight: 'bold',
                        color: theme.palette.primary.main,
                      }
                    : {
                        opacity: 0,
                      },
                ]}
              />
            </ListItemButton>
          </ListItem>
        </Tooltip>
      </List>
    </>
  );
}
