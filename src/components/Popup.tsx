export default function Popup({ message, condition }:any){
  return(
    <>
      {
        condition ? 
        <div
          className="w-[300px] h-[60px] inline-flex justify-center items-center text-2xl rounded-lg fixed border-t-[4px] bg-green-200 border-green-500 text-green-500 left-[40%] top-[40px] transform translate-[50%] z-50">
          { message }
        </div>
        :
        <div className="fixed border-t-[4px] bg-red-200 border-red-500 text-red-500">
          { message }
        </div>
      }
    </>
  )
}
