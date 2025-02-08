import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { useLocation } from 'react-router';
import { useSideBarItems } from './Hook/useSideBarItems';
import { IconName } from '@/Constants/IconsDictionary';
import styles from './styles/SideBarItems.module.css';
import { Badge } from '@mui/material';
import SideBarSkeleton from '@/Components/Skeletons/SideBarSkeleton/SideBarSkeleton';
import { Link } from 'react-router-dom';
export default function SideBarItems({ open }: { open: boolean }) {
  const location = useLocation();
  const { query, iconsDictionary } = useSideBarItems();

  if (query.isLoading) {
    return <SideBarSkeleton />;
  }
  return (
    <>
      <List sx={{ paddingTop: '0px' }}>
        {query.data &&
          query.data.data?.map((item, index) => (
            <ListItem key={index} disablePadding sx={{ display: 'block' }}>
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
