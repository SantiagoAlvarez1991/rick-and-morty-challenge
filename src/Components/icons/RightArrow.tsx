import { FC } from "react"

interface Icon {
    className: string
    onClick: ()=> void
}

const RightArrow: FC<Icon> = ({ className, onClick }) => {
    return (        
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={className} onClick={onClick}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
      </svg>      
    )
}

export default RightArrow
