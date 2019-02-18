ScratchpadApis['OffAmazonPayments-Sandbox'] = {
    Name: 'Off-Amazon Payments Sandbox',
    Version: "2013-01-01",
    Groups: {
        "OffAmazonPayments-Sandbox": {
            Name: 'Off-Amazon Payments Sandbox',
            Path: "/OffAmazonPayments_Sandbox/2013-01-01",
            ApiCalls: {
                "GetServiceStatus": {
                    Parameters: []
                },
                "GetOrderReferenceDetails": {
                    Parameters: [
                        { Name: 'AmazonOrderReferenceId', DisplayName: '', Required: true },
                        { Name: 'AddressConsentToken', DisplayName: 'AddressConsentToken', Required: false }
                    ]
                },
                "SetOrderReferenceDetails": {
                    Parameters: [
                        { Name: 'AmazonOrderReferenceId', DisplayName: '', Required: true },
                        {
                            Name: 'OrderReferenceAttributes', DisplayName: 'Order Reference Attributes', Required: true, Type: 'Complex',
                            Parameters: [
                                { Name: 'OrderReferenceAttributes.OrderTotal.Amount', DisplayName: '', Required: true },
                                { Name: 'OrderReferenceAttributes.OrderTotal.CurrencyCode', DisplayName: '', Required: true },
                                { Name: 'OrderReferenceAttributes.SellerNote', DisplayName: 'SellerNote', Required: false, MaxLength: 1024 },
                                { Name: 'OrderReferenceAttributes.PlatformId', DisplayName: 'PlatformId', Required: false },
                                {
                                    Name: 'SellerOrderAttributes', DisplayName: 'SellerOrderAttributes', Required: false, Type: 'Complex',
                                    Parameters: [
                                        { Name: 'OrderReferenceAttributes.SellerOrderAttributes.SellerOrderId', DisplayName: 'NÃºmero de pedido de comerciante' },
                                        { Name: 'OrderReferenceAttributes.SellerOrderAttributes.StoreName', DisplayName: 'StoreName' },
                                        { Name: 'OrderReferenceAttributes.SellerOrderAttributes.CustomInformation', DisplayName: 'CustomInformation' }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                "SetOrderAttributes": {
                    Parameters: [
                        { Name: 'AmazonOrderReferenceId', DisplayName: '', Required: true },
                        {
                            Name: 'OrderAttributes', DisplayName: '', Required: false, Type: 'Complex',
                            Parameters: [
                                { Name: 'OrderAttributes.OrderTotal.Amount', DisplayName: '', Required: false },
                                { Name: 'OrderAttributes.OrderTotal.CurrencyCode', DisplayName: '', Required: false },
                                { Name: 'OrderAttributes.SellerNote', DisplayName: 'SellerNote', Required: false, MaxLength: 1024 },
                                { Name: 'OrderAttributes.PlatformId', DisplayName: 'PlatformId', Required: false },
                                {
                                    Name: 'SellerOrderAttributes', DisplayName: 'SellerOrderAttributes', Required: false, Type: 'Complex',
                                    Parameters: [
                                        { Name: 'OrderAttributes.SellerOrderAttributes.SellerOrderId', DisplayName: 'NÃºmero de pedido de comerciante' },
                                        { Name: 'OrderAttributes.SellerOrderAttributes.StoreName', DisplayName: 'StoreName' },
                                        { Name: 'OrderAttributes.SellerOrderAttributes.CustomInformation', DisplayName: 'CustomInformation' }
                                    ]
                                },
                                {
                                    Name: 'PaymentServiceProviderAttributes', DisplayName: '', Required: false, Type: 'Complex',
                                    Parameters: [
                                        { Name: 'OrderAttributes.PaymentServiceProviderAttributes.PaymentServiceProviderId', DisplayName: '', Required: false },
                                        { Name: 'OrderAttributes.PaymentServiceProviderAttributes.PaymentServiceProviderOrderId', DisplayName: '', Required: false }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                "ConfirmOrderReference": {
                    Parameters: [
                        { Name: 'AmazonOrderReferenceId', DisplayName: '', Required: true }
                    ]
                },
                "CancelOrderReference": {
                    Parameters: [
                        { Name: 'AmazonOrderReferenceId', DisplayName: '', Required: true },
                        { Name: 'CancelationReason', DisplayName: '', Required: false, MaxLength: 1024 }
                    ]
                },
                "CloseOrderReference": {
                    Parameters: [
                        { Name: 'AmazonOrderReferenceId', DisplayName: '', Required: true },
                        { Name: 'ClosureReason', DisplayName: 'Closure Reason', Required: false, MaxLength: 1024 }
                    ]
                },
                "ListOrderReference": {
                    Parameters: [
                        { Name: 'QueryId', DisplayName: '', Required: true },
                        { Name: 'QueryIdType', DisplayName: '', Required: true },
                        { Name: 'PaymentDomain', DisplayName: '', Required: true },
                        {
                            Name: 'CreatedTimeRange', DisplayName: '', Required: false, Type: 'Complex',
                            Parameters: [
                                { Name: 'CreatedTimeRange.StartTime', DisplayName: '', Type: 'Timestamp', Required: false },
                                { Name: 'CreatedTimeRange.EndTime', DisplayName: '', Type: 'Timestamp', Required: false }
                            ]
                        },
                        { Name: 'SortOrder', DisplayName: '', Required: false },
                        { Name: 'PageSize', DisplayName: '', Required: false },
                        { Name: 'OrderReferenceStatusListFilter.OrderReferenceStatus.-', DisplayName: '', Required: false, List: true }
                    ]
                },
                "ListOrderReferenceByNextToken": {
                    Parameters: [
                        { Name: 'NextPageToken', DisplayName: 'SÃ­mbolo token', Required: true }
                    ]
                },
                "Authorize": {
                    Parameters: [
                        { Name: 'AmazonOrderReferenceId', DisplayName: '', Required: true },
                        { Name: 'AuthorizationReferenceId', DisplayName: 'Authorization Reference Id', Required: true, MaxLength: 32 },
                        {
                            Name: 'AuthorizationAmount', DisplayName: 'Authorization Amount', Type: 'Complex', Required: true,
                            Parameters: [
                                { Name: 'AuthorizationAmount.CurrencyCode', DisplayName: 'Currency Code' },
                                { Name: 'AuthorizationAmount.Amount', DisplayName: 'Amount' }
                            ]
                        },
                        { Name: 'CaptureNow', DisplayName: 'Capture Now', Type: 'bde.Boolean' },
                        { Name: 'SoftDescriptor', DisplayName: 'Soft Descriptor', MaxLength: 16 },
                        { Name: 'SellerAuthorizationNote', DisplayName: 'Seller Authorization Note', Required: false, MaxLength: 255 },
                        { Name: 'TransactionTimeout', DisplayName: 'Transaction Timeout', Required: false }
                    ]
                },
                "GetAuthorizationDetails": {
                    Parameters: [
                        { Name: 'AmazonAuthorizationId', DisplayName: '', Required: true }
                    ]
                },
                "CloseAuthorization": {
                    Parameters: [
                        { Name: 'AmazonAuthorizationId', DisplayName: '', Required: true },
                        { Name: 'ClosureReason', DisplayName: 'Closure Reason', Required: false, MaxLength: 255 }
                    ]
                },
                "Capture": {
                    Parameters: [
                        { Name: 'AmazonAuthorizationId', DisplayName: '', Required: true },
                        { Name: 'CaptureReferenceId', DisplayName: '', Required: true, MaxLength: 32 },
                        {
                            Name: 'CaptureAmount', DisplayName: '', Required: true, Type: 'Complex',
                            Parameters: [
                                { Name: 'CaptureAmount.CurrencyCode', DisplayName: 'Currency Code' },
                                { Name: 'CaptureAmount.Amount', DisplayName: 'Amount' }
                            ]
                        },
                        { Name: 'SellerCaptureNote', DisplayName: '', Required: false, MaxLength: 255 },
                        { Name: 'SoftDescriptor', DisplayName: 'Soft Descriptor', Required: false, MaxLength: 16 }
                    ]
                },
                "GetCaptureDetails": {
                    Parameters: [
                        { Name: 'AmazonCaptureId', DisplayName: '', Required: true }
                    ]
                },
                "Refund": {
                    Parameters: [
                        { Name: 'AmazonCaptureId', DisplayName: '', Required: true },
                        { Name: 'RefundReferenceId', DisplayName: '', Required: true },
                        {
                            Name: 'RefundAmount', DisplayName: '', Required: true, Type: 'Complex',
                            Parameters: [
                                { Name: 'RefundAmount.CurrencyCode', DisplayName: 'Currency Code' },
                                { Name: 'RefundAmount.Amount', DisplayName: 'Amount' }
                            ]
                        },
                        { Name: 'SellerRefundNote', DisplayName: '', Required: false, MaxLength: 255 },
                        { Name: 'SoftDescriptor', DisplayName: 'Soft Descriptor', Required: false, MaxLength: 16 }
                    ]
                },
                "GetRefundDetails": {
                    Parameters: [
                        { Name: 'AmazonRefundId', DisplayName: '', Required: true }
                    ]
                },
                "RefundPayment": {
                    Parameters: [
                        { Name: 'AmazonTransactionId', DisplayName: '', Required: true },
                        { Name: 'AmazonTransactionIdType', DisplayName: 'Id Type', Required: true },
                        { Name: 'RefundReferenceId', DisplayName: '', Required: true },
                        {
                            Name: 'RefundAmount', DisplayName: '', Required: true, Type: 'Complex',
                            Parameters: [
                                { Name: 'RefundAmount.CurrencyCode', DisplayName: 'Currency Code' },
                                { Name: 'RefundAmount.Amount', DisplayName: 'Amount' }
                            ]
                        },
                        { Name: 'SellerRefundNote', DisplayName: '', Required: false, MaxLength: 255 },
                        { Name: 'SoftDescriptor', DisplayName: 'Soft Descriptor', Required: false, MaxLength: 16 },
                        {
                            Name: 'ProviderCreditReversalList', DisplayName: '', Required: false, List: true, Type: 'Complex',
                            Parameters: [
                                { Name: 'ProviderCreditReversalList.-.ProviderId', DisplayName: '' },
                                { Name: 'ProviderCreditReversalList.-.Price.Amount', DisplayName: 'Amount' },
                                { Name: 'ProviderCreditReversalList.-.Price.CurrencyCode', DisplayName: 'Currency Code' }
                            ]
                        }
                    ]
                },
                "CreateOrderReferenceForId": {
                    Parameters: [
                        { Name: 'Id', DisplayName: 'Id', Required: true },
                        { Name: 'IdType', DisplayName: 'Id Type', Required: true },
                        { Name: 'InheritShippingAddress', DisplayName: 'Inherit Shipping Address', Type: 'bde.Boolean' },
                        { Name: 'ConfirmNow', DisplayName: 'Confirm Now', Type: 'bde.Boolean' },
                        {
                            Name: 'OrderReferenceAttributes', DisplayName: 'Order Reference Attributes', Type: 'Complex',
                            Parameters: [
                                {
                                    Name: 'OrderReferenceAttributes.OrderTotal', DisplayName: 'OrderTotal', Required: true, Type: 'Complex',
                                    Parameters: [
                                        { Name: 'OrderReferenceAttributes.OrderTotal.CurrencyCode', DisplayName: 'Currency Code', Required: true },
                                        { Name: 'OrderReferenceAttributes.OrderTotal.Amount', DisplayName: 'Amount', Required: true }
                                    ]
                                },
                                { Name: 'OrderReferenceAttributes.PlatformId', DisplayName: 'PlatformId' },
                                { Name: 'OrderReferenceAttributes.SellerNote', DisplayName: 'SellerNote', MaxLength: 1024 },
                                {
                                    Name: 'OrderReferenceAttributes.SellerOrderAttributes', DisplayName: 'SellerOrderAttributes', Type: 'Complex',
                                    Parameters: [
                                        { Name: 'OrderReferenceAttributes.SellerOrderAttributes.SellerOrderId', DisplayName: 'NÃºmero de pedido de comerciante' },
                                        { Name: 'OrderReferenceAttributes.SellerOrderAttributes.StoreName', DisplayName: 'StoreName' },
                                        { Name: 'OrderReferenceAttributes.SellerOrderAttributes.CustomInformation', DisplayName: 'CustomInformation' }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                "GetBillingAgreementDetails": {
                    Parameters: [
                        { Name: 'AmazonBillingAgreementId', DisplayName: 'Amazon Billing Agreement Id', Required: true },
                        { Name: 'AddressConsentToken', DisplayName: 'AddressConsentToken' }
                    ]
                },
                "SetBillingAgreementDetails": {
                    Parameters: [
                        { Name: 'AmazonBillingAgreementId', DisplayName: 'Amazon Billing Agreement Id', Required: true },
                        {
                            Name: 'BillingAgreementAttributes', DisplayName: 'Billing Agreement Attributs', Required: true, Type: 'Complex',
                            Parameters: [
                                { Name: 'BillingAgreementAttributes.PlatformId', DisplayName: 'PlatformId' },
                                { Name: 'BillingAgreementAttributes.SellerNote', DisplayName: 'SellerNote', MaxLength: 1024 },
                                {
                                    Name: 'BillingAgreementAttributes.SellerBillingAgreementAttributes', DisplayName: 'Seller Billing Agreement Attributes', Type: 'Complex',
                                    Parameters: [
                                        { Name: 'BillingAgreementAttributes.SellerBillingAgreementAttributes.SellerBillingAgreementId', DisplayName: 'Seller Billing Agreement Id' },
                                        { Name: 'BillingAgreementAttributes.SellerBillingAgreementAttributes.StoreName', DisplayName: 'StoreName' },
                                        { Name: 'BillingAgreementAttributes.SellerBillingAgreementAttributes.CustomInformation', DisplayName: 'CustomInformation' }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                "ConfirmBillingAgreement": {
                    Parameters: [
                        { Name: 'AmazonBillingAgreementId', DisplayName: 'Amazon Billing Agreement Id', Required: true }
                    ]
                },
                "ValidateBillingAgreement": {
                    Parameters: [
                        { Name: 'AmazonBillingAgreementId', DisplayName: 'Amazon Billing Agreement Id', Required: true }
                    ]
                },
                "AuthorizeOnBillingAgreement": {
                    Parameters: [
                        { Name: 'AmazonBillingAgreementId', DisplayName: 'Amazon Billing Agreement Id', Required: true },
                        { Name: 'AuthorizationReferenceId', DisplayName: 'Authorization Reference Id', Required: true, MaxLength: 32 },
                        {
                            Name: 'AuthorizationAmount', DisplayName: 'Authorization Amount', Required: true, Type: 'Complex',
                            Parameters: [
                                { Name: 'AuthorizationAmount.CurrencyCode', DisplayName: 'Currency Code' },
                                { Name: 'AuthorizationAmount.Amount', DisplayName: 'Amount' }
                            ]
                        },
                        { Name: 'SellerAuthorizationNote', DisplayName: 'Seller Authorization Note' },
                        { Name: 'TransactionTimeout', DisplayName: 'Transaction Timeout' },
                        { Name: 'CaptureNow', DisplayName: 'Capture Now', Type: 'bde.Boolean' },
                        { Name: 'SoftDescriptor', DisplayName: 'Soft Descriptor', MaxLength: 16 },
                        { Name: 'SellerNote', DisplayName: 'SellerNote', MaxLength: 1024 },
                        { Name: 'PlatformId', DisplayName: 'PlatformId' },
                        {
                            Name: 'SellerOrderAttributes', DisplayName: 'SellerOrderAttributes', Type: 'Complex',
                            Parameters: [
                                { Name: 'SellerOrderAttributes.SellerOrderId', DisplayName: 'NÃºmero de pedido de comerciante' },
                                { Name: 'SellerOrderAttributes.StoreName', DisplayName: 'StoreName' },
                                { Name: 'SellerOrderAttributes.CustomInformation', DisplayName: 'CustomInformation' }
                            ]
                        },
                        { Name: 'InheritShippingAddress', DisplayName: 'Inherit Shipping Address', Type: 'bde.Boolean' }

                    ]
                },
                "CloseBillingAgreement": {
                    Parameters: [
                        { Name: 'AmazonBillingAgreementId', DisplayName: 'Amazon Billing Agreement Id', Required: true },
                        { Name: 'ClosureReason', DisplayName: 'Closure Reason' }
                    ]
                },
                "GetMerchantAccountStatus": {
                    Parameters: []
                }
            }
        },
    }
}

ScratchpadApis['OffAmazonPayments'] = {
    Name: 'Fuera de Amazon Payments',
    Version: "2013-01-01",
    Groups: {
        "OffAmazonPayments": {
            Name: 'Fuera de Amazon Payments',
            Path: "/OffAmazonPayments/2013-01-01",
            ApiCalls: {
                "GetServiceStatus": {
                    Parameters: []
                },
                "GetOrderReferenceDetails": {
                    Parameters: [
                        { Name: 'AmazonOrderReferenceId', DisplayName: '', Required: true },
                        { Name: 'AddressConsentToken', DisplayName: 'AddressConsentToken', Required: false }
                    ]
                },
                "SetOrderReferenceDetails": {
                    Parameters: [
                        { Name: 'AmazonOrderReferenceId', DisplayName: '', Required: true },
                        {
                            Name: 'OrderReferenceAttributes', DisplayName: 'Order Reference Attributes', Required: true, Type: 'Complex',
                            Parameters: [
                                { Name: 'OrderReferenceAttributes.OrderTotal.Amount', DisplayName: '', Required: true },
                                { Name: 'OrderReferenceAttributes.OrderTotal.CurrencyCode', DisplayName: '', Required: true },
                                { Name: 'OrderReferenceAttributes.SellerNote', DisplayName: 'SellerNote', Required: false, MaxLength: 1024 },
                                { Name: 'OrderReferenceAttributes.PlatformId', DisplayName: 'PlatformId', Required: false },
                                {
                                    Name: 'SellerOrderAttributes', DisplayName: 'SellerOrderAttributes', Required: false, Type: 'Complex',
                                    Parameters: [
                                        { Name: 'OrderReferenceAttributes.SellerOrderAttributes.SellerOrderId', DisplayName: 'NÃºmero de pedido de comerciante' },
                                        { Name: 'OrderReferenceAttributes.SellerOrderAttributes.StoreName', DisplayName: 'StoreName' },
                                        { Name: 'OrderReferenceAttributes.SellerOrderAttributes.CustomInformation', DisplayName: 'CustomInformation' }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                "SetOrderAttributes": {
                    Parameters: [
                        { Name: 'AmazonOrderReferenceId', DisplayName: '', Required: true },
                        {
                            Name: 'OrderAttributes', DisplayName: '', Required: false, Type: 'Complex',
                            Parameters: [
                                { Name: 'OrderAttributes.OrderTotal.Amount', DisplayName: '', Required: false },
                                { Name: 'OrderAttributes.OrderTotal.CurrencyCode', DisplayName: '', Required: false },
                                { Name: 'OrderAttributes.SellerNote', DisplayName: 'SellerNote', Required: false, MaxLength: 1024 },
                                { Name: 'OrderAttributes.PlatformId', DisplayName: 'PlatformId', Required: false },
                                {
                                    Name: 'SellerOrderAttributes', DisplayName: 'SellerOrderAttributes', Required: false, Type: 'Complex',
                                    Parameters: [
                                        { Name: 'OrderAttributes.SellerOrderAttributes.SellerOrderId', DisplayName: 'NÃºmero de pedido de comerciante' },
                                        { Name: 'OrderAttributes.SellerOrderAttributes.StoreName', DisplayName: 'StoreName' },
                                        { Name: 'OrderAttributes.SellerOrderAttributes.CustomInformation', DisplayName: 'CustomInformation' }
                                    ]
                                },
                                {
                                    Name: 'PaymentServiceProviderAttributes', DisplayName: '', Required: false, Type: 'Complex',
                                    Parameters: [
                                        { Name: 'OrderAttributes.PaymentServiceProviderAttributes.PaymentServiceProviderId', DisplayName: '', Required: false },
                                        { Name: 'OrderAttributes.PaymentServiceProviderAttributes.PaymentServiceProviderOrderId', DisplayName: '', Required: false }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                "ConfirmOrderReference": {
                    Parameters: [
                        { Name: 'AmazonOrderReferenceId', DisplayName: '', Required: true }
                    ]
                },
                "CancelOrderReference": {
                    Parameters: [
                        { Name: 'AmazonOrderReferenceId', DisplayName: '', Required: true },
                        { Name: 'CancelationReason', DisplayName: '', Required: false, MaxLength: 1024 }
                    ]
                },
                "CloseOrderReference": {
                    Parameters: [
                        { Name: 'AmazonOrderReferenceId', DisplayName: '', Required: true },
                        { Name: 'ClosureReason', DisplayName: 'Closure Reason', Required: false, MaxLength: 1024 }
                    ]
                },
                "ListOrderReference": {
                    Parameters: [
                        { Name: 'QueryId', DisplayName: '', Required: true },
                        { Name: 'QueryIdType', DisplayName: '', Required: true },
                        { Name: 'PaymentDomain', DisplayName: '', Required: true },
                        {
                            Name: 'CreatedTimeRange', DisplayName: '', Required: false, Type: 'Complex',
                            Parameters: [
                                { Name: 'CreatedTimeRange.StartTime', DisplayName: '', Type: 'Timestamp', Required: false },
                                { Name: 'CreatedTimeRange.EndTime', DisplayName: '', Type: 'Timestamp', Required: false }
                            ]
                        },
                        { Name: 'SortOrder', DisplayName: '', Required: false },
                        { Name: 'PageSize', DisplayName: '', Required: false },
                        { Name: 'OrderReferenceStatusListFilter.OrderReferenceStatus.-', DisplayName: '', Required: false, List: true }
                    ]
                },
                "ListOrderReferenceByNextToken": {
                    Parameters: [
                        { Name: 'NextPageToken', DisplayName: 'SÃ­mbolo token', Required: true }
                    ]
                },
                "Authorize": {
                    Parameters: [
                        { Name: 'AmazonOrderReferenceId', DisplayName: '', Required: true },
                        { Name: 'AuthorizationReferenceId', DisplayName: 'Authorization Reference Id', Required: true, MaxLength: 32 },
                        {
                            Name: 'AuthorizationAmount', DisplayName: 'Authorization Amount', Required: true, Type: 'Complex',
                            Parameters: [
                                { Name: 'AuthorizationAmount.CurrencyCode', DisplayName: 'Currency Code' },
                                { Name: 'AuthorizationAmount.Amount', DisplayName: 'Amount' }
                            ]
                        },
                        { Name: 'CaptureNow', DisplayName: 'Capture Now', Type: 'bde.Boolean' },
                        { Name: 'SoftDescriptor', DisplayName: 'Soft Descriptor', MaxLength: 16 },
                        { Name: 'SellerAuthorizationNote', DisplayName: 'Seller Authorization Note', Required: false, MaxLength: 255 },
                        { Name: 'TransactionTimeout', DisplayName: 'Transaction Timeout', Required: false }
                    ]
                },
                "GetAuthorizationDetails": {
                    Parameters: [
                        { Name: 'AmazonAuthorizationId', DisplayName: '', Required: true }
                    ]
                },
                "CloseAuthorization": {
                    Parameters: [
                        { Name: 'AmazonAuthorizationId', DisplayName: '', Required: true },
                        { Name: 'ClosureReason', DisplayName: 'Closure Reason', Required: false, MaxLength: 255 }
                    ]
                },
                "Capture": {
                    Parameters: [
                        { Name: 'AmazonAuthorizationId', DisplayName: '', Required: true },
                        { Name: 'CaptureReferenceId', DisplayName: '', Required: true, MaxLength: 32 },
                        {
                            Name: 'CaptureAmount', DisplayName: '', Required: true, Type: 'Complex',
                            Parameters: [
                                { Name: 'CaptureAmount.CurrencyCode', DisplayName: 'Currency Code' },
                                { Name: 'CaptureAmount.Amount', DisplayName: 'Amount' }
                            ]
                        },
                        { Name: 'SellerCaptureNote', DisplayName: '', Required: false, MaxLength: 255 },
                        { Name: 'SoftDescriptor', DisplayName: 'Soft Descriptor', Required: false, MaxLength: 16 }
                    ]
                },
                "GetCaptureDetails": {
                    Parameters: [
                        { Name: 'AmazonCaptureId', DisplayName: '', Required: true }
                    ]
                },
                "Refund": {
                    Parameters: [
                        { Name: 'AmazonCaptureId', DisplayName: '', Required: true },
                        { Name: 'RefundReferenceId', DisplayName: '', Required: true },
                        {
                            Name: 'RefundAmount', DisplayName: '', Required: true, Type: 'Complex',
                            Parameters: [
                                { Name: 'RefundAmount.CurrencyCode', DisplayName: 'Currency Code' },
                                { Name: 'RefundAmount.Amount', DisplayName: 'Amount' }
                            ]
                        },
                        { Name: 'SellerRefundNote', DisplayName: '', Required: false, MaxLength: 255 },
                        { Name: 'SoftDescriptor', DisplayName: 'Soft Descriptor', Required: false, MaxLength: 16 }
                    ]
                },
                "GetRefundDetails": {
                    Parameters: [
                        { Name: 'AmazonRefundId', DisplayName: '', Required: true }
                    ]
                },
                "RefundPayment": {
                    Parameters: [
                        { Name: 'AmazonTransactionId', DisplayName: '', Required: true },
                        { Name: 'AmazonTransactionIdType', DisplayName: 'Id Type', Required: true },
                        { Name: 'RefundReferenceId', DisplayName: '', Required: true },
                        {
                            Name: 'RefundAmount', DisplayName: '', Required: true, Type: 'Complex',
                            Parameters: [
                                { Name: 'RefundAmount.CurrencyCode', DisplayName: 'Currency Code' },
                                { Name: 'RefundAmount.Amount', DisplayName: 'Amount' }
                            ]
                        },
                        { Name: 'SellerRefundNote', DisplayName: '', Required: false, MaxLength: 255 },
                        { Name: 'SoftDescriptor', DisplayName: 'Soft Descriptor', Required: false, MaxLength: 16 },
                        {
                            Name: 'ProviderCreditReversalList', DisplayName: '', Required: false, List: true, Type: 'Complex',
                            Parameters: [
                                { Name: 'ProviderCreditReversalList.-.ProviderId', DisplayName: '' },
                                { Name: 'ProviderCreditReversalList.-.Price.Amount', DisplayName: 'Amount' },
                                { Name: 'ProviderCreditReversalList.-.Price.CurrencyCode', DisplayName: 'Currency Code' }
                            ]
                        }
                    ]
                },
                "CreateOrderReferenceForId": {
                    Parameters: [
                        { Name: 'Id', DisplayName: 'Id', Required: true },
                        { Name: 'IdType', DisplayName: 'Id Type', Required: true },
                        { Name: 'InheritShippingAddress', DisplayName: 'Inherit Shipping Address', Type: 'bde.Boolean' },
                        { Name: 'ConfirmNow', DisplayName: 'Confirm Now', Type: 'bde.Boolean' },
                        {
                            Name: 'OrderReferenceAttributes', DisplayName: 'Order Reference Attributes', Type: 'Complex',
                            Parameters: [
                                {
                                    Name: 'OrderReferenceAttributes.OrderTotal', DisplayName: 'OrderTotal', Required: true, Type: 'Complex',
                                    Parameters: [
                                        { Name: 'OrderReferenceAttributes.OrderTotal.CurrencyCode', DisplayName: 'Currency Code', Required: true },
                                        { Name: 'OrderReferenceAttributes.OrderTotal.Amount', DisplayName: 'Amount', Required: true }
                                    ]
                                },
                                { Name: 'OrderReferenceAttributes.PlatformId', DisplayName: 'PlatformId' },
                                { Name: 'OrderReferenceAttributes.SellerNote', DisplayName: 'SellerNote', MaxLength: 1024 },
                                {
                                    Name: 'OrderReferenceAttributes.SellerOrderAttributes', DisplayName: 'SellerOrderAttributes', Type: 'Complex',
                                    Parameters: [
                                        { Name: 'OrderReferenceAttributes.SellerOrderAttributes.SellerOrderId', DisplayName: 'NÃºmero de pedido de comerciante' },
                                        { Name: 'OrderReferenceAttributes.SellerOrderAttributes.StoreName', DisplayName: 'StoreName' },
                                        { Name: 'OrderReferenceAttributes.SellerOrderAttributes.CustomInformation', DisplayName: 'CustomInformation' }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                "GetBillingAgreementDetails": {
                    Parameters: [
                        { Name: 'AmazonBillingAgreementId', DisplayName: 'Amazon Billing Agreement Id', Required: true },
                        { Name: 'AddressConsentToken', DisplayName: 'AddressConsentToken' }
                    ]
                },
                "SetBillingAgreementDetails": {
                    Parameters: [
                        { Name: 'AmazonBillingAgreementId', DisplayName: 'Amazon Billing Agreement Id', Required: true },
                        {
                            Name: 'BillingAgreementAttributes', DisplayName: 'Billing Agreement Attributs', Required: true, Type: 'Complex',
                            Parameters: [
                                { Name: 'BillingAgreementAttributes.PlatformId', DisplayName: 'PlatformId' },
                                { Name: 'BillingAgreementAttributes.SellerNote', DisplayName: 'SellerNote', MaxLength: 1024 },
                                {
                                    Name: 'BillingAgreementAttributes.SellerBillingAgreementAttributes', DisplayName: 'Seller Billing Agreement Attributes', Type: 'Complex',
                                    Parameters: [
                                        { Name: 'BillingAgreementAttributes.SellerBillingAgreementAttributes.SellerBillingAgreementId', DisplayName: 'Seller Billing Agreement Id' },
                                        { Name: 'BillingAgreementAttributes.SellerBillingAgreementAttributes.StoreName', DisplayName: 'StoreName' },
                                        { Name: 'BillingAgreementAttributes.SellerBillingAgreementAttributes.CustomInformation', DisplayName: 'CustomInformation' }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                "ConfirmBillingAgreement": {
                    Parameters: [
                        { Name: 'AmazonBillingAgreementId', DisplayName: 'Amazon Billing Agreement Id', Required: true }
                    ]
                },
                "ValidateBillingAgreement": {
                    Parameters: [
                        { Name: 'AmazonBillingAgreementId', DisplayName: 'Amazon Billing Agreement Id', Required: true }
                    ]
                },
                "AuthorizeOnBillingAgreement": {
                    Parameters: [
                        { Name: 'AmazonBillingAgreementId', DisplayName: 'Amazon Billing Agreement Id', Required: true },
                        { Name: 'AuthorizationReferenceId', DisplayName: 'Authorization Reference Id', Required: true, MaxLength: 32 },
                        {
                            Name: 'AuthorizationAmount', DisplayName: 'Authorization Amount', Required: true, Type: 'Complex',
                            Parameters: [
                                { Name: 'AuthorizationAmount.CurrencyCode', DisplayName: 'Currency Code' },
                                { Name: 'AuthorizationAmount.Amount', DisplayName: 'Amount' }
                            ]
                        },
                        { Name: 'SellerAuthorizationNote', DisplayName: 'Seller Authorization Note' },
                        { Name: 'TransactionTimeout', DisplayName: 'Transaction Timeout' },
                        { Name: 'CaptureNow', DisplayName: 'Capture Now', Type: 'bde.Boolean' },
                        { Name: 'SoftDescriptor', DisplayName: 'Soft Descriptor', MaxLength: 16 },
                        { Name: 'SellerNote', DisplayName: 'SellerNote', MaxLength: 1024 },
                        { Name: 'PlatformId', DisplayName: 'PlatformId' },
                        {
                            Name: 'SellerOrderAttributes', DisplayName: 'SellerOrderAttributes', Type: 'Complex',
                            Parameters: [
                                { Name: 'SellerOrderAttributes.SellerOrderId', DisplayName: 'NÃºmero de pedido de comerciante' },
                                { Name: 'SellerOrderAttributes.StoreName', DisplayName: 'StoreName' },
                                { Name: 'SellerOrderAttributes.CustomInformation', DisplayName: 'CustomInformation' }
                            ]
                        },
                        { Name: 'InheritShippingAddress', DisplayName: 'Inherit Shipping Address', Type: 'bde.Boolean' }

                    ]
                },
                "CloseBillingAgreement": {
                    Parameters: [
                        { Name: 'AmazonBillingAgreementId', DisplayName: 'Amazon Billing Agreement Id', Required: true },
                        { Name: 'ClosureReason', DisplayName: 'Closure Reason' }
                    ]
                },
                "GetMerchantAccountStatus": {
                    Parameters: []
                }
            }
        },
    }
}