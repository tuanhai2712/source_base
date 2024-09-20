import React from 'react';
import Board from 'react-trello-ts';
import data from './data.json';

export default function KanbanChart() {
  const components = {
    Card: (props: any) => CardCustom({ ...props }),
  };

  return (
    <div>
      <Board data={data} draggable editable canAddLanes components={components} />
    </div>
  );
}

function CardCustom(props: any) {
  const { laneId, id, description, title } = props;

  const handleClickCard = (cardId: any, datalaneId: any) => {
    alert(`Edit Card: ${cardId}, Lane: ${datalaneId}`);
  };

  return (
    <div
      onDoubleClick={() => handleClickCard(id, laneId)}
      style={{
        backgroundColor: 'white',
        borderRadius: '5px',
        padding: '5px',
        marginBottom: '5px',
      }}
    >
      <span>Customs Card</span>
      <div>Title: {title}</div>
      <div>{description}</div>
    </div>
  );
}
