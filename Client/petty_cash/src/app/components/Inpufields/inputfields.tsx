import React from "react";

type Props = {
  classname: string;
  placeholder: string;
  type: string;
  label: string;
  icon?: React.ReactNode;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Inputfields = (props: Props) => {
  return (
    <div className="flex items-center px-8 space-x-4 w-full mb-3">
      {/* Fixed width label */}
      {/* Input field takes remaining space */}
      <input
        className={`flex-1 p-1.5 rounded-md border text-sm font-medium border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${props.classname}`}
        type={props.type}
        value={props.value}
        placeholder={props.placeholder}
        onChange={props.onChange}
      />
    </div>
  );
};

export default Inputfields;
