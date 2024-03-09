import { useRef } from 'react';
import './App.css';
import { useEffect } from 'react';
import TodoList from './Components/TodoList/TodoList';

function App() {
  const leftContainer = useRef(null);
  const rightContainer = useRef(null);
  const secondaryContainer = useRef(null);
  const parentContainer = useRef(null);
  const leftContainerBorder = useRef(null);
  const bottomContainerBorder = useRef(null);

  useEffect(() => {
    const leftContainerComponent = leftContainer.current;
    const rightContainerComponent = rightContainer.current;
    const secondaryContainerComponent = secondaryContainer.current;
    const parentContainerComponent = parentContainer.current;
    const leftContainerBorderComponent = leftContainerBorder.current;
    const bottomContainerBorderComponent = bottomContainerBorder.current;

    let Leftlistener = e => {
      let x = e.clientX;
      leftContainerComponent.style.width = x + 'px';
      rightContainerComponent.style.width = `calc(100% - ${x}px)`;
    };

    let prevY = 0;

    let rightListener = e => {
      if (prevY === 0) {
        prevY = parentContainerComponent.clientHeight;
      }
      let y = e.clientY;
      console.log(y, prevY, y - prevY, 'delta');
      let minHeight = 10;
      if (y < minHeight) {
        y = minHeight;
      }
      // leftContainer.style.height = y + 'px';
      // rightContainer.style.height = y + `px`;
      let secondaryHeight = secondaryContainerComponent.clientHeight;
      console.log(y, secondaryHeight, 'secondaryHeight');
      // formula 2: 100% - y - secondaryHeight
      // formula 1: y - secondaryHeight

      // y = y + secondaryHeight;
      parentContainerComponent.style.height = y + `px`;
      let delta = y - prevY;
      if (secondaryHeight - delta < minHeight) {
        secondaryContainerComponent.style.height = minHeight + 'px';
      } else
        secondaryContainerComponent.style.height = `calc( ${secondaryHeight}px - ${delta}px)`;
      prevY = y;
      // use both formulas to get the height of the secondary container
      // secondaryContainer.style.height = `calc( 100% + 1 * ${secondaryHeight}px - 2* ${y}px)`;
    };

    leftContainerBorderComponent.addEventListener('mousedown', e => {
      console.log('mousedown');
      document.addEventListener('mousemove', Leftlistener);
    });

    bottomContainerBorderComponent.addEventListener('mousedown', e => {
      console.log('mousedown');
      document.addEventListener('mousemove', rightListener);
    });

    document.addEventListener('mouseup', () => {
      console.log('mouseup');
      document.removeEventListener('mousemove', Leftlistener);
      document.removeEventListener('mousemove', rightListener);
    });
  }, []);
  return (
    <div className="main-container">
      <div className="parent-container" ref={parentContainer}>
        <div className="left-container" ref={leftContainer}>
          <TodoList window={1} />
          <button
            className="left-container-border"
            ref={leftContainerBorder}
          ></button>
        </div>
        <div className="right-container" ref={rightContainer}>
          <TodoList window={2} />
        </div>
        <buttton
          className="bottom-container-border"
          ref={bottomContainerBorder}
        ></buttton>
      </div>
      <div className="secondary-container" ref={secondaryContainer}>
        <TodoList window={3} />
      </div>
    </div>
  );
}

export default App;
