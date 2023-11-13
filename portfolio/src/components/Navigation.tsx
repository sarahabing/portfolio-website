import { useState, useEffect } from 'react'
import { styled } from '@mui/material/styles';
import { IconButton, List, Toolbar } from '@mui/material';
import axios from 'axios';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import GitHubIcon from '@mui/icons-material/GitHub';
import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';

interface NavProps {
    drawerWidth: number;
    open: boolean;
    toggleDrawer: () => void;
  }


function Navigation(props : NavProps) : JSX.Element {
    const [repoList, setRepos] = useState([]);
    useEffect(() => {
        const password="hi"
        axios.get("https://api.github.com/users/sarahabing/repos", {
            headers: {
                'Authorization': `token ${process.env.REACT_APP_GITHUB_TOKEN}`
            }
        }).then((response: any) => {
            console.log('password is ', password)
            setRepos(response.data);
        });
    }, []);


    const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
        ({ theme, open }) => ({
            '& .MuiDrawer-paper': {
                position: 'relative',
                whiteSpace: 'nowrap',
                width: props.drawerWidth,
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.enteringScreen,
                }),
                boxSizing: 'border-box',
                ...(!open && {
                    overflowX: 'hidden',
                    transition: theme.transitions.create('width', {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.leavingScreen,
                    }),
                    width: theme.spacing(7),
                    [theme.breakpoints.up('sm')]: {
                        width: theme.spacing(9),
                    },
                }),
            },
        }),
    );
    return (
        <>
            <Drawer variant="permanent" open={props.open}>
                <Toolbar
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        px: [1],
                    }}
                >
                    <IconButton onClick={props.toggleDrawer}>
                        <ChevronLeftIcon />
                    </IconButton>
                </Toolbar>
                <Divider />
                <List component="nav">
                    {repoList.map((repo: any) => {
                        return (
                            <ListItem>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <GitHubIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={repo.name} />
                                </ListItemButton>
                            </ListItem>)
                    })}
                </List>
            </Drawer>

        </>
    )

}
export default Navigation;
