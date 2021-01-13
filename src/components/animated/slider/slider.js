import {
  useState,
  useRef,
  useEffect,
  useLayoutEffect,
  useCallback,
} from "react";
// prop types
import PropTypes from "prop-types";
// spring
import { useSprings, animated, config } from "react-spring";
// els
import Spinner from "../../../widgets/spinner/spinner";
import SliderActions from "./sliderActions";
import SliderGallery from "./sliderGallery";
import SliderPip from "./sliderPip";
// mui
import Box from "@material-ui/core/Box";
// styles
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 32,
    "& .slide": {
      position: "absolute",
      top: 0,
      left: 0,
      userSelect: "none",
      cursor: "grab",
      "&.grabbed": {
        cursor: "grabbing",
      },
    },
  },
  child: {
    backgroundSize: "100% 100%",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  },
  side: {
    position: "absolute",
    top: 0,
    background: "rgb(0 0 0 / 0.85)",
    zIndex: 0,
    "&.left": {
      zIndex: 1,
    },
    "&.right": {
      zIndex: 1,
    },
  },
  dotsWrapper: {
    position: "absolute",
    bottom: -32,
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  sliderDot: {
    "& .pip": {
      position: "absolute",
      top: "50%",
      left: "50%",
      width: 16,
      height: 16,
      padding: 2,
      background: "aliceblue",
      borderRadius: "50%",
      zIndex: -1,
    },
  },
}));

