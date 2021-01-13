import { useState, useRef } from "react";
// prop types
import PropTypes from "prop-types";
// spring
import { useSprings, animated, config, interpolate } from "react-spring";
// styles
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    "& > div": {
      width: "100%",
      height: 90,
      maxWidth: 360,
      cursor: "-webkit-grab",
      position: "absolute",
      pointerEvents: "auto",
      transformOrigin: "50% 50% 0px",
      borderRadius: 5,
      color: "white",
      textTransform: "uppercase",
      letterSpacing: 2,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: 0,
    },
    "& > div:nth-child(1)": {
      background: "linear-gradient(135deg, #f6d365 0%, #fda085 100%)",
    },
    "& > div:nth-child(2)": {
      background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    },
    "& > div:nth-child(3)": {
      background: "linear-gradient(135deg, #5ee7df 0%, #b490ca 100%)",
    },
    "& > div:nth-child(4)": {
      background: "linear-gradient(135deg, #c3cfe2 0%, #c3cfe2 100%)",
    },
    minWidth: 260,
    "@media (min-width: 280px)": {
      width: 260,
    },
    "@media (min-width: 320px)": {
      width: 300,
    },
    "@media (min-width: 360px)": {
      width: 340,
    },
  },
}));

const cardMargin = 8;
// const cardHeight = 248 + cardMargin;
const cardHeight = 90 + cardMargin;

// Returns fitting styles for dragged/idle items
// (order, moving, startIndex, curIndex, deltaY)
const fn = (order, moving, startIndex, curIndex, y) => (index) =>
  moving && index === startIndex
    ? {
        y: curIndex * cardHeight + y,
        scale: 1.1,
        zIndex: "1",
        shadow: 15,
        immediate: (n) => n === "y" || n === "zIndex",
        config: config.slow, // config.wobbly
      }
    : {
        y: order.indexOf(index) * cardHeight,
        scale: 1,
        zIndex: "0",
        shadow: 1,
        immediate: false,
        config: config.slow,
      };

const DragList = ({ items }) => {
  const classes = useStyles();
  // Store indicies as a local ref, this represents the item order
  const order = useRef(items.map((_, index) => index));
  const [moving, setMoving] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const [startY, setStartY] = useState(0);
  const [updOrd, setUpdOrd] = useState([]);
  // for children content update
  const [updList, setUpdList] = useState([...items]);

  const [springs, setSprings] = useSprings(items.length, fn(order.current));

  const swap = (arr, from, to) => {
    const _arr = arr.slice(0);
    const val = _arr[from];
    _arr.splice(from, 1);
    _arr.splice(to, 0, val);
    return _arr;
  };

  const clamp = (num, min, max) => {
    return Math.max(Math.min(num, max), min);
  };

  /* MOUSE HANDLERS HERE */

  const handleMouseDown = (e, i) => {
    // e.preventDefault();
    e.persist();
    handleStart({ y: e.clientY, i });
  };

  const handleMouseMove = (e) => {
    // e.preventDefault();
    e.persist();
    if (moving) {
      // curr mouse pos - start mouse pos
      handleMove({
        deltaY: e.clientY - startY,
      });
    }
  };

  const handleMouseUp = (e) => {
    // e.preventDefault();
    e.persist();
    handleEnd();
  };

  /* TOUCH HANDLERS HERE */

  const handleTouchStart = (e, i) => {
    e.persist();
    handleStart({ y: e.touches[0].clientY, i });
  };

  const handleTouchMove = (e) => {
    e.persist();
    if (moving) {
      // curr mouse pos - start mouse pos
      handleMove({
        deltaY: e.touches[0].clientY - startY,
      });
    }
  };

  const handleTouchEnd = (e) => {
    e.persist();
    handleEnd();
  };

  /* HANDLER FUNCTIONS HERE */

  const handleStart = ({ y, i }) => {
    setMoving(true);
    setStartY(y);
    setStartIndex(i);
  };

  const handleMove = ({ deltaY }) => {
    // calc indexies
    const curIndex = order.current.indexOf(startIndex);
    const curRow = clamp(
      Math.round((curIndex * cardHeight + deltaY) / cardHeight),
      0,
      items.length - 1
    );
    const newOrder = swap(order.current, curIndex, curRow);
    // console.log("new order", newOrder);

    // swap elements
    setSprings(fn(newOrder, moving, startIndex, curIndex, deltaY));

    // content update
    // const upd = updList.map((item, index) => {
    //   item.id = newOrder[index] + 1;
    //   return item;
    // });

    // console.log("upd: ", upd);

    // setUpdList(upd);

    setUpdOrd(newOrder);
  };

  const handleEnd = () => {
    setMoving(false);
    setStartY(0);
    setStartIndex(0);
    // update list order & list of doms
    order.current = updOrd;
    setSprings(fn(order.current));
  };

  return (
    <div
      className={classes.wrapper}
      style={{
        height: `${items.length * cardHeight}px`,
      }}
    >
      {springs.map(({ zIndex, shadow, y, scale }, i) => (
        <animated.div
          key={i}
          onMouseDown={(e) => handleMouseDown(e, i)}
          onMouseUp={(e) => handleMouseUp(e)}
          onMouseMove={(e) => handleMouseMove(e)}
          onTouchStart={(e) => handleTouchStart(e, i)}
          onTouchEnd={(e) => handleTouchEnd(e)}
          onTouchMove={(e) => handleTouchMove(e)}
          style={{
            zIndex,
            filter:
              moving && i === startIndex
                ? "drop-shadow(1px 1px 2px black)"
                : "",
            boxShadow: shadow.interpolate(
              (s) => `rgba(0, 0, 0, 0.15) 0px ${s}px ${2 * s}px 0px`
            ),
            transform: interpolate(
              [y, scale],
              (y, s) => `translate3d(0,${y}px,0) scale(${s})`
            ),
            WebkitTransform: interpolate(
              [y, scale],
              (y, s) => `translate3d(0,${y}px,0) scale(${s})`
            ),
          }}
          children={updList[i].title}
        />
      ))}
    </div>
  );
};

DragList.propTypes = {
  items: PropTypes.array.isRequired,
};

export default DragList;
