import { IoReceiptOutline } from "react-icons/io5";
import { MdNotificationsActive } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { routes } from "../../routes/routes";
import { TbMenuOrder } from "react-icons/tb";
import { MdAddChart } from "react-icons/md";

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
            title: 'Items',
            icon: IoReceiptOutline,
            onClick: ()=> navigate(routes.inv().nested().products()),
            description: 'Manages product information and inventory, including adding, updating, and tracking'
        },{
            title: 'Notifications',
            icon: MdNotificationsActive,
            onClick: ()=> null,
            description: 'Displays real-time alerts and updates about system activities and important events.'
        },
    ];

    return(
        <div className="container">
            <div className="my-3 h4">Transaction Overview</div>
            <p>Checkout, Orders, Items, and Notifications: facilitate smooth business operations by handling sales transactions, managing customer orders, updating inventory, and providing real-time alerts.</p>
            <div className="row">
                {navs.map((nav, key)=>(
                    <div className="col-12 col-xl-3 col-lg-4 col-md-6 p-1 text-center" key={key}>
                        <div onClick={nav?.onClick} className="card bg-transparent rounded-3 overflow-hidden h-100 pointer">
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