const Slider = ({
  items,
  reload,
  stopReload,
  custom = false,
  overflow = true,
  showBorders = false,
  showActions = true,
  showPips = true,
  itemMargin = 0,
  itemWidth = window.innerWidth,
}) => {
  const classes = useStyles();

  const calcHeight = (slideWidth) => {
    if (slideWidth < 400) {
      return slideWidth - 50;
    } else if (slideWidth < 800) {
      // 4:3 ratio
      return (slideWidth / 4) * 3;
    } else if (slideWidth < 1200) {
      // 16:9 ratio
      return (slideWidth / 16) * 9;
    } else {
      return (slideWidth / 16) * 9;
    }
  };

  const checkWidth = useCallback((width) => {
    if (width > window.innerWidth) {
      return window.innerWidth;
    } else {
      return width;
    }
  }, []);

  const slideMargin = custom ? itemMargin : 0;
  const slideWidth = custom ? checkWidth(itemWidth) : window.innerWidth;

  const showOverflow = custom ? overflow : true;
  const allowBorders = custom ? showBorders : false;
  const allowActions = custom ? showActions : true;
  const allowPips = custom ? showPips : true;

  const [gallery, setGallery] = useState(false);

  const [slideHeight, setSlideHeight] = useState(calcHeight(slideWidth));
  const [size, setSize] = useState(slideWidth + 2 * slideMargin);
  const [spw, setSpw] = useState(Math.ceil(window.innerWidth / size));

  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);

  const index = useRef(spw);
  const [down, setDown] = useState(false);
  const [mode, setMode] = useState(false);
  const [moveStart, setMoveStart] = useState(0);

  const [cursor, setCursor] = useState(index.current);

  const clamp = useCallback((num, min, max) => {
    return Math.max(Math.min(num, max), min);
  }, []);

  const handler = useCallback(
    (down, distance, xDir, xDelta, show) => (i) => {
      const x = (i - index.current) * size + (down ? xDelta : 0);
      const scale = down ? 0.9 : 1;

      // console.log("@show: ", show);

      return {
        x,
        scale,
        display: "block",
        immediate: (key) => {
          // when true - prevent animation
          if (key === "x" && !show) {
            return true;
          } else {
            return false;
          }
        },
        config: showOverflow
          ? config.gentle
          : {
              mass: 1,
              tension: 100,
              friction: 10,
              clamp: true,
            },
      };
    },
    [size, showOverflow]
  );

  const [springs, setSprings] = useSprings(
    list.length,
    handler(false, 0, 0, 0, true)
  );

  // const swap = (arr, from, to) => {
  //   const _arr = arr.slice(0);
  //   const val = _arr[from];
  //   _arr.splice(from, 1);
  //   _arr.splice(to, 0, val);
  //   return _arr;
  // };

  // index correction
  const correction = () => {
    // correct index
    // === / <=
    if (index.current <= spw - 1) {
      // console.log("@CORRECT LEFT SIDE");
      const dispersed = spw - index.current;
      index.current = list.length - spw - dispersed;
      return false;
    }

    // === / >=
    if (index.current >= list.length - spw) {
      // console.log("@CORRECT RIGHT SIDE");
      const last = list.length - 1 - spw;
      // console.log("last: ", last);
      const dispersed = index.current - last;
      // console.log("dispersed: ", dispersed);
      index.current = spw - 1 + dispersed;
      return false;
    }

    return true;
  };

  /* TOUCH HANDLERS HERE */

  const handleTouchStart = (e) => {
    e.persist();
    setMode(true);

    setMoveStart(e.changedTouches[0].clientX);

    handleStart();
  };

  const handleTouchEnd = (e) => {
    e.persist();

    const xDelta = e.changedTouches[0].clientX - moveStart;
    const xDir = xDelta >= 0 ? 1 : -1;
    const distance = Math.abs(xDelta);

    const steps = distance / slideWidth;
    const fullSteps = Number.parseInt(steps);
    // old ver. >= 0.85
    const partStep = (steps - Math.floor(steps)).toFixed(2) >= 0.65 ? 1 : 0;
    const movement = fullSteps + partStep;

    const expected = clamp(
      index.current + (xDir > 0 ? -movement : movement),
      0,
      list.length - 1
    );

    if (distance > size / 2) {
      // console.log("@CLAMP");
      index.current = expected;
    }

    // index correction
    const show = correction();

    // down, distance, xDir, xDelta, show
    setSprings(handler(false, distance, xDir, xDelta, show));

    handleEnd();
  };

  /* MOUSE HANDLERS HERE */

  const handleMouseDown = (e) => {
    e.persist();

    setMode(false);

    // console.log("@INDEX CURRENT: ", index.current);

    setMoveStart(e.clientX);

    handleStart();
  };

  const handleMouseUp = (e) => {
    e.persist();

    const xDelta = e.clientX - moveStart;
    const xDir = xDelta >= 0 ? 1 : -1;
    const distance = Math.abs(xDelta);

    const steps = distance / slideWidth;
    const fullSteps = Number.parseInt(steps);
    // old ver. >= 0.85
    const partStep = (steps - Math.floor(steps)).toFixed(2) >= 0.65 ? 1 : 0;

    const movement = fullSteps + partStep;

    const expected = clamp(
      index.current + (xDir > 0 ? -movement : movement),
      0,
      list.length - 1
    );

    if (distance > size / 2) {
      // console.log("@CLAMP");
      index.current = expected;
    }

    // index correction
    const show = correction();

    // down, distance, xDir, xDelta, show
    setSprings(handler(false, distance, xDir, xDelta, show));

    handleEnd();
  };

  /* HANDLER FUNCTIONS HERE */

  const handleStart = () => {
    setDown(true);
  };

  const handleEnd = () => {
    setDown(false);
    setCursor(index.current);
  };

  const mouseMove = useCallback(
    (e) => {
      // distance - offset distance
      // direction: [xDir] - direction per axis (-1, 1)
      // delta: [xDelta] - movement delta (movement - previous movement)

      const xDelta = e.clientX - moveStart;
      const xDir = xDelta >= 0 ? 1 : -1;
      const distance = Math.abs(xDelta);

      // down, distance, xDir, xDelta, show
      setSprings(handler(true, distance, xDir, xDelta, true));
    },
    [setSprings, handler, moveStart]
  );

  const touchMove = useCallback(
    (e) => {
      const xDelta = e.changedTouches[0].clientX - moveStart;
      const xDir = xDelta >= 0 ? 1 : -1;
      const distance = Math.abs(xDelta);

      /// down, distance, xDir, xDelta, show
      setSprings(handler(true, distance, xDir, xDelta, true));
    },
    [setSprings, handler, moveStart]
  );

  /* ACTIONS */

  const moveTo = (dir) => {
    const xDelta = (size / 1.2) * dir;
    const xDir = xDelta >= 0 ? 1 : -1;
    const distance = Math.abs(xDelta);

    // down, distance, xDir, xDelta
    setSprings(handler(true, distance, xDir, xDelta, true));

    if (distance > size / 2) {
      // console.log("@CLAMP");
      index.current = clamp(
        index.current + (xDir > 0 ? -1 : 1),
        0,
        list.length - 1
      );
    }

    setTimeout(() => {
      // index correction
      const show = correction();

      // down, distance, xDir, xDelta
      setSprings(handler(false, distance, xDir, xDelta, show));
      setCursor(index.current);
    }, 300);
  };

  const handleLeft = () => {
    moveTo(1);
  };

  const handleRight = () => {
    moveTo(-1);
  };

  /* DOTS */

  const handleJump = (dir, steps, endpoint) => {
    const xDelta = (size * steps - (slideWidth - slideWidth / 1.2)) * dir;
    const xDir = xDelta >= 0 ? 1 : -1;
    const distance = Math.abs(xDelta);

    // down, distance, xDir, xDelta, show
    setSprings(handler(true, distance, xDir, xDelta, true));

    if (distance > size / 2) {
      // console.log("@CLAMP");
      index.current = clamp(endpoint, 0, list.length - 1);
    }

    setTimeout(() => {
      // down, distance, xDir, xDelta, show
      setSprings(handler(false, distance, xDir, xDelta, false));
      setCursor(index.current);
    }, 300);
  };

  const jumpTo = (idx) => {
    const visible = spw > 1 ? Number.parseInt(spw / 2, 10) : 1; // visible clones
    const last = list.length - 1 - spw; // last index

    if (cursor < idx) {
      // moves through carousel edges scenario
      const edgesDistances = cursor - spw + last - idx + 1;
      // moves directly through slides scenario
      const directDistances = idx - cursor;

      if (directDistances < edgesDistances) {
        // console.log("@direction: RIGHT; @steps: ", directDistances);
        handleJump(-1, directDistances, idx);
      } else if (
        directDistances > edgesDistances &&
        edgesDistances <= visible
      ) {
        // console.log("@direction: LEFT; @steps: ", edgesDistances);
        handleJump(1, edgesDistances, idx);
      } else if (directDistances > edgesDistances && edgesDistances > visible) {
        // console.log("@direction: RIGHT; @steps: ", directDistances);
        handleJump(-1, directDistances, idx);
      } else if (
        directDistances === edgesDistances &&
        edgesDistances <= visible
      ) {
        // console.log("@direction: LEFT; @steps: ", edgesDistances);
        handleJump(1, edgesDistances, idx);
      } else if (
        directDistances === edgesDistances &&
        edgesDistances > visible
      ) {
        // console.log("@direction: RIGHT; @steps: ", directDistances);
        handleJump(-1, directDistances, idx);
      }
    } else if (cursor > idx) {
      // moves through carousel edges scenario
      const edgesDistances = idx - spw + last - cursor + 1;
      // moves directly through slides scenario
      const directDistances = cursor - idx;
      
      if (directDistances < edgesDistances) {
        // console.log("@direction: LEFT; @steps: ", directDistances);
        handleJump(1, directDistances, idx);
      } else if (
        directDistances > edgesDistances &&
        edgesDistances <= visible
      ) {
        // console.log("@direction: RIGHT; @steps: ", edgesDistances);
        handleJump(-1, edgesDistances, idx);
      } else if (directDistances > edgesDistances && edgesDistances > visible) {
        // console.log("@direction: LEFT; @steps: ", directDistances);
        handleJump(1, directDistances, idx);
      } else if (
        directDistances === edgesDistances &&
        edgesDistances <= visible
      ) {
        // console.log("@direction: RIGHT; @steps: ", edgesDistances);
        handleJump(-1, edgesDistances, idx);
      } else if (
        directDistances === edgesDistances &&
        edgesDistances > visible
      ) {
        // console.log("@direction: LEFT; @steps: ", directDistances);
        handleJump(1, directDistances, idx);
      }
    }
  };

  /* LAYOUT EFFECTS */

  const addClones = useCallback(
    (slides) => {
      let beg = [...items].slice(items.length - slides);
      const end = [...items].slice(0, slides);

      beg = beg.concat(items).concat(end);

      setList(beg);
    },
    [items]
  );

  const remClones = useCallback(() => {
    setList([...items]);
  }, [items]);

  const handleResize = useCallback(() => {
    // console.log("@RESIZED");
    remClones();

    const margin = custom ? itemMargin : 0;
    const width = custom ? checkWidth(itemWidth) : window.innerWidth;

    setSlideHeight(calcHeight(width));

    const resized = width + 2 * margin;
    setSize(resized);

    const updated = Math.ceil(window.innerWidth / resized);
    if (updated > items.length) {
      // no sense of carousel
      setGallery(true);
    } else {
      // normal scenario
      setGallery(false);
      setSpw(updated);
      index.current = updated;
      setCursor(updated);
      addClones(updated);
    }

    if (reload) stopReload();
    if (loading) setLoading(false);
  }, [
    custom,
    reload,
    stopReload,
    loading,
    itemWidth,
    itemMargin,
    checkWidth,
    remClones,
    addClones,
    items.length,
  ]);

  const startResize = useCallback(() => {
    // setLoading(true);
    handleResize();
  }, [handleResize]);

  useLayoutEffect(() => {
    let mount = true;

    if (mount && down) {
      window.addEventListener(
        !mode ? "mousemove" : "touchmove",
        !mode ? mouseMove : touchMove
      );
    }

    if (mount && !down) {
      window.removeEventListener(
        !mode ? "mousemove" : "touchmove",
        !mode ? mouseMove : touchMove
      );
    }

    window.addEventListener("resize", startResize);

    return () => {
      mount = false;
      if (!mount) {
        window.removeEventListener(
          !mode ? "mousemove" : "touchmove",
          !mode ? mouseMove : touchMove
        );
      }

      window.removeEventListener("resize", startResize);
    };
  }, [down, mode, mouseMove, touchMove, startResize]);

  /* DATA CALC SECTION */

  const onMount = useCallback(() => {
    // console.log("@MOUNTED");
    handleResize();
  }, [handleResize]);

  const onUnMount = useCallback(() => {
    // console.log("@UN_MOUNTED");
    // setLoading(true);
  }, []);

  useEffect(() => {
    let mount = true;

    if (mount && !loading && reload) {
      handleResize();
    }

    if (mount && loading && !reload) {
      onMount();
    }

    return () => {
      mount = false;

      if (!mount && !loading) {
        onUnMount();
      }
    };
  }, [reload, loading, onMount, onUnMount, handleResize]);

  return (
    <Box
      id="slider"
      classes={{ root: classes.root }}
      style={{
        width: loading
          ? "300px"
          : gallery
          ? `${size * items.length}px`
          : `${size}px`,
        height: `${slideHeight}px`,
        overflowX: showOverflow ? "visible" : "hidden",
      }}
      onMouseDown={(e) => handleMouseDown(e)}
      onMouseUp={(e) => handleMouseUp(e)}
      onTouchStart={(e) => handleTouchStart(e)}
      onTouchEnd={(e) => handleTouchEnd(e)}
    >
      {loading && <Spinner />}
      {reload && <Spinner />}

      {!loading && !reload && !gallery && allowBorders && showOverflow && (
        <Box
          classes={{ root: classes.side }}
          className="left"
          style={{
            width: `calc(${size}px * ${spw / 2} - ${slideMargin}px)`,
            height: `${slideHeight}px`,
            left: `calc(-100% * ${spw / 2})`,
          }}
        ></Box>
      )}
      {!loading && !reload && !gallery && allowBorders && showOverflow && (
        <Box
          classes={{ root: classes.side }}
          className="right"
          style={{
            width: `calc(${size}px * ${spw / 2} - ${slideMargin}px)`,
            height: `${slideHeight}px`,
            right: `calc(-100% * ${spw / 2})`,
          }}
        ></Box>
      )}

      {!loading &&
        !reload &&
        !gallery &&
        springs.map(({ x, scale, display }, i) => (
          <animated.div
            key={i}
            className={down ? "slide grabbed" : "slide"}
            style={{
              width: `${slideWidth}px`,
              marginLeft: `${slideMargin}px`,
              marginRight: `${slideMargin}px`,
              display,
              transform: x.interpolate(
                (val) => `translate3d(${val}px, 0px, 0px)`
              ),
              WebkitTransform: x.interpolate(
                (val) => `translate3d(${val}px, 0px, 0px)`
              ),
            }}
            children={
              <animated.div
                className={classes.child}
                style={{
                  width: `${slideWidth}px`,
                  height: `${slideHeight}px`,
                  backgroundImage: `url(${list[i]})`,
                  transform: scale.interpolate((val) => `scale(${val})`),
                  WebkitTransform: scale.interpolate((val) => `scale(${val})`),
                }}
              ></animated.div>
            }
          />
        ))}

      {!loading && !reload && !gallery && showOverflow && allowActions && (
        <SliderActions
          onRight={handleRight}
          onLeft={handleLeft}
          overflow={custom ? showOverflow : true}
          borders={custom ? showBorders : false}
          itemWidth={size}
        />
      )}

      {!loading && !reload && !gallery && showOverflow && allowPips && (
        <Box component="div" classes={{ root: classes.dotsWrapper }}>
          {springs.map(({ scale, display }, i) => {
            if (i >= spw && i < list.length - spw) {
              return (
                <SliderPip
                  key={`slider-pip-${i}`}
                  scale={scale}
                  active={cursor === i}
                  jumpTo={() => jumpTo(i)}
                />
              );
            } else {
              return null;
            }
          })}
        </Box>
      )}

      {!loading && !reload && gallery && (
        <SliderGallery
          items={items}
          width={slideWidth}
          height={slideHeight}
          margin={slideMargin}
        />
      )}
    </Box>
  );
};

Slider.propTypes = {
  items: PropTypes.array.isRequired,
  reload: PropTypes.bool.isRequired,
  stopReload: PropTypes.func.isRequired,
  custom: PropTypes.bool,
  overflow: PropTypes.bool,
  showActions: PropTypes.bool,
  showBorders: PropTypes.bool,
  showPips: PropTypes.bool,
  itemMargin: PropTypes.number,
  itemWidth: PropTypes.number,
};

export default Slider;
