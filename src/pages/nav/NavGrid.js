import { IoReceiptOutline } from "react-icons/io5";
import { MdNotificationsActive } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { routes } from "../../routes/routes";
import { TbMenuOrder } from "react-icons/tb";
import { MdAddChart } from "react-icons/md";
import { MdOutlineInventory } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { FaRegDotCircle } from "react-icons/fa";

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
        },{
            title: 'Customer Management',
            icon: FaRegDotCircle,
            onClick: () => null,
            description: 'Manage customer profiles, loyalty programs, and segmentation.'
        },{
            title: 'Sales Reports and Analytics',
            icon: FaRegDotCircle,
            onClick: () => null,
            description: 'View detailed sales performance, product insights, and revenue analysis.'
        },{
            title: 'Payment Processing',
            icon: FaRegDotCircle,
            onClick: () => null,
            description: 'Process payments, manage cash flow, and handle refunds.'
        },{
            title: 'Employee Management',
            icon: FaRegDotCircle,
            onClick: () => null,
            description: 'Track employee profiles, time clocks, payroll, and performance.'
        },{
            title: 'Purchase Orders and Suppliers',
            icon: FaRegDotCircle,
            onClick: () => null,
            description: 'Manage suppliers, track purchase orders, and record incoming stock.'
        },{
            title: 'Promotions and Discounts',
            icon: FaRegDotCircle,
            onClick: () => null,
            description: 'Create and manage promotions, coupons, and seasonal discounts.'
        },{
            title: 'Order History & Transaction Logs',
            icon: FaRegDotCircle,
            onClick: () => null,
            description: 'Access previous orders and track transaction history for audit.'
        },{
            title: 'Supplier/Inventory Alerts',
            icon: FaRegDotCircle,
            onClick: () => null,
            description: 'Get notifications on low stock levels, order replenishment, and expiring products.'
        },{
            title: 'Tax Settings & Compliance',
            icon: FaRegDotCircle,
            onClick: () => null,
            description: 'Configure tax rates and generate reports for regulatory compliance.'
        },{
            title: 'Mobile POS Integration',
            icon: FaRegDotCircle,
            onClick: () => null,
            description: 'Enable mobile POS for on-the-go sales and offline transaction processing.'
        },{
            title: 'Discount/Markup Management',
            icon: FaRegDotCircle,
            onClick: () => null,
            description: 'Manage product pricing, discounts, and markups for profitability.'
        },{
            title: 'Multi-location Support',
            icon: FaRegDotCircle,
            onClick: () => null,
            description: 'Manage multiple store locations and track inventory across them.'
        },{
            title: 'Integrations',
            icon: FaRegDotCircle,
            onClick: () => null,
            description: 'Integrate third-party tools like accounting software and e-commerce platforms.'
        },{
            title: 'Security & Permissions',
            icon: FaRegDotCircle,
            onClick: () => null,
            description: 'Set role-based permissions, secure data, and enable two-factor authentication.'
        },{
            title: 'Hardware Configuration',
            icon: FaRegDotCircle,
            onClick: () => null,
            description: 'Configure receipt printers, barcode scanners, and cash registers.'
        },{
            title: 'Gift Receipt Management',
            icon: FaRegDotCircle,
            onClick: () => null,
            description: 'Offer gift receipt options and track gift wrapping services.'
        },{
            title: 'Customer Feedback',
            icon: FaRegDotCircle,
            onClick: () => null,
            description: 'Collect and manage customer feedback and satisfaction surveys.'
        }
    ];

    return(
        <div className="container vh-100 overflow-auto">
            <div className="my-3 h4 text-center">Quick Access</div>
            <p className="text-center">Easily manage your workflow with the options below. Whether you’re entering new orders, tracking existing ones, checking inventory, or staying updated with notifications, everything you need is just a click away!</p>
            <div className="bg-dark mb-5">
                <hr></hr>
                <hr></hr>
            </div>
            <div className="row user-select-none">
                {navs.map((nav, key)=>(
                    <div className="col-12 col-xl-3 col-lg-4 col-sm-6 p-1 text-center" key={key}>
                        <div onClick={nav?.onClick} className="card card-hover bg-transparent rounded-3 overflow-hidden- h-100 pointer">
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