import TaskCard from "./TaskCard";

const TaskStepsRenderer = ({ steps, handleDeleteStep, handleTitleChange }) => {
  return (
    <div className="flex-1 space-y-6 overflow-y-auto px-4 py-6">
      {steps.length === 0 ? (
        <div className="flex h-full items-center justify-center text-xl text-gray-400">
          캡쳐된 내용이 없습니다.
        </div>
      ) : (
        steps.map((step, index) => (
          <div
            key={step.imageId}
            className="space-y-2"
          >
            <TaskCard
              index={index}
              imageId={step.imageId}
              image={step.url}
              text={step.text}
              onDelete={handleDeleteStep}
              onChangeText={handleTitleChange}
            />
            {index !== steps.length - 1 && (
              <div className="flex justify-center text-2xl text-gray-400">↓</div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default TaskStepsRenderer;
