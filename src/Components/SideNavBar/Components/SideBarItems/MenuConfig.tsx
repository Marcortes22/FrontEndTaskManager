import AllIcon from './MenuButtons/All';
import CompletedIcon from './MenuButtons/Completed';
import ImportantIcon from './MenuButtons/Important';
import MyDayIcon from './MenuButtons/MyDay';
import PlannedIcon from './MenuButtons/Planned';
// import LocalGroceryStoreOutlinedIcon from '@mui/icons-material/LocalGroceryStoreOutlined';
// import WavingHandIcon from '@mui/icons-material/WavingHand';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';

//search what is the better option to import icons
export const menuItems = [
  { text: 'My Day', icon: <MyDayIcon />, url: '/' },
  { text: 'Important', icon: <ImportantIcon />, url: '/Important' },
  { text: 'Planned', icon: <PlannedIcon />, url: '/Planned' },
  { text: 'All', icon: <AllIcon />, url: '/All' },
  { text: 'Completed', icon: <CompletedIcon />, url: '/Completed' },
  { text: 'Tasks', icon: <HomeOutlinedIcon />, url: '/Tasks' },
];
