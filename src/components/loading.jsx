import { AiOutlineLoading3Quarters } from 'react-icons/ai'

function Loading (){
    return(
        <div className="LoadingContainer">
            <div className='Loading'>
                <AiOutlineLoading3Quarters />    
            </div>        
        </div>
    )
}

export { Loading }