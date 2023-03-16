import { useEffect, useRef, useState } from 'react';

import { region } from './assets/images';
import coordinatesData from './constants/Region1_Data.txt';
import Elements from './components/Elements';
import './App.css';

function App() {
  const parentRef = useRef(null);
  const [coordinates, setCoordinates] = useState([]);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const [isLoading, setIsLoading] = useState(true);

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
        const formatedData = data.slice(1);
        setCoordinates(formatedData);

        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    /* this calculates the entire space taken by the overlay elements. including the overlaps elements.
     the logic behind this is to have the width and height the image should take to place in the background.
  */
    if (parentRef.current) {
      const childElements = parentRef.current.querySelectorAll('.elements');
      let maxX = 0;
      let maxY = 0;

      childElements.forEach((child) => {
        const { right, bottom } = child.getBoundingClientRect();

        if (right > maxX) {
          maxX = right;
        }

        if (bottom > maxY) {
          maxY = bottom;
        }
      });

      setWidth(maxX);
      setHeight(maxY);
    }
  }, [coordinates]);

  return (
    <div
      id="parent"
      ref={parentRef}
      style={{
        position: 'relative',
        width: `${width}px`,
        height: `${height}px`,
      }}
    >
      {isLoading ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green-900"></div>
        </div>
      ) : (
        <img
          src="/Region1.jpg"
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
