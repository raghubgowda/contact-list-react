import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function ScrollableTabsButtonAuto() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const renderTabs = (n) => {
    let tabs = [];

    for (let i = 0; i < 10; i++) {
      tabs.push(<Tab id={i} label={`Item ${i}`} {...a11yProps(`${i}`)} />);
      //tabs.push(<Tab id={i} label={`${users[i].name.first} ${users[i].name.last}`} {...a11yProps(`${i}`)} />);
    }
    return tabs;
  };

  const renderTabPanels = (n) => {
    let tabPanels = [];
    for (let i = 0; i < n; i++) {
      tabPanels.push(<TabPanel value={value} index={i}>
        {`Item ${value}`}
      </TabPanel>);
    }
    return tabPanels;
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          {renderTabs(10)}
        </Tabs>
      </AppBar>
      {renderTabPanels(10)}
    </div>
  );
}
