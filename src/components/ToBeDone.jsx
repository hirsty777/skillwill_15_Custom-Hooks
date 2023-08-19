import React from "react"

// PureComponent prevents this component rendering when i change input values on parent component(addElelemnt)
const ToBeDone = ({name, id, action}) => {
        console.log("tobedone component")
        
        return(
            <div className="tbd-box">
                <div className="tbd">
                    <span className="tbd-text">{name}</span>
                    <button onClick={() => action(id)} className="tbd-btn">Done</button>
                </div>
            </div>
        )
}

export default React.memo(ToBeDone)