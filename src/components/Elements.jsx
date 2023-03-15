import React, { useState } from 'react';

const Elements = (props) => {
  const { coordinates } = props;

  const [selectedIds, setSelectedIds] = useState([]);
  // Toggle selection of element with given ID
  const toggleElementSelection = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  // Get CSS class name for element with given ID
  const getElementClassName = (id) => {
    switch (id) {
      case 'Gene1':
        return 'bg-red';
      case 'Gene2':
        return 'bg-green';
      case 'Gene3':
        return 'bg-blue';
      case 'Gene4':
        return 'bg-yellow';
      case 'Gene5':
        return 'bg-orange';
      case 'Gene6':
        return 'bg-cyan';
      case 'Gene7':
        return 'bg-violet';
      default:
        return 'bg-gray';
    }
  };
  return (
    <div>
      {coordinates.map((element, index) => (
        <div
          className={`absolute  text-white cursor-pointer text-[16px]  ${getElementClassName(
            element.id
          )}-500 hover:${getElementClassName(
            element.id
          )}-800 hover:drop-shadow-lg p-1 rounded-lg`}
          style={{ left: `${element.x}px`, top: `${element.y}px` }}
          key={`${element.id}-${index}`}
          onClick={() => toggleElementSelection(element.id)}
        >
          {element.id}
        </div>
      ))}
      <div className="absolute top-0 left-0 m-4 ">
        <div className="fixed text-white">
          <label className="mr-2">Selected:</label>
          <input
            type="checkbox"
            className="mr-2"
            checked={selectedIds.includes('Gene1')}
            onChange={() => toggleElementSelection('Gene1')}
          />
          <label className="mr-2">Gene1</label>
          <input
            type="checkbox"
            className="mr-2"
            checked={selectedIds.includes('Gene2')}
            onChange={() => toggleElementSelection('Gene2')}
          />
          <label className="mr-2">Gene2</label>
          <input
            type="checkbox"
            className="mr-2"
            checked={selectedIds.includes('Gene3')}
            onChange={() => toggleElementSelection('Gene3')}
          />
          <label className="mr-2">Gene3</label>
          <input
            type="checkbox"
            className="mr-2"
            checked={selectedIds.includes('Gene4')}
            onChange={() => toggleElementSelection('Gene4')}
          />
          <label className="mr-2">Gene4</label>
          <input
            type="checkbox"
            className="mr-2"
            checked={selectedIds.includes('Gene5')}
            onChange={() => toggleElementSelection('Gene5')}
          />
          <label className="mr-2">Gene5</label>
          <input
            type="checkbox"
            className="mr-2"
            checked={selectedIds.includes('Gene6')}
            onChange={() => toggleElementSelection('Gene6')}
          />
          <label className="mr-2">Gene6</label>
          <input
            type="checkbox"
            className="mr-2"
            checked={selectedIds.includes('Gene7')}
            onChange={() => toggleElementSelection('Gene7')}
          />
          <label>Gene7</label>
        </div>
      </div>
    </div>
  );
};

export default Elements;
