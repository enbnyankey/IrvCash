import React from 'react';
type InputFieldsProps ={
    label: string;
    type: string;
    placeholder:string,
    value: string,
    onChange: (e:React.ChangeEvent<HTMLInputElement>) => void
    required: boolean;
}

    const InputField : React.FC<InputFieldsProps> =({
        label, type, placeholder, value, onChange, required= false
    })=>(
    <div className="flex flex-col mb-4">
      <label className="mb-2 text-sm font-medium text-gray-700">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
    );
export default InputField