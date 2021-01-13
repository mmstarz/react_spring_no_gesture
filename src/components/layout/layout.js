import { Fragment, useContext, useCallback } from "react";
import { __RouterContext } from "react-router";
// components
import AnimMsgs from "./animMsgs";
// animated loadings
import BubbleLoading from "../../widgets/loadings/bubbleLoading";
import BubbleNaughty from "../../widgets/loadings/bubbleNaughty";
import BubblesExplosion from "../../widgets/loadings/bubblesExplosion";
import ShowLogoUpdated from "../../widgets/loadings/showLogoUpdated";
// mui
import Box from "@material-ui/core/Box";
// styles
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({  
  bg_one: {
    backgroundColor: "lightsteelblue",
  },
  bg_two: {
    backgroundColor: "#673AB7",
  },
  bg_three: {
    background: "#0a0a0a",
  },
  bg_four: {
    backgroundColor: "#263238",
  },
  bg_five: {
    backgroundColor: "darkslateblue",
  },
  box_load_anim: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 0,
    width: "100%",
    height: "100%",
    minHeight: "100vh",
    overflowY: "hidden",
    overflowX: "hidden",
  },
}));

const Layout = ({ children }) => {
  const classes = useStyles();
  const { location } = useContext(__RouterContext);

  // pages background switch
  const bg = useCallback(() => {
    switch (location.pathname) {
      case "/explosion":
        return classes.bg_five;
      case "/list":
        return classes.bg_two;
      case "/ball":
      case "/bh":
        return classes.bg_three;
      case "/":
        return classes.bg_four;
      default:
        return classes.bg_one;
    }
  }, [location, classes]);

  // aditional preloading examples
  const renderLoading = useCallback(() => {
    const { pathname } = location
    switch (pathname) {
      case "/list":
        return (
          <Fragment>
            <ShowLogoUpdated />
            <BubbleLoading />
          </Fragment>
        );
      case "/explosion":
        return (
          <Fragment>
            <ShowLogoUpdated />
            <BubblesExplosion />
          </Fragment>
        );        
      case "/ball":
        return (
          <Fragment>
            <ShowLogoUpdated />
            <BubbleNaughty />
          </Fragment>
        );        
      default:
        return (
          <Fragment>
            <ShowLogoUpdated />
            <BubbleLoading />
          </Fragment>
        );        
    }
  }, [location]);

  return (
    <Box className={bg()}>
      <Box classes={{ root: classes.box_load_anim }}>{renderLoading()}</Box>
      <section>{children}</section>
      <AnimMsgs />
    </Box>
  );
};

export default Layout;
