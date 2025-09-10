import React from 'react'

type Props = {label:string, onClick:()=>void, classname:string}

const Button = (props: Props) => {
  return (
    <div>
        <div>
            <button className={props.classname} onClick={props.onClick}>{props.label}</button>
        </div>
    </div>
  )
}

export default Button