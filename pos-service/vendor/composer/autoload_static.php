<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInit71120c75292eae0dbbda1b628875a0f1
{
    public static $files = array (
        'e39a8b23c42d4e1452234d762b03835a' => __DIR__ . '/..' . '/ramsey/uuid/src/functions.php',
    );

    public static $prefixLengthsPsr4 = array (
        'S' => 
        array (
            'Stripe\\' => 7,
        ),
        'R' => 
        array (
            'Ramsey\\Uuid\\' => 12,
            'Ramsey\\Collection\\' => 18,
        ),
        'P' => 
        array (
            'PHPMailer\\PHPMailer\\' => 20,
        ),
        'K' => 
        array (
            'Kyegil\\MysqliConnection\\' => 24,
        ),
        'B' => 
        array (
            'Brick\\Math\\' => 11,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'Stripe\\' => 
        array (
            0 => __DIR__ . '/..' . '/stripe/stripe-php/lib',
        ),
        'Ramsey\\Uuid\\' => 
        array (
            0 => __DIR__ . '/..' . '/ramsey/uuid/src',
        ),
        'Ramsey\\Collection\\' => 
        array (
            0 => __DIR__ . '/..' . '/ramsey/collection/src',
        ),
        'PHPMailer\\PHPMailer\\' => 
        array (
            0 => __DIR__ . '/..' . '/phpmailer/phpmailer/src',
        ),
        'Kyegil\\MysqliConnection\\' => 
        array (
            0 => __DIR__ . '/..' . '/kyegil/mysqli-connection',
        ),
        'Brick\\Math\\' => 
        array (
            0 => __DIR__ . '/..' . '/brick/math/src',
        ),
    );

    public static $classMap = array (
        'Composer\\InstalledVersions' => __DIR__ . '/..' . '/composer/InstalledVersions.php',
        'permission\\SqlRepository' => __DIR__ . '/..' . '/dotainion/query-permission/permission/SqlRepository.php',
        'permission\\database\\Column' => __DIR__ . '/..' . '/dotainion/query-permission/permission/database/Column.php',
        'permission\\database\\Join' => __DIR__ . '/..' . '/dotainion/query-permission/permission/database/Join.php',
        'permission\\database\\OrderBy' => __DIR__ . '/..' . '/dotainion/query-permission/permission/database/OrderBy.php',
        'permission\\database\\Pagination' => __DIR__ . '/..' . '/dotainion/query-permission/permission/database/Pagination.php',
        'permission\\database\\Permission' => __DIR__ . '/..' . '/dotainion/query-permission/permission/database/Permission.php',
        'permission\\database\\Table' => __DIR__ . '/..' . '/dotainion/query-permission/permission/database/Table.php',
        'permission\\database\\Where' => __DIR__ . '/..' . '/dotainion/query-permission/permission/database/Where.php',
        'permission\\infrastructure\\Collector' => __DIR__ . '/..' . '/dotainion/query-permission/permission/infrastructure/Collector.php',
        'permission\\infrastructure\\Factory' => __DIR__ . '/..' . '/dotainion/query-permission/permission/infrastructure/Factory.php',
        'permission\\infrastructure\\IRepo' => __DIR__ . '/..' . '/dotainion/query-permission/permission/infrastructure/IRepo.php',
        'permission\\infrastructure\\PermissionException' => __DIR__ . '/..' . '/dotainion/query-permission/permission/infrastructure/PermissionException.php',
        'permission\\infrastructure\\SqlId' => __DIR__ . '/..' . '/dotainion/query-permission/permission/infrastructure/SqlId.php',
        'permission\\permission\\action\\PermissionRepository' => __DIR__ . '/..' . '/dotainion/query-permission/permission/permisson/repository/PermissionRepository.php',
        'permission\\permission\\factory\\PermissionFactory' => __DIR__ . '/..' . '/dotainion/query-permission/permission/permisson/factory/PermissionFactory.php',
        'permission\\permission\\logic\\ListPermission' => __DIR__ . '/..' . '/dotainion/query-permission/permission/permisson/logic/ListPermission.php',
        'permission\\permission\\logic\\SavePermission' => __DIR__ . '/..' . '/dotainion/query-permission/permission/permisson/logic/SavePermission.php',
        'permission\\permission\\objects\\IPermission' => __DIR__ . '/..' . '/dotainion/query-permission/permission/permisson/objects/IPermission.php',
        'permission\\permission\\objects\\Permission' => __DIR__ . '/..' . '/dotainion/query-permission/permission/permisson/objects/Permission.php',
        'permission\\schema\\Schema' => __DIR__ . '/..' . '/dotainion/query-permission/permission/schema/Schema.php',
        'permission\\schema\\Table' => __DIR__ . '/..' . '/dotainion/query-permission/permission/schema/Table.php',
        'permission\\schema\\Truncate' => __DIR__ . '/..' . '/dotainion/query-permission/permission/schema/Truncate.php',
        'permission\\security\\Connection' => __DIR__ . '/..' . '/dotainion/query-permission/permission/security/Connection.php',
        'permission\\security\\DbCredentials' => __DIR__ . '/..' . '/dotainion/query-permission/permission/security/DbCredentials.php',
        'src\\infrastructure\\SearchRequest' => __DIR__ . '/../..' . '/src/infrastructure/SearchRequest.php',
        'src\\infrastructure\\Service' => __DIR__ . '/../..' . '/src/infrastructure/Service.php',
        'src\\module\\admin\\service\\AdminService' => __DIR__ . '/../..' . '/src/module/admin/service/AdminService.php',
        'src\\module\\calculation\\factory\\AmountFactory' => __DIR__ . '/../..' . '/src/module/calculation/factory/AmountFactory.php',
        'src\\module\\calculation\\logic\\Calculator' => __DIR__ . '/../..' . '/src/module/calculation/logic/Calculator.php',
        'src\\module\\calculation\\objects\\Amount' => __DIR__ . '/../..' . '/src/module/calculation/objects/Amount.php',
        'src\\module\\category\\action\\ListCategoriesAction' => __DIR__ . '/../..' . '/src/module/category/action/ListCategoriesAction.php',
        'src\\module\\category\\action\\SetCategoryAction' => __DIR__ . '/../..' . '/src/module/category/action/SetCategoryAction.php',
        'src\\module\\category\\factory\\CategoryFactory' => __DIR__ . '/../..' . '/src/module/category/factory/CategoryFactory.php',
        'src\\module\\category\\logic\\ListCategories' => __DIR__ . '/../..' . '/src/module/category/logic/ListCategories.php',
        'src\\module\\category\\logic\\SetCategory' => __DIR__ . '/../..' . '/src/module/category/logic/SetCategory.php',
        'src\\module\\category\\objects\\Category' => __DIR__ . '/../..' . '/src/module/category/objects/Category.php',
        'src\\module\\category\\repository\\CategoryRepository' => __DIR__ . '/../..' . '/src/module/category/repository/CategoryRepository.php',
        'src\\module\\category\\service\\ListCategoriesService' => __DIR__ . '/../..' . '/src/module/category/service/ListCategoriesService.php',
        'src\\module\\category\\service\\SetCategoryService' => __DIR__ . '/../..' . '/src/module/category/service/SetCategoryService.php',
        'src\\module\\customer\\action\\ListCustomersAction' => __DIR__ . '/../..' . '/src/module/customer/action/ListCustomersAction.php',
        'src\\module\\customer\\action\\SetCustomerAction' => __DIR__ . '/../..' . '/src/module/customer/action/SetCustomerAction.php',
        'src\\module\\customer\\factory\\CustomerFactory' => __DIR__ . '/../..' . '/src/module/customer/factory/CustomerFactory.php',
        'src\\module\\customer\\logic\\ListCustomers' => __DIR__ . '/../..' . '/src/module/customer/logic/ListCustomers.php',
        'src\\module\\customer\\logic\\SetCustomer' => __DIR__ . '/../..' . '/src/module/customer/logic/SetCustomer.php',
        'src\\module\\customer\\objects\\Customer' => __DIR__ . '/../..' . '/src/module/customer/objects/Customer.php',
        'src\\module\\customer\\repository\\CustomerRepository' => __DIR__ . '/../..' . '/src/module/customer/repository/CustomerRepository.php',
        'src\\module\\customer\\service\\ListCustomersService' => __DIR__ . '/../..' . '/src/module/customer/service/ListCustomersService.php',
        'src\\module\\customer\\service\\SetCustomerService' => __DIR__ . '/../..' . '/src/module/customer/service/SetCustomerService.php',
        'src\\module\\discount\\action\\ListDiscountsAction' => __DIR__ . '/../..' . '/src/module/discount/action/ListDiscountsAction.php',
        'src\\module\\discount\\action\\SetDiscountAction' => __DIR__ . '/../..' . '/src/module/discount/action/SetDiscountAction.php',
        'src\\module\\discount\\factory\\DiscountFactory' => __DIR__ . '/../..' . '/src/module/discount/factory/DiscountFactory.php',
        'src\\module\\discount\\logic\\ListDiscounts' => __DIR__ . '/../..' . '/src/module/discount/logic/ListDiscounts.php',
        'src\\module\\discount\\logic\\SetDiscount' => __DIR__ . '/../..' . '/src/module/discount/logic/SetDiscount.php',
        'src\\module\\discount\\objects\\Discount' => __DIR__ . '/../..' . '/src/module/discount/objects/Discount.php',
        'src\\module\\discount\\objects\\TypeValue' => __DIR__ . '/../..' . '/src/module/discount/objects/TypeValue.php',
        'src\\module\\discount\\repository\\DiscountRepository' => __DIR__ . '/../..' . '/src/module/discount/repository/DiscountRepository.php',
        'src\\module\\discount\\service\\ListDiscountsService' => __DIR__ . '/../..' . '/src/module/discount/service/ListDiscountsService.php',
        'src\\module\\discount\\service\\SetDiscountService' => __DIR__ . '/../..' . '/src/module/discount/service/SetDiscountService.php',
        'src\\module\\image\\action\\DeleteImageAction' => __DIR__ . '/../..' . '/src/module/image/action/DeleteImageAction.php',
        'src\\module\\image\\action\\UploadImageAction' => __DIR__ . '/../..' . '/src/module/image/action/UploadImageAction.php',
        'src\\module\\image\\factory\\ImageFactory' => __DIR__ . '/../..' . '/src/module/image/factory/ImageFactory.php',
        'src\\module\\image\\logic\\DeleteImages' => __DIR__ . '/../..' . '/src/module/image/logic/DeleteImages.php',
        'src\\module\\image\\logic\\ListImage' => __DIR__ . '/../..' . '/src/module/image/logic/ListImage.php',
        'src\\module\\image\\logic\\SaveImage' => __DIR__ . '/../..' . '/src/module/image/logic/SaveImage.php',
        'src\\module\\image\\objects\\Image' => __DIR__ . '/../..' . '/src/module/image/objects/Image.php',
        'src\\module\\image\\repository\\ImageRepository' => __DIR__ . '/../..' . '/src/module/image/repository/ImageRepository.php',
        'src\\module\\image\\service\\DeleteImageService' => __DIR__ . '/../..' . '/src/module/image/service/DeleteImageService.php',
        'src\\module\\image\\service\\UploadImageService' => __DIR__ . '/../..' . '/src/module/image/service/UploadImageService.php',
        'src\\module\\item\\action\\ListItemsAction' => __DIR__ . '/../..' . '/src/module/item/action/ListItemsAction.php',
        'src\\module\\item\\action\\SetItemAction' => __DIR__ . '/../..' . '/src/module/item/action/SetItemAction.php',
        'src\\module\\item\\factory\\ItemFactory' => __DIR__ . '/../..' . '/src/module/item/factory/ItemFactory.php',
        'src\\module\\item\\factory\\ItemLinkFactory' => __DIR__ . '/../..' . '/src/module/item/factory/ItemLinkFactory.php',
        'src\\module\\item\\logic\\AppendItemsRequirements' => __DIR__ . '/../..' . '/src/module/item/logic/AppendItemsRequirements.php',
        'src\\module\\item\\logic\\ListItemLinks' => __DIR__ . '/../..' . '/src/module/item/logic/ListItemLinks.php',
        'src\\module\\item\\logic\\ListItems' => __DIR__ . '/../..' . '/src/module/item/logic/ListItems.php',
        'src\\module\\item\\logic\\SetItem' => __DIR__ . '/../..' . '/src/module/item/logic/SetItem.php',
        'src\\module\\item\\logic\\SetItemLink' => __DIR__ . '/../..' . '/src/module/item/logic/SetItemLink.php',
        'src\\module\\item\\objects\\Item' => __DIR__ . '/../..' . '/src/module/item/objects/Item.php',
        'src\\module\\item\\objects\\ItemLink' => __DIR__ . '/../..' . '/src/module/item/objects/ItemLink.php',
        'src\\module\\item\\repository\\ItemLinkRepository' => __DIR__ . '/../..' . '/src/module/item/repository/ItemLinkRepository.php',
        'src\\module\\item\\repository\\ItemRepository' => __DIR__ . '/../..' . '/src/module/item/repository/ItemRepository.php',
        'src\\module\\item\\service\\ListItemsService' => __DIR__ . '/../..' . '/src/module/item/service/ListItemsService.php',
        'src\\module\\item\\service\\SetItemService' => __DIR__ . '/../..' . '/src/module/item/service/SetItemService.php',
        'src\\module\\login\\action\\FetchSessionAction' => __DIR__ . '/../..' . '/src/module/login/action/FetchSessionAction.php',
        'src\\module\\login\\action\\GoogleLoginAction' => __DIR__ . '/../..' . '/src/module/login/action/GoogleLoginAction.php',
        'src\\module\\login\\action\\LoginAction' => __DIR__ . '/../..' . '/src/module/login/action/LoginAction.php',
        'src\\module\\login\\action\\LogoutAction' => __DIR__ . '/../..' . '/src/module/login/action/LogoutAction.php',
        'src\\module\\login\\action\\SendRecoveryEmailAction' => __DIR__ . '/../..' . '/src/module/login/action/SendRecoveryEmailAction.php',
        'src\\module\\login\\action\\UpdateCredentialAction' => __DIR__ . '/../..' . '/src/module/login/action/UpdateCredentialAction.php',
        'src\\module\\login\\action\\UpdateCredentialByTokenAction' => __DIR__ . '/../..' . '/src/module/login/action/UpdateCredentialByTokenAction.php',
        'src\\module\\login\\service\\CreateCredentialService' => __DIR__ . '/../..' . '/src/module/login/service/CreateCredentialService.php',
        'src\\module\\login\\service\\CreateGoogleCredentialService' => __DIR__ . '/../..' . '/src/module/login/service/CreateGoogleCredentialService.php',
        'src\\module\\login\\service\\FetchSessionService' => __DIR__ . '/../..' . '/src/module/login/service/FetchSessionService.php',
        'src\\module\\login\\service\\GoogleLoginService' => __DIR__ . '/../..' . '/src/module/login/service/GoogleLoginService.php',
        'src\\module\\login\\service\\LoginService' => __DIR__ . '/../..' . '/src/module/login/service/LoginService.php',
        'src\\module\\login\\service\\LogoutService' => __DIR__ . '/../..' . '/src/module/login/service/LogoutService.php',
        'src\\module\\login\\service\\SendRecoverEmailService' => __DIR__ . '/../..' . '/src/module/login/service/SendRecoverEmailService.php',
        'src\\module\\login\\service\\UpdateCredentialByTokenService' => __DIR__ . '/../..' . '/src/module/login/service/UpdateCredentialByTokenService.php',
        'src\\module\\login\\service\\UpdateCredentialService' => __DIR__ . '/../..' . '/src/module/login/service/UpdateCredentialService.php',
        'src\\module\\mail\\action\\SendMailAction' => __DIR__ . '/../..' . '/src/module/mail/action/SendMailAction.php',
        'src\\module\\mail\\factory\\AttatchmentFactory' => __DIR__ . '/../..' . '/src/module/mail/factory/AttatchmentFactory.php',
        'src\\module\\mail\\factory\\MailFactory' => __DIR__ . '/../..' . '/src/module/mail/factory/MailFactory.php',
        'src\\module\\mail\\factory\\RecipientFactory' => __DIR__ . '/../..' . '/src/module/mail/factory/RecipientFactory.php',
        'src\\module\\mail\\logic\\RecoveryTemplate' => __DIR__ . '/../..' . '/src/module/mail/logic/RecoveryTemplate.php',
        'src\\module\\mail\\objects\\Attatchment' => __DIR__ . '/../..' . '/src/module/mail/objects/Attatchment.php',
        'src\\module\\mail\\objects\\Mail' => __DIR__ . '/../..' . '/src/module/mail/objects/Mail.php',
        'src\\module\\mail\\objects\\Recipient' => __DIR__ . '/../..' . '/src/module/mail/objects/Recipient.php',
        'src\\module\\mail\\service\\SendMailService' => __DIR__ . '/../..' . '/src/module/mail/service/SendMailService.php',
        'src\\module\\order\\action\\ListOrdersAction' => __DIR__ . '/../..' . '/src/module/order/action/ListOrdersAction.php',
        'src\\module\\order\\action\\SetOrderAction' => __DIR__ . '/../..' . '/src/module/order/action/SetOrderAction.php',
        'src\\module\\order\\factory\\AddonFactory' => __DIR__ . '/../..' . '/src/module/order/factory/AddonFactory.php',
        'src\\module\\order\\factory\\OrderFactory' => __DIR__ . '/../..' . '/src/module/order/factory/OrderFactory.php',
        'src\\module\\order\\factory\\OrderLineFactory' => __DIR__ . '/../..' . '/src/module/order/factory/OrderLineFactory.php',
        'src\\module\\order\\logic\\AppendOrderRequirements' => __DIR__ . '/../..' . '/src/module/order/logic/AppendOrderRequirements.php',
        'src\\module\\order\\logic\\ListAddons' => __DIR__ . '/../..' . '/src/module/order/logic/ListAddons.php',
        'src\\module\\order\\logic\\ListOrderLines' => __DIR__ . '/../..' . '/src/module/order/logic/ListOrderLines.php',
        'src\\module\\order\\logic\\ListOrders' => __DIR__ . '/../..' . '/src/module/order/logic/ListOrders.php',
        'src\\module\\order\\logic\\SetAddons' => __DIR__ . '/../..' . '/src/module/order/logic/SetAddons.php',
        'src\\module\\order\\logic\\SetOrder' => __DIR__ . '/../..' . '/src/module/order/logic/SetOrder.php',
        'src\\module\\order\\logic\\SetOrderLines' => __DIR__ . '/../..' . '/src/module/order/logic/SetOrderLines.php',
        'src\\module\\order\\objects\\Addon' => __DIR__ . '/../..' . '/src/module/order/objects/Addon.php',
        'src\\module\\order\\objects\\Order' => __DIR__ . '/../..' . '/src/module/order/objects/Order.php',
        'src\\module\\order\\objects\\OrderLine' => __DIR__ . '/../..' . '/src/module/order/objects/OrderLine.php',
        'src\\module\\order\\repository\\AddonRepository' => __DIR__ . '/../..' . '/src/module/order/repository/AddonRepository.php',
        'src\\module\\order\\repository\\OrderLineRepository' => __DIR__ . '/../..' . '/src/module/order/repository/OrderLineRepository.php',
        'src\\module\\order\\repository\\OrderRepository' => __DIR__ . '/../..' . '/src/module/order/repository/OrderRepository.php',
        'src\\module\\order\\service\\ListOrdersService' => __DIR__ . '/../..' . '/src/module/order/service/ListOrdersService.php',
        'src\\module\\order\\service\\SetOrderService' => __DIR__ . '/../..' . '/src/module/order/service/SetOrderService.php',
        'src\\module\\permissions\\action\\ListPermissionsAction' => __DIR__ . '/../..' . '/src/module/permissions/action/ListPermissionsAction.php',
        'src\\module\\permissions\\action\\SetPermissionAction' => __DIR__ . '/../..' . '/src/module/permissions/action/SetPermissionAction.php',
        'src\\module\\permissions\\objects\\Permission' => __DIR__ . '/../..' . '/src/module/permissions/objects/Permission.php',
        'src\\module\\permissions\\service\\ListPermissions' => __DIR__ . '/../..' . '/src/module/permissions/logic/ListPermissions.php',
        'src\\module\\permissions\\service\\ListPermissionsService' => __DIR__ . '/../..' . '/src/module/permissions/service/ListPermissionsService.php',
        'src\\module\\permissions\\service\\SetPermissionService' => __DIR__ . '/../..' . '/src/module/permissions/service/SetPermissionService.php',
        'src\\module\\tax\\action\\ListTaxesAction' => __DIR__ . '/../..' . '/src/module/tax/action/ListTaxesAction.php',
        'src\\module\\tax\\action\\SetTaxAction' => __DIR__ . '/../..' . '/src/module/tax/action/SetTaxAction.php',
        'src\\module\\tax\\factory\\TaxFactory' => __DIR__ . '/../..' . '/src/module/tax/factory/TaxFactory.php',
        'src\\module\\tax\\logic\\AppendTaxRequirements' => __DIR__ . '/../..' . '/src/module/tax/logic/AppendTaxRequirements.php',
        'src\\module\\tax\\logic\\ListTaxes' => __DIR__ . '/../..' . '/src/module/tax/logic/ListTaxes.php',
        'src\\module\\tax\\logic\\SetTax' => __DIR__ . '/../..' . '/src/module/tax/logic/SetTax.php',
        'src\\module\\tax\\objects\\Tax' => __DIR__ . '/../..' . '/src/module/tax/objects/Tax.php',
        'src\\module\\tax\\repository\\TaxRepository' => __DIR__ . '/../..' . '/src/module/tax/repository/TaxRepository.php',
        'src\\module\\tax\\service\\ListTaxesService' => __DIR__ . '/../..' . '/src/module/tax/service/ListTaxesService.php',
        'src\\module\\tax\\service\\SetTaxService' => __DIR__ . '/../..' . '/src/module/tax/service/SetTaxService.php',
        'src\\module\\user\\action\\CreateGoogleUserAction' => __DIR__ . '/../..' . '/src/module/user/action/CreateGoogleUserAction.php',
        'src\\module\\user\\action\\CreateUserAction' => __DIR__ . '/../..' . '/src/module/user/action/CreateUserAction.php',
        'src\\module\\user\\action\\EditUserAction' => __DIR__ . '/../..' . '/src/module/user/action/EditUserAction.php',
        'src\\module\\user\\action\\FetchAddressAction' => __DIR__ . '/../..' . '/src/module/user/action/FetchAddressAction.php',
        'src\\module\\user\\action\\FetchUserAction' => __DIR__ . '/../..' . '/src/module/user/action/FetchUserAction.php',
        'src\\module\\user\\action\\ListUsersAction' => __DIR__ . '/../..' . '/src/module/user/action/ListUsersAction.php',
        'src\\module\\user\\action\\SearchUsersAction' => __DIR__ . '/../..' . '/src/module/user/action/SearchUsersAction.php',
        'src\\module\\user\\action\\SetAddressAction' => __DIR__ . '/../..' . '/src/module/user/action/SetAddressAction.php',
        'src\\module\\user\\factory\\AddressFactory' => __DIR__ . '/../..' . '/src/module/user/factory/AddressFactory.php',
        'src\\module\\user\\factory\\UserFactory' => __DIR__ . '/../..' . '/src/module/user/factory/UserFactory.php',
        'src\\module\\user\\logic\\CreateUser' => __DIR__ . '/../..' . '/src/module/user/logic/CreateUser.php',
        'src\\module\\user\\logic\\EditUser' => __DIR__ . '/../..' . '/src/module/user/logic/EditUser.php',
        'src\\module\\user\\logic\\FetchAddress' => __DIR__ . '/../..' . '/src/module/user/logic/FetchAddress.php',
        'src\\module\\user\\logic\\FetchUser' => __DIR__ . '/../..' . '/src/module/user/logic/FetchUser.php',
        'src\\module\\user\\logic\\ListUsers' => __DIR__ . '/../..' . '/src/module/user/logic/ListUsers.php',
        'src\\module\\user\\logic\\SetAddress' => __DIR__ . '/../..' . '/src/module/user/logic/SetAddress.php',
        'src\\module\\user\\objects\\Address' => __DIR__ . '/../..' . '/src/module/user/objects/Address.php',
        'src\\module\\user\\objects\\User' => __DIR__ . '/../..' . '/src/module/user/objects/User.php',
        'src\\module\\user\\repository\\AddressRepository' => __DIR__ . '/../..' . '/src/module/user/repository/AddressRepository.php',
        'src\\module\\user\\repository\\UserRepository' => __DIR__ . '/../..' . '/src/module/user/repository/UserRepository.php',
        'src\\module\\user\\service\\CreateGoogleUserService' => __DIR__ . '/../..' . '/src/module/user/service/CreateGoogleUserService.php',
        'src\\module\\user\\service\\CreateUserService' => __DIR__ . '/../..' . '/src/module/user/service/CreateUserService.php',
        'src\\module\\user\\service\\EditUserService' => __DIR__ . '/../..' . '/src/module/user/service/EditUserService.php',
        'src\\module\\user\\service\\FetchAddressService' => __DIR__ . '/../..' . '/src/module/user/service/FetchAddressService.php',
        'src\\module\\user\\service\\FetchUserService' => __DIR__ . '/../..' . '/src/module/user/service/FetchUserService.php',
        'src\\module\\user\\service\\ListUsersService' => __DIR__ . '/../..' . '/src/module/user/service/ListUsersService.php',
        'src\\module\\user\\service\\SearchUsersService' => __DIR__ . '/../..' . '/src/module/user/service/SearchUsersService.php',
        'src\\module\\user\\service\\SetAddressService' => __DIR__ . '/../..' . '/src/module/user/service/SetAddressService.php',
        'src\\router\\Router' => __DIR__ . '/../..' . '/src/router/Router.php',
        'src\\schema\\Schema' => __DIR__ . '/../..' . '/src/schema/Schema.php',
        'tools\\SecurityTools' => __DIR__ . '/..' . '/dotainion/security-tools/tools/SecurityTools.php',
        'tools\\infrastructure\\ApiRequest' => __DIR__ . '/..' . '/dotainion/security-tools/tools/infrastructure/ApiRequest.php',
        'tools\\infrastructure\\Assert' => __DIR__ . '/..' . '/dotainion/security-tools/tools/infrastructure/Assert.php',
        'tools\\infrastructure\\BBCode' => __DIR__ . '/..' . '/dotainion/security-tools/tools/infrastructure/BBCode.php',
        'tools\\infrastructure\\ChainError' => __DIR__ . '/..' . '/dotainion/security-tools/tools/infrastructure/ChainError.php',
        'tools\\infrastructure\\Collector' => __DIR__ . '/..' . '/dotainion/security-tools/tools/infrastructure/Collector.php',
        'tools\\infrastructure\\DateHelper' => __DIR__ . '/..' . '/dotainion/security-tools/tools/infrastructure/DateHelper.php',
        'tools\\infrastructure\\Email' => __DIR__ . '/..' . '/dotainion/security-tools/tools/infrastructure/Email.php',
        'tools\\infrastructure\\Env' => __DIR__ . '/..' . '/dotainion/security-tools/tools/infrastructure/Env.php',
        'tools\\infrastructure\\ErrorMetaData' => __DIR__ . '/..' . '/dotainion/security-tools/tools/infrastructure/ErrorMetaData.php',
        'tools\\infrastructure\\Factory' => __DIR__ . '/..' . '/dotainion/security-tools/tools/infrastructure/Factory.php',
        'tools\\infrastructure\\Https' => __DIR__ . '/..' . '/dotainion/security-tools/tools/infrastructure/Https.php',
        'tools\\infrastructure\\IAction' => __DIR__ . '/..' . '/dotainion/security-tools/tools/infrastructure/IAction.php',
        'tools\\infrastructure\\ICredential' => __DIR__ . '/..' . '/dotainion/security-tools/tools/infrastructure/ICredential.php',
        'tools\\infrastructure\\IFactory' => __DIR__ . '/..' . '/dotainion/security-tools/tools/infrastructure/IFactory.php',
        'tools\\infrastructure\\IId' => __DIR__ . '/..' . '/dotainion/security-tools/tools/infrastructure/IId.php',
        'tools\\infrastructure\\IIdentifier' => __DIR__ . '/..' . '/dotainion/security-tools/tools/infrastructure/IIdentifier.php',
        'tools\\infrastructure\\IObjects' => __DIR__ . '/..' . '/dotainion/security-tools/tools/infrastructure/IObjects.php',
        'tools\\infrastructure\\IUser' => __DIR__ . '/..' . '/dotainion/security-tools/tools/infrastructure/IUser.php',
        'tools\\infrastructure\\Id' => __DIR__ . '/..' . '/dotainion/security-tools/tools/infrastructure/Id.php',
        'tools\\infrastructure\\ImageHelper' => __DIR__ . '/..' . '/dotainion/security-tools/tools/infrastructure/ImageHelper.php',
        'tools\\infrastructure\\NumberHelper' => __DIR__ . '/..' . '/dotainion/security-tools/tools/infrastructure/NumberHelper.php',
        'tools\\infrastructure\\ParseConfig' => __DIR__ . '/..' . '/dotainion/security-tools/tools/infrastructure/ParseConfig.php',
        'tools\\infrastructure\\Password' => __DIR__ . '/..' . '/dotainion/security-tools/tools/infrastructure/Password.php',
        'tools\\infrastructure\\Period' => __DIR__ . '/..' . '/dotainion/security-tools/tools/infrastructure/Period.php',
        'tools\\infrastructure\\Phone' => __DIR__ . '/..' . '/dotainion/security-tools/tools/infrastructure/Phone.php',
        'tools\\infrastructure\\Repository' => __DIR__ . '/..' . '/dotainion/security-tools/tools/infrastructure/Repository.php',
        'tools\\infrastructure\\Request' => __DIR__ . '/..' . '/dotainion/security-tools/tools/infrastructure/Request.php',
        'tools\\infrastructure\\SearchRequest' => __DIR__ . '/..' . '/dotainion/security-tools/tools/infrastructure/SearchRequest.php',
        'tools\\infrastructure\\SendMail' => __DIR__ . '/..' . '/dotainion/security-tools/tools/infrastructure/SendMail.php',
        'tools\\infrastructure\\Service' => __DIR__ . '/..' . '/dotainion/security-tools/tools/infrastructure/Service.php',
        'tools\\infrastructure\\StatusCode' => __DIR__ . '/..' . '/dotainion/security-tools/tools/infrastructure/StatusCode.php',
        'tools\\infrastructure\\TaxHelper' => __DIR__ . '/..' . '/dotainion/security-tools/tools/infrastructure/TaxHelper.php',
        'tools\\infrastructure\\Token' => __DIR__ . '/..' . '/dotainion/security-tools/tools/infrastructure/Token.php',
        'tools\\infrastructure\\exeptions\\InvalidRequirementException' => __DIR__ . '/..' . '/dotainion/security-tools/tools/infrastructure/exeptions/InvalidRequirementException.php',
        'tools\\infrastructure\\exeptions\\NoResultsException' => __DIR__ . '/..' . '/dotainion/security-tools/tools/infrastructure/exeptions/NoResultsException.php',
        'tools\\infrastructure\\exeptions\\NotAuthenticatedException' => __DIR__ . '/..' . '/dotainion/security-tools/tools/infrastructure/exeptions/NotAuthenticatedException.php',
        'tools\\infrastructure\\exeptions\\TokenExpiredException' => __DIR__ . '/..' . '/dotainion/security-tools/tools/infrastructure/exeptions/TokenExpiredException.php',
        'tools\\infrastructure\\exeptions\\UrlNotFoundException' => __DIR__ . '/..' . '/dotainion/security-tools/tools/infrastructure/exeptions/UrlNotFoundException.php',
        'tools\\module\\login\\factory\\CredentialFactory' => __DIR__ . '/..' . '/dotainion/security-tools/tools/module/login/factory/CredentialFactory.php',
        'tools\\module\\login\\logic\\CreateCredential' => __DIR__ . '/..' . '/dotainion/security-tools/tools/module/login/logic/CreateCredential.php',
        'tools\\module\\login\\logic\\UpdateCredential' => __DIR__ . '/..' . '/dotainion/security-tools/tools/module/login/logic/UpdateCredential.php',
        'tools\\module\\login\\objects\\Credential' => __DIR__ . '/..' . '/dotainion/security-tools/tools/module/login/objects/Credential.php',
        'tools\\module\\login\\repository\\CredentialRepository' => __DIR__ . '/..' . '/dotainion/security-tools/tools/module/login/repository/CredentialRepository.php',
        'tools\\module\\login\\service\\CreateCredentialService' => __DIR__ . '/..' . '/dotainion/security-tools/tools/module/login/service/CreateCredentialService.php',
        'tools\\module\\login\\service\\CreateGoogleCredentialService' => __DIR__ . '/..' . '/dotainion/security-tools/tools/module/login/service/CreateGoogleCredentialService.php',
        'tools\\module\\login\\service\\FetchSessionService' => __DIR__ . '/..' . '/dotainion/security-tools/tools/module/login/service/FetchSessionService.php',
        'tools\\module\\login\\service\\GoogleLoginService' => __DIR__ . '/..' . '/dotainion/security-tools/tools/module/login/service/GoogleLoginService.php',
        'tools\\module\\login\\service\\LoginService' => __DIR__ . '/..' . '/dotainion/security-tools/tools/module/login/service/LoginService.php',
        'tools\\module\\login\\service\\LogoutService' => __DIR__ . '/..' . '/dotainion/security-tools/tools/module/login/service/LogoutService.php',
        'tools\\module\\login\\service\\SendRecoverEmailService' => __DIR__ . '/..' . '/dotainion/security-tools/tools/module/login/service/SendRecoverEmailService.php',
        'tools\\module\\login\\service\\UpdateCredentialByTokenService' => __DIR__ . '/..' . '/dotainion/security-tools/tools/module/login/service/UpdateCredentialByTokenService.php',
        'tools\\module\\login\\service\\UpdateCredentialService' => __DIR__ . '/..' . '/dotainion/security-tools/tools/module/login/service/UpdateCredentialService.php',
        'tools\\module\\mail\\factory\\AttatchmentFactory' => __DIR__ . '/..' . '/dotainion/security-tools/tools/module/mail/factory/AttatchmentFactory.php',
        'tools\\module\\mail\\factory\\MailFactory' => __DIR__ . '/..' . '/dotainion/security-tools/tools/module/mail/factory/MailFactory.php',
        'tools\\module\\mail\\factory\\RecipientFactory' => __DIR__ . '/..' . '/dotainion/security-tools/tools/module/mail/factory/RecipientFactory.php',
        'tools\\module\\mail\\logic\\RecoveryTemplate' => __DIR__ . '/..' . '/dotainion/security-tools/tools/module/mail/logic/RecoveryTemplate.php',
        'tools\\module\\mail\\objects\\Attatchment' => __DIR__ . '/..' . '/dotainion/security-tools/tools/module/mail/objects/Attatchment.php',
        'tools\\module\\mail\\objects\\Mail' => __DIR__ . '/..' . '/dotainion/security-tools/tools/module/mail/objects/Mail.php',
        'tools\\module\\mail\\objects\\Recipient' => __DIR__ . '/..' . '/dotainion/security-tools/tools/module/mail/objects/Recipient.php',
        'tools\\module\\mail\\service\\SendMailService' => __DIR__ . '/..' . '/dotainion/security-tools/tools/module/mail/service/SendMailService.php',
        'tools\\schema\\Schema' => __DIR__ . '/..' . '/dotainion/security-tools/tools/schema/Schema.php',
        'tools\\security\\Login' => __DIR__ . '/..' . '/dotainion/security-tools/tools/security/Login.php',
        'tools\\security\\Logout' => __DIR__ . '/..' . '/dotainion/security-tools/tools/security/Logout.php',
        'tools\\security\\PasswordTrait' => __DIR__ . '/..' . '/dotainion/security-tools/tools/security/PasswordTrait.php',
        'tools\\security\\Security' => __DIR__ . '/..' . '/dotainion/security-tools/tools/security/Security.php',
        'tools\\security\\SecurityFactory' => __DIR__ . '/..' . '/dotainion/security-tools/tools/security/SecurityFactory.php',
        'tools\\security\\SecurityManager' => __DIR__ . '/..' . '/dotainion/security-tools/tools/security/SecurityManager.php',
        'tools\\security\\SecurityRepository' => __DIR__ . '/..' . '/dotainion/security-tools/tools/security/SecurityRepository.php',
        'tools\\security\\Session' => __DIR__ . '/..' . '/dotainion/security-tools/tools/security/Session.php',
        'tools\\security\\Setup' => __DIR__ . '/..' . '/dotainion/security-tools/tools/security/Setup.php',
        'tools\\security\\ValidatePassword' => __DIR__ . '/..' . '/dotainion/security-tools/tools/security/ValidatePassword.php',
        'tools\\stripe\\StripeCustomer' => __DIR__ . '/..' . '/dotainion/security-tools/tools/stripe/StripeCustomer.php',
        'tools\\stripe\\StripePayment' => __DIR__ . '/..' . '/dotainion/security-tools/tools/stripe/StripePayment.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInit71120c75292eae0dbbda1b628875a0f1::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInit71120c75292eae0dbbda1b628875a0f1::$prefixDirsPsr4;
            $loader->classMap = ComposerStaticInit71120c75292eae0dbbda1b628875a0f1::$classMap;

        }, null, ClassLoader::class);
    }
}
