<?php
namespace src\router;

use InvalidArgumentException;
use tools\infrastructure\Https;
use src\module\admin\service\AdminService;
use src\module\category\action\ListCategoriesAction;
use src\module\category\action\SetCategoryAction;
use src\module\customer\action\ListCustomersAction;
use src\module\customer\action\SetCustomerAction;
use src\module\discount\action\ListDiscountsAction;
use src\module\discount\action\SetDiscountAction;
use src\module\image\action\DeleteImageAction;
use src\module\image\action\UploadImageAction;
use src\module\item\action\ListItemsAction;
use src\module\item\action\SetItemAction;
use src\module\login\action\FetchSessionAction;
use src\module\login\action\GoogleLoginAction;
use src\module\login\action\LoginAction;
use src\module\login\action\LogoutAction;
use src\module\login\action\SendRecoveryEmailAction;
use src\module\login\action\UpdateCredentialAction;
use src\module\login\action\UpdateCredentialByTokenAction;
use src\module\order\action\ListOrdersAction;
use src\module\order\action\SetOrderAction;
use src\module\payment\action\CreatePaymentIntentAction;
use src\module\permissions\action\ListPermissionsAction;
use src\module\permissions\action\SetPermissionAction;
use src\module\tax\action\ListTaxesAction;
use src\module\tax\action\SetTaxAction;
use src\module\user\action\CreateGoogleUserAction;
use src\module\user\action\CreateUserAction;
use src\module\user\action\EditUserAction;
use src\module\user\action\FetchUserAction;
use src\module\user\action\ListUsersAction;
use src\schema\Schema;
use src\module\user\action\FetchAddressAction;
use src\module\user\action\SearchUsersAction;
use src\module\user\action\SetAddressAction;

class Router{
    protected Https $request;

    public function __construct($baseName){
        $this->request = new Https($baseName);
    }

    public function request(){
        return $this->request;
    }

    public function load(){
        $this->request->route('/schema', function ($req){
            $query = new Schema();
            $query->run();
            var_dump('Schema done running...');
        });

        /*$this->request->route('/truncate', function ($req){
            $query = new Truncate();
            $query->run();
        });*/

        $this->request->route('/test', function ($req){
            /*error_reporting(E_ALL);
            ini_set('display_errors', 1);*/
        });

        $this->request->route('/admin', function ($req){
            (new AdminService())->process();
            var_dump('Admin added...');
        });

        $this->request->route('/signin', function ($req){
            return new LoginAction();
        });

        $this->request->route('/google/signin', function ($req){
            return new GoogleLoginAction();
        });

        $this->request->route('/logout', function ($req){
            return new LogoutAction();
        });

        $this->request->route('/fetch/session', function ($req){
            return new FetchSessionAction();
        });

        $this->request->route('/update/credential', function ($req){
            return new UpdateCredentialAction();
        });

        $this->request->route('/recover/account', function ($req){
            return new SendRecoveryEmailAction();
        });

        $this->request->route('/list/users', function ($req){
            return new ListUsersAction();
        });

        $this->request->route('/create/user', function ($req){
            return new CreateUserAction();
        });

        $this->request->route('/create/google/user', function ($req){
            return new CreateGoogleUserAction();
        });

        $this->request->route('/edit/user', function ($req){
            return new EditUserAction();
        });

        $this->request->route('/fetch/user', function ($req){
            return new FetchUserAction();
        });

        $this->request->route('/search/users', function ($req){
            return new SearchUsersAction();
        });

        $this->request->route('/set/address', function ($req){
            return new SetAddressAction();
        });

        $this->request->route('/fetch/address', function ($req){
            return new FetchAddressAction();
        });

        $this->request->route('/update/credential/with/refersh/token', function ($req){
            return new UpdateCredentialByTokenAction();
        });

        $this->request->route('/set/category', function ($req){
            return new SetCategoryAction();
        });

        $this->request->route('/list/categories', function ($req){
            return new ListCategoriesAction();
        });

        $this->request->route('/set/customer', function ($req){
            return new SetCustomerAction();
        });

        $this->request->route('/list/customers', function ($req){
            return new ListCustomersAction();
        });

        $this->request->route('/set/discount', function ($req){
            return new SetDiscountAction();
        });

        $this->request->route('/list/discounts', function ($req){
            return new ListDiscountsAction();
        });

        $this->request->route('/set/item', function ($req){
            return new SetItemAction();
        });

        $this->request->route('/list/items', function ($req){
            return new ListItemsAction();
        });

        $this->request->route('/set/order', function ($req){
            return new SetOrderAction();
        });

        $this->request->route('/list/orders', function ($req){
            return new ListOrdersAction();
        });

        $this->request->route('/set/tax', function ($req){
            return new SetTaxAction();
        });

        $this->request->route('/list/taxes', function ($req){
            return new ListTaxesAction();
        });

        $this->request->route('/upload/image', function ($req){
            return new UploadImageAction();
        });

        $this->request->route('/delete/image', function ($req){
            return new DeleteImageAction();
        });

        $this->request->route('/set/permission', function ($req){
            return new SetPermissionAction();
        });

        $this->request->route('/list/permission', function ($req){
            return new ListPermissionsAction();
        });

        $this->request->route('/create/payment/intent', function ($req){
            return new CreatePaymentIntentAction();
        });
    }

    public function execute(){
        $this->request->__INIT__();
    }
}

?>
