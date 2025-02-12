import { useSideBarItems } from './Hook/useSideBarItems';
import { IconName } from '@Types/index';
import styles from './styles/SideBarItems.module.css';
import { SideBarSkeleton } from '@/Components/index';
import { Link } from 'react-router-dom';
import {
  Badge,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
export default function SideBarItems({ open }: { open: boolean }) {
  const { query, iconsDictionary, location } = useSideBarItems();

  if (query.isLoading) {
    return <SideBarSkeleton />;
  }
  return (
    <>
      <List sx={{ paddingTop: '0px' }}>
        {query.data &&
          query.data.data?.map((item, index) => (
            <ListItem
              key={index}
              disablePadding
              sx={{ display: 'block', paddingY: '5px' }}
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
                          }
                        : {
                            opacity: 0,
                          },
                    ]}
                  />
                </ListItemButton>
              </Link>
              {index === 5 && <Divider />}
            </ListItem>
          ))}
      </List>
    </>
  );
}
