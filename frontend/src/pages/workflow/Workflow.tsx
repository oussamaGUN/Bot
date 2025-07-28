import MainBody from './main_body'
import LeftBar from './left_bar'

function Workflow() {
  return (
    <div className='h-screen w-screen flex'>
      <LeftBar />
      <MainBody />
    </div>
  )
}

export default Workflow
