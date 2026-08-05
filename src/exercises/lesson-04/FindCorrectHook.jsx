// TOPIC: Choose the correct tool: useRef vs useState
// TASK: Make sure it updates the text *without* triggering a re-render
import { useRef } from 'react';

export default function FindCorrectHook() {
  //let clickCount = 0; // ← incorrect implementation
  const clickCount = useRef(0);

  function handleClick() {
    //clickCount++;
    clickCount.current++;
    document.getElementById('clickButton').textContent =
      `${clickCount.current} Clicks`;
  }

  return (
    <div>
      <h2>useRef vs useState Decision</h2>
      <button onClick={handleClick}>
        <span id="clickButton">{clickCount.current} Clicks</span>
      </button>
    </div>
  );
}
