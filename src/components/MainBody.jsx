import LeftSideNav from "./LeftSideNav"
import RightSideNav from "./RightSideNav"

function MainBody({ children }) {

    return (
        <div className="grid grid-cols-4 w-full">
            <LeftSideNav />
            <div className='col-span-2 m-3'>
                {children}
            </div>
            <RightSideNav />
        </div>
    )
}

export default MainBody