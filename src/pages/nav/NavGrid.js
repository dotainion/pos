import { IoReceiptOutline } from "react-icons/io5";
import { MdNotificationsActive } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { routes } from "../../routes/routes";
import { TbMenuOrder } from "react-icons/tb";
import { MdAddChart } from "react-icons/md";
import { MdOutlineInventory } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";

export const NavGrid = () =>{
    const navigate = useNavigate();

    const navs = [
        {
            title: 'Order Entry',
            icon: MdAddChart,
            onClick: ()=> navigate(routes.pos().default()),
            description: 'Completes the current sale by processing payment and finalizing the transaction.'
        },{
            title: 'Orders',
            icon: TbMenuOrder,
            onClick: ()=> navigate(routes.order().nested().orders()),
            description: 'Accesses and manages customer orders, allowing you to view, update, and track order'
        },{
            title: 'Inventory',
            icon: MdOutlineInventory,
            onClick: ()=> navigate(routes.inv().nested().items()),
            description: 'Manages product information and inventory, including adding, updating, and tracking'
        },{
            title: 'Notifications',
            icon: MdNotificationsActive,
            onClick: ()=> null,
            description: 'Displays real-time alerts and updates about system activities and important events.'
        },{
            title: 'Settings',
            icon: IoSettingsOutline,
            onClick: ()=> navigate(routes.setting().nested().users()),
            description: 'Displays real-time alerts and updates about system activities and important events.'
        },
    ];

    return(
        <div className="container vh-100 overflow-auto">
            <div className="my-3 h4 text-center">Quick Access</div>
            <p className="text-center">Easily manage your workflow with the options below. Whether you’re entering new orders, tracking existing ones, checking inventory, or staying updated with notifications, everything you need is just a click away!</p>
            <div className="bg-dark mb-5">
                <hr></hr>
                <hr></hr>
            </div>
            <div className="row">
                {navs.map((nav, key)=>(
                    <div className="col-12 col-xl-3 col-lg-4 col-sm-6 p-1 text-center" key={key}>
                        <div onClick={nav?.onClick} className="card card-hover bg-transparent rounded-3 overflow-hidden h-100 pointer">
                            <div className="card-body bg-transparent">
                                <p className="card-text text-primary my-4">
                                    <nav.icon className="display-5"/>
                                </p>
                                <h5 className="card-title">{nav.title}</h5>
                                <small>{nav.description}</small>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}