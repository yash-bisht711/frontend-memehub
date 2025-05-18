import { NavLink } from "react-router-dom";

function LeftSideNav() {

    const navItems = [
        { name: "Feed", path: "/" },
        { name: "Create Meme", path: "/Create" },
        { name: "Dashboard", path: "/dashboard" },
    ];

    return (
        <div className="bg-surface-a0 border-r border-r-surface-a10 flex flex-col items-center w-80">
            <div className="flex flex-col items-center my-4 py-2 gap-1 border-b border-b-surface-a10">
                {navItems.map((item) => (
                    < NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) => {
                            const style = 'text-white bg-surface-a0 p-2 w-70 rounded-xl hover:bg-surface-a10';
                            return style + (isActive ? " bg-surface-a20 " : "")
                        }
                        }

                    >
                        {item.name}
                    </NavLink>
                ))
                }
            </div>
        </div >
    )
}

export default LeftSideNav;