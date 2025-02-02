import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { useNavigate, useLocation } from 'react-router';
import { useSideBarItems } from './Hook/useSideBarItems';
import { IconName } from '@/Constants/IconsDictionary';
import styles from './styles/SideBarItems.module.css';
import { Badge } from '@mui/material';
export default function SideBarItems({ open }: { open: boolean }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { query, iconsDictionary } = useSideBarItems();
  //console.log('query', query.data);
  return (
    <>
      <List>
        {query.data &&
          query.data.data?.map((item, index) => (
            <ListItem key={index} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                selected={location.pathname === item.url}
                onClick={() => navigate(`${item.url}`)}
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
              {index === 5 && <Divider />}
            </ListItem>
          ))}
      </List>
    </>
  );
}
