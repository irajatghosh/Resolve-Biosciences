import { useEffect, useRef, useState } from 'react';

import { region } from './assets/images';
import coordinatesData from './constants/Region1_Data.txt';
import Elements from './components/Elements';
import './App.css';

function App() {
  const parentRef = useRef(null);
  const [coordinates, setCoordinates] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  /* this calculates the entire space taken by the overlay elements. including the overlaps elements.
     the logic behind this is to have the width and height the image should take to place in the background.
  */
  function updateParentDimensions() {
    window.onload = () => {
      const childDivs = parentRef.current.querySelectorAll('div');
      let maxX = 0;
      let maxY = 0;

      childDivs.forEach((child) => {
        const childRect = child.getBoundingClientRect();
        const childX = childRect.x + childRect.width;
        const childY = childRect.y + childRect.height;

        if (childX > maxX) {
          maxX = childX;
        }

        if (childY > maxY) {
          maxY = childY;
        }
      });

      parentRef.current.style.minWidth = `${maxX}px`;
      parentRef.current.style.minHeight = `${maxY}px`;
    };
  }

  useEffect(() => {
    // fetching data from './constants/Region1_Data.txt' file and converting to array of objects.
    const fetchData = async () => {
      return new Promise((resolve, reject) => {
        fetch(coordinatesData)
          .then((response) => response.text())
          .then((data) => {
            const lines = data.split('\n');

            const parsedData = lines.map((line) => {
              const [X, Y, ID] = line.split('\t');
              return { x: parseInt(X), y: parseInt(Y), id: ID };
            });
            resolve(parsedData);
          })
          .catch((error) => reject(error));
      });
    };
    fetchData()
      .then((data) => {
        setCoordinates(data.slice(1));
        updateParentDimensions();
      })
      .catch((error) => console.log(error));
    // sometime the image takes a bit more time to load or the width and height size is not yet calculated on page reload.
    window.addEventListener('resize', updateParentDimensions);
    const img = new Image();
    img.src = region;
    img.addEventListener('load', () => {
      setIsLoading(false);
      updateParentDimensions();
    });
    return () => {
      window.removeEventListener('resize', updateParentDimensions);
      img.removeEventListener('load', () => {
        setIsLoading(false);
        updateParentDimensions();
      });
    };
  }, []);

  return (
    <div className="relative h-full w-full" ref={parentRef}>
      {isLoading ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green-900">
            loading...
          </div>
        </div>
      ) : (
        <img
          src={`${region}?${Math.random()}`}
          alt="region"
          loading="lazy"
          className="absolute inset-0 w-full h-full object-contain"
        />
      )}

      {!isLoading && <Elements coordinates={coordinates} />}
    </div>
  );
}

export default App;
