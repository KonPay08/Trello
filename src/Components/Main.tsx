import { ClassAttributes, HTMLAttributes, LegacyRef, ReactNode, useState } from "react";
import { DragDropContext, Droppable, Draggable }  from "react-beautiful-dnd";
import { dummyData } from "./dummyData";
import { Card } from "./Card";

export const Main = () => {
  const [data, setData] = useState(dummyData);

  const onDragEnd = (result: any) => {
    const { source, destination } = result;
    if(source.droppableId !== destination.droppableId) {
      const sourceColIndex = data.findIndex((e) => e.id === source.droppableId);
      const destinationColIndex = data.findIndex((e) => e.id === destination.droppableId);
      const sourceCol = data[sourceColIndex];
      const destinationCol = data[destinationColIndex];
      const sourceTask = [...sourceCol.tasks];
      const destinationTask = [...destinationCol.tasks];
      const removed = sourceTask.splice(source.index, 1);
      destinationTask.splice(destination.index, 0, ...removed);
      data[sourceColIndex].tasks = sourceTask;
      data[destinationColIndex].tasks = destinationTask;
      setData(data);
    }
    const sourceColIndex = data.findIndex((e) => e.id === source.droppableId);
    console.log(sourceColIndex);
    const sourceCol = data[sourceColIndex];
    console.log(sourceCol);
    const sourceTask = [...sourceCol.tasks];
    const removed = sourceTask.splice(source.index, 1);
    sourceTask.splice(destination.index, 0, ...removed);
    data[sourceColIndex].tasks = sourceTask;
    setData(data);
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="trello"> 
        {data.map((section) => {
          return (
            <Droppable key={section.id} droppableId={section.id}>
              {(provided: {
                placeholder: ReactNode; innerRef: LegacyRef<HTMLDivElement> | undefined; droppableProps: JSX.IntrinsicAttributes & ClassAttributes<HTMLDivElement> & HTMLAttributes<HTMLDivElement>; draggableProps: JSX.IntrinsicAttributes & ClassAttributes<HTMLDivElement> & HTMLAttributes<HTMLDivElement>; dragHandleProps: JSX.IntrinsicAttributes & ClassAttributes<HTMLDivElement> & HTMLAttributes<HTMLDivElement>;}) => (
                <div 
                  className="trello-section"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <div className="trello-section-title">{section.title}</div>
                  <div className="trello-section-content">
                    {section.tasks.map((task, index) => {
                      return (
                        <Draggable 
                          key={task.id} 
                          draggableId={task.id} 
                          index={index}
                        >
                          {(provided: { innerRef: LegacyRef<HTMLDivElement> | undefined; draggableProps: JSX.IntrinsicAttributes & ClassAttributes<HTMLDivElement> & HTMLAttributes<HTMLDivElement>; dragHandleProps: JSX.IntrinsicAttributes & ClassAttributes<HTMLDivElement> & HTMLAttributes<HTMLDivElement>; }, 
                            snapshot: {isDragging: any;}) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={{
                                ...provided.draggableProps.style,
                                opacity: snapshot.isDragging ? "0.3" : "1",
                              }}
                            >
                              <Card>{task.title}</Card>
                            </div>
                          )}
                        </Draggable>
                      )
                    })}
                    {provided.placeholder}
                  </div>
                </div>
              )}
            </Droppable>
          )
        })}
      </div>
    </DragDropContext>
  );
};