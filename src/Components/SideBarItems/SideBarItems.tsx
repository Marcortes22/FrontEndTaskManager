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
} from '@mui/material';

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

  if (query.isLoading) {
    return <SideBarSkeleton />;
  }
  return (
    <>
      <List sx={{ paddingTop: '0px' }}>
        {query.data &&
          query.data.data?.map((item, index) => (
            <Tooltip key={index} title={item.name} placement="right">
              <ListItem
                disablePadding
                sx={{ display: 'block', paddingY: '5px' }}
                onClick={handleDrawerClose}
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
                  </ListItemButton>
                </Link>
                {index === 4 && <Divider />}
              </ListItem>
            </Tooltip>
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
                <CreateNewFolderIcon />
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
