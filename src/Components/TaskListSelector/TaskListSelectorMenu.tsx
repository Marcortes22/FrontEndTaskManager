import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { IconName, iconsDictionary } from '@/Constants/IconsDictionary';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import DefaultIcon from '@mui/icons-material/Dehaze';
import { Icon, Skeleton, Tooltip, Typography } from '@mui/material';
import styles from './styles/TaskListSelector.module.css';
import { TaskListType } from '@/Types/TaskList.type';
import { useTaskListSelector } from './Hook/useTaskListSelector';

export default function TaskListSelector({
  currentList,
  setCurrentList,
  defaultTaskListId,
}: {
  currentList?: TaskListType;
  setCurrentList: (list: TaskListType) => void;
  defaultTaskListId?: number;
}) {
  const {
    open,
    handleClickListItem,
    handleMenuItemClick,
    handleClose,
    anchorEl,
    query,
  } = useTaskListSelector({ setCurrentList, defaultTaskListId });

  if (query.isLoading) {
    return (
      <>
        <Skeleton
          variant="rectangular"
          sx={{
            width: '70px',
            height: '24px',
            bgcolor: 'grey.900',
            display: 'flex',

            borderRadius: '5px',
          }}
        ></Skeleton>
      </>
    );
  }

  return (
    <>
      <List component="nav" aria-label="Device settings" sx={{ zIndex: '2' }}>
        <Tooltip title="Select Task List" arrow>
          <ListItemButton
            id="lock-button"
            aria-haspopup="listbox"
            aria-controls="lock-menu"
            aria-label="when device is locked"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClickListItem}
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              gap: '2px',
              alignItems: 'center',
              paddingX: '2px',
              borderRadius: '2px',
            }}
          >
            {currentList?.name == 'Tasks' ? (
              <HomeOutlinedIcon sx={{ fontSize: '20px' }} />
            ) : (
              <DefaultIcon sx={{ fontSize: '20px' }} />
            )}

            <Typography variant="body2" sx={{ color: 'white' }}>
              {currentList?.name ?? 'Default'}
            </Typography>
          </ListItemButton>
        </Tooltip>
      </List>
      <Menu
        id="lock-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'lock-button',
          role: 'listbox',
        }}
        className={styles.menuListContainer}
      >
        {query.data?.data?.map((item) => (
          <MenuItem
            key={item.name}
            onClick={() => handleMenuItemClick(item)}
            sx={{}}
            className={styles.menuListItemContainer}
          >
            <Typography>{item.name}</Typography>
            <Icon>
              {iconsDictionary[item.name as IconName] ??
                iconsDictionary['Default']}
            </Icon>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
