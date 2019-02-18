ScratchpadEnums['bde.Schedules'] = ["_15_MINUTES_", "_30_MINUTES_", "_1_HOUR_", "_2_HOURS_", "_4_HOURS_", "_8_HOURS_", "_12_HOURS_", "_72_HOURS_", "_1_DAY_", "_2_DAYS_", "_1_WEEK_", "_14_DAYS_", "_15_DAYS_", "_30_DAYS_", "_NEVER_"];
ScratchpadEnums['bde.FeedProcessingStatuses'] = ["_SUBMITTED_", "_IN_PROGRESS_", "_CANCELLED_", "_DONE_"];
ScratchpadEnums['bde.ReportProcessingStatuses'] = ["_SUBMITTED_", "_IN_PROGRESS_", "_CANCELLED_", "_DONE_", "_DONE_NO_DATA_"];
ScratchpadEnums['bde.Boolean'] = ["true", "false"];

ScratchpadApis['Feeds'] = {
    Name: "Feeds",
    Version: "2009-01-01",
    Groups: {
        "Feeds": {
            Name: "Feeds",
            Path: "/",
            ApiCalls: {
                "CancelFeedSubmissions": {
                    Parameters: [
                        { Name: 'FeedSubmissionIdList.Id.-', DisplayName: 'ID de envÃ­o', List: true, Required: false },
                        { Name: 'FeedTypeList.Type.-', DisplayName: 'Tipo de fichero', List: true },
                        { Name: 'SubmittedFromDate', DisplayName: 'Enviado desde', Type: 'Timestamp' },
                        { Name: 'SubmittedToDate', DisplayName: 'Enviado a', Type: 'Timestamp' }
                    ]
                },
                "GetFeedSubmissionList": {
                    Parameters: [
                        { Name: 'FeedSubmissionIdList.Id.-', List: true, DisplayName: 'ID de envÃ­o', Required: false },
                        { Name: 'MaxCount', DisplayName: 'Recuento mÃ¡ximo' },
                        { Name: 'FeedTypeList.Type.-', DisplayName: 'Tipo de fichero', List: true },
                        { Name: 'FeedProcessingStatusList.Status.-', DisplayName: 'Processing Status', List: true, Type: 'bde.FeedProcessingStatuses' },
                        { Name: 'SubmittedFromDate', DisplayName: 'Enviado desde', Type: 'Timestamp' },
                        { Name: 'SubmittedToDate', DisplayName: 'Enviado a', Type: 'Timestamp' }
                    ]
                },
                "GetFeedSubmissionListByNextToken": {
                    Parameters: [{ Name: 'NextToken', DisplayName: 'SÃ­mbolo token', Required: true }]
                },
                "GetFeedSubmissionCount": {
                    Parameters: [
                        { Name: 'FeedTypeList.Type.-', DisplayName: 'Tipo de fichero', List: true },
                        { Name: 'FeedProcessingStatusList.Status.-', DisplayName: 'Estado de procesamiento', List: true, Type: 'bde.FeedProcessingStatuses' },
                        { Name: 'SubmittedFromDate', DisplayName: 'Enviado desde', Type: 'Timestamp' },
                        { Name: 'SubmittedToDate', DisplayName: 'Enviado a', Type: 'Timestamp' }
                    ]
                },
                "GetFeedSubmissionResult": {
                    Parameters: [{ Name: 'FeedSubmissionId', DisplayName: 'ID de envÃ­o', Required: true }]
                },
                "SubmitFeed": {
                    Parameters: [
                        { Name: 'FeedType', DisplayName: 'Tipo de fichero', Required: true },
                        { Name: 'FeedOptions', DisplayName: '', Required: false },
                        { Name: 'MarketplaceIdList.Id.-', DisplayName: 'ID de mercado', List: true, Required: false },
                        { Name: 'PurgeAndReplace', DisplayName: 'Eliminar y reemplazar', Required: false, Type: 'Checkbox' }
                    ],
                    ShowFeed: true
                }
            }
        }
    }
};

ScratchpadApis['Reports'] = {
    Name: "Informes",
    Version: "2009-01-01",
    Groups: {
        "Reports": {
            Name: "Informes",
            Path: "/",
            ApiCalls: {
                "GetReport": {
                    Parameters: [{ Name: 'ReportId', DisplayName: 'NÃºmero de informe', Required: true }]
                },
                "GetReportCount": {
                    Parameters: [
                        { Name: 'ReportTypeList.Type.-', DisplayName: 'Tipo de informe', List: true },
                        { Name: 'Acknowledged', DisplayName: 'Reconocido', Type: 'bde.Boolean' },
                        { Name: 'AvailableFromDate', DisplayName: 'Disponible desde', Type: 'Timestamp' },
                        { Name: 'AvailableToDate', DisplayName: 'Disponible hasta', Type: 'Timestamp' }
                    ]
                },
                "GetReportList": {
                    Parameters: [
                        { Name: 'MaxCount', DisplayName: 'Recuento mÃ¡ximo' },
                        { Name: 'ReportTypeList.Type.-', DisplayName: 'Tipo de informe', List: true },
                        { Name: 'Acknowledged', DisplayName: 'Reconocido', Type: 'bde.Boolean' },
                        { Name: 'AvailableFromDate', DisplayName: 'Disponible desde', Type: 'Timestamp' },
                        { Name: 'AvailableToDate', DisplayName: 'Disponible hasta', Type: 'Timestamp' },
                        { Name: "ReportRequestIdList.Id.-", DisplayName: 'NÃºmero de informe', List: true }
                    ]
                },
                "GetReportListByNextToken": {
                    Parameters: [{ Name: 'NextToken', DisplayName: 'SÃ­mbolo token', Required: true }]
                },
                "GetReportRequestCount": {
                    Parameters: [
                        { Name: 'RequestedFromDate', DisplayName: 'Pedido desde', Type: 'Timestamp' },
                        { Name: 'RequestedToDate', DisplayName: 'Pedido a', Type: 'Timestamp' },
                        { Name: 'ReportTypeList.Type.-', DisplayName: 'Tipo de informe', List: true },
                        { Name: 'ReportProcessingStatusList.Status.-', DisplayName: 'Estado de procesamiento', List: true, Type: 'bde.ReportProcessingStatuses' }
                    ]
                },
                "GetReportRequestList": {
                    Parameters: [
                        { Name: 'MaxCount', DisplayName: 'Recuento mÃ¡ximo' },
                        { Name: 'RequestedFromDate', DisplayName: 'Pedido desde', Type: 'Timestamp' },
                        { Name: 'RequestedToDate', DisplayName: 'Pedido a', Type: 'Timestamp' },
                        { Name: "ReportRequestIdList.Id.-", DisplayName: 'NÃºmero de informe', List: true },
                        { Name: 'ReportTypeList.Type.-', DisplayName: 'Tipo de informe', List: true },
                        { Name: 'ReportProcessingStatusList.Status.-', DisplayName: 'Estado de procesamiento', List: true, Type: 'bde.ReportProcessingStatuses' }
                    ]
                },
                "GetReportRequestListByNextToken": {
                    Parameters: [{ Name: 'NextToken', DisplayName: 'SÃ­mbolo token', Required: true }]
                },
                "CancelReportRequests": {
                    Parameters: [
                        { Name: 'RequestedFromDate', DisplayName: 'Pedido desde', Type: 'Timestamp' },
                        { Name: 'RequestedToDate', DisplayName: 'Pedido a', Type: 'Timestamp' },
                        { Name: "ReportRequestIdList.Id.-", DisplayName: 'NÃºmero de informe', List: true },
                        { Name: 'ReportTypeList.Type.-', DisplayName: 'Tipo de informe', List: true },
                        { Name: 'ReportProcessingStatusList.Status.-', DisplayName: 'Estado de procesamiento', List: true, Type: 'bde.ReportProcessingStatuses' }
                    ]
                },
                "RequestReport": {
                    Parameters: [
                        { Name: 'ReportType', DisplayName: 'Tipo de informe', Required: true },
                        { Name: 'MarketplaceIdList.Id.-', DisplayName: 'ID de mercado', List: true, Required: false },
                        { Name: 'StartDate', DisplayName: 'Fecha de inicio', Type: 'Timestamp' },
                        { Name: 'EndDate', DisplayName: 'Fecha de finalizaciÃ³n', Type: 'Timestamp' },
                        { Name: 'ReportOptions', DisplayName: 'Report Options', Required: false }
                    ]
                }
            }
        },

        "ReportSchedule": {
            Name: "ProgramaciÃ³n de informes",
            Path: "/",
            ApiCalls: {
                "ManageReportSchedule": {
                    Parameters: [
                        { Name: 'ReportType', DisplayName: 'Tipo de informe', Required: true },
                        { Name: 'Schedule', DisplayName: 'Programar', Type: 'bde.Schedules', Required: true },
                        { Name: 'ScheduleDate', DisplayName: 'Fecha de programaciÃ³n', Type: 'Timestamp' }
                    ]
                },
                "GetReportScheduleList": {
                    Parameters: [{ Name: 'ReportTypeList.Type.-', DisplayName: 'Tipo de informe', List: true }]
                },
                "GetReportScheduleListByNextToken": {
                    Parameters: [{ Name: 'NextToken.-', DisplayName: 'SÃ­mbolo token', Required: true }]
                },
                "GetReportScheduleCount": {
                    Parameters: [{ Name: 'ReportTypeList.Type.-', DisplayName: 'Tipo de informe', List: true }]
                },
                "UpdateReportAcknowledgements": {
                    Parameters: [
                        { Name: 'ReportIdList.Id.-', List: true, DisplayName: 'NÃºmero de informe', Required: true },
                        { Name: 'Acknowledged', DisplayName: 'Reconocido', Type: 'bde.Boolean' }
                    ]
                }
            }
        } // end of ReportSchedule
    } // end of groups
};

ScratchpadEnums['fba.ResponseGroups'] = ["Basic", "Detailed"];
ScratchpadEnums['fba.ShippingSpeedCategory'] = ["Standard", "Expedited", "Priority"];
ScratchFBAOutboundParameters = {};

ScratchpadEnums['fba.FulfillmentPolicy'] = ["FillOrKill", "FillAll", "FillAllAvailable"];
ScratchpadEnums['fba.PageType'] = ["PackageLabel_Letter_2", "PackageLabel_Letter_4", "PackageLabel_Letter_6", "PackageLabel_A4_4", "PackageLabel_Plain_Paper"];
ScratchpadEnums['fba.ShipmentType'] = ["SP", "LTL", "TL"];
ScratchpadEnums['fba.UnitOfMeasure'] = ["inches", "centimeters"];
ScratchpadEnums['fba.UnitOfWeight'] = ["pounds", "kilograms"];
ScratchpadEnums['fba.SellerFreightClass'] = ['50', '55', '60', '65', '70', '77.5', '85', '92.5', '100', '110', '125', '150', '175', '200', '250', '300', '400', '500'];
ScratchpadEnums['fba.CurrencyCode'] = ['USD', 'GBP'];
ScratchpadEnums['fba.CarrierName'] = ['UNITED_PARCEL_SERVICE_INC', 'DHL_STANDARD'];

ScratchPadFulfillmentByAmazonParameters = {};
ScratchPadFulfillmentByAmazonParameters.PartneredSmallParcelDataCarrierName =
    { Name: "TransportDetails.PartneredSmallParcelData.CarrierName", DisplayName: "Carrier Name", Required: false, Type: "fba.CarrierName" };
ScratchpadApis['FulfillmentByAmazon'] = {
    Name: "GestiÃ³n logÃ­stica",
    Version: "2010-10-01",
    Groups: {
        "FulfillmentInbound": {
            Name: "EnvÃ­os entrantes",
            Path: "/FulfillmentInboundShipment/2010-10-01",
            ApiCalls: {
                "GetServiceStatus": {
                    Parameters: []
                },
                "GetPreorderInfo": {
                    Parameters: [
                        { Name: 'ShipmentId', DisplayName: "Id. de envÃ­o", Required: true }
                    ]
                },
                "ConfirmPreorder": {
                    Parameters: [
                        { Name: 'ShipmentId', DisplayName: "Id. de envÃ­o", Required: true },
                        { Name: "NeedByDate", DisplayName: "Need By Date", Type: 'DateString', Required: true }
                    ]
                },
                "ConfirmTransportRequest": {
                    Parameters: [
                        { Name: 'ShipmentId', DisplayName: "Id. de envÃ­o", Required: true }
                    ]
                },
                "CreateInboundShipment": {
                    Parameters: [
                        { Name: "ShipmentId", DisplayName: "Id. de envÃ­o", Required: true },
                        {
                            Name: "Inbound Shipment Header", DisplayName: "Encabezado de envÃ­o a Amazon", Type: 'Complex', Required: true,
                            Parameters: [
                                { Name: "InboundShipmentHeader.ShipmentName", DisplayName: "Nombre del envÃ­o", Required: true },
                                { Name: "InboundShipmentHeader.ShipFromAddress.Name", DisplayName: "Nombre", Required: true },
                                { Name: "InboundShipmentHeader.ShipFromAddress.AddressLine1", DisplayName: "DirecciÃ³n", Required: true },
                                { Name: "InboundShipmentHeader.ShipFromAddress.City", DisplayName: "Ciudad", Required: true },
                                { Name: "InboundShipmentHeader.ShipFromAddress.StateOrProvinceCode", DisplayName: "Ciudad", Required: true },
                                { Name: "InboundShipmentHeader.ShipFromAddress.PostalCode", DisplayName: "CÃ³digo postal", Required: true },
                                { Name: "InboundShipmentHeader.ShipFromAddress.CountryCode", DisplayName: "PaÃ­s", Required: true },
                                { Name: "InboundShipmentHeader.DestinationFulfillmentCenterId", DisplayName: "Dest. NÃºmero de centro logÃ­stico", Required: true },
                                { Name: "InboundShipmentHeader.ShipmentStatus", DisplayName: "Estado del envÃ­o" },
                                { Name: "InboundShipmentHeader.LabelPrepPreference", DisplayName: "Preferencia de preparaciÃ³n de etiqueta" }
                            ]
                        },
                        {
                            Name: "InboundShipmentItems", DisplayName: "ArtÃ­culos de envÃ­o a Amazon", Type: 'ComplexList', List: true, Required: true,
                            Parameters: [
                                { Name: "InboundShipmentItems.member.-.QuantityShipped", DisplayName: "Cantidad" },
                                { Name: "InboundShipmentItems.member.-.SellerSKU", DisplayName: "SKU" },
                                {
                                    Name: 'PrepDetailsList', DisplayName: 'Plan Request Items Prep List', Required: true, List: true, Type: 'Complex',
                                    Parameters: [
                                        { Name: "InboundShipmentItems.member.-.PrepDetailsList.PrepDetails.-.PrepInstruction", DisplayName: "Prep Instruction" },
                                        { Name: "InboundShipmentItems.member.-.PrepDetailsList.PrepDetails.-.PrepOwner", DisplayName: "Prep Owner" }
                                    ]
                                }
                            ]
                        },
                        {
                            Name: "Inbound Shipment Header", DisplayName: "Encabezado de envÃ­o a Amazon", Type: 'Complex', Required: false,
                            Parameters: [
                                { Name: "InboundShipmentHeader.ShipFromAddress.AddressLine2", DisplayName: "DirecciÃ³n", Required: false },
                                { Name: "InboundShipmentHeader.ShipFromAddress.DistrictOrCounty", DisplayName: "District or County", Required: false }
                            ]
                        }

                    ]
                },
                "CreateInboundShipmentPlan": {
                    Parameters: [
                        { Name: 'LabelPrepPreference', DisplayName: "Preferencia de preparaciÃ³n de etiqueta", Required: true },
                        {
                            Name: 'ShipFromAddress', DisplayName: "DirecciÃ³n desde la que se envÃ­a", Required: true, Type: 'Complex',
                            Parameters: [
                                { Name: 'ShipFromAddress.Name', DisplayName: "Nombre" },
                                { Name: 'ShipFromAddress.AddressLine1', DisplayName: "DirecciÃ³n" },
                                { Name: 'ShipFromAddress.City', DisplayName: "Ciudad" },
                                { Name: 'ShipFromAddress.StateOrProvinceCode', DisplayName: "Ciudad" },
                                { Name: 'ShipFromAddress.PostalCode', DisplayName: "CÃ³digo postal" },
                                { Name: 'ShipFromAddress.CountryCode', DisplayName: "PaÃ­s" },
                            ]
                        },
                        {
                            Name: 'InboundShipmentPlanRequestItems', DisplayName: 'Plan Request Items', Required: true, List: true, Type: 'ComplexList',
                            Parameters: [
                                { Name: "InboundShipmentPlanRequestItems.member.-.SellerSKU", DisplayName: "SKU" },
                                { Name: "InboundShipmentPlanRequestItems.member.-.ASIN", DisplayName: "ASIN" },
                                { Name: "InboundShipmentPlanRequestItems.member.-.Quantity", DisplayName: "Cantidad" },
                                { Name: "InboundShipmentPlanRequestItems.member.-.Condition", DisplayName: "CondiciÃ³n" },
                                {
                                    Name: 'PrepDetailsList', DisplayName: 'Plan Request Items Prep List', Required: true, List: true, Type: 'Complex',
                                    Parameters: [
                                        { Name: "InboundShipmentPlanRequestItems.member.-.PrepDetailsList.PrepDetails.-.PrepInstruction", DisplayName: "Prep Instruction" },
                                        { Name: "InboundShipmentPlanRequestItems.member.-.PrepDetailsList.PrepDetails.-.PrepOwner", DisplayName: "Prep Owner" }
                                    ]
                                }
                            ]
                        },
                        {
                            Name: 'ShipFromAddress', DisplayName: "DirecciÃ³n desde la que se envÃ­a", Required: false, Type: 'Complex',
                            Parameters: [
                                { Name: 'ShipFromAddress.AddressLine2', DisplayName: "DirecciÃ³n" },
                                { Name: 'ShipFromAddress.DistrictOrCounty', DisplayName: "District or County" }
                            ]
                        },
                        { Name: "ShipToCountryCode", DisplayName: "Ship to Country Code", Required: false },
                        { Name: "ShipToCountrySubdivisionCode", DisplayName: "Ship to Subdivision Code", Required: false }
                    ]
                },
                "EstimateTransportRequest": {
                    Parameters: [
                        { Name: 'ShipmentId', DisplayName: "Id. de envÃ­o", Required: true }
                    ]
                },
                "GetBillOfLading": {
                    Parameters: [
                        { Name: 'ShipmentId', DisplayName: "Id. de envÃ­o", Required: true }
                    ]
                },
                "GetPalletLabels": {
                    Parameters: [
                        { Name: 'ShipmentId', DisplayName: "Id. de envÃ­o", Required: true },
                        { Name: 'PageType', DisplayName: "Page Type", Required: true, Type: 'fba.PageType' },
                        { Name: 'NumberOfPallets', DisplayName: "Number of Pallets", Required: true }
                    ]
                },
                "GetPackageLabels": {
                    Parameters: [
                        { Name: 'ShipmentId', DisplayName: "Id. de envÃ­o", Required: true },
                        { Name: 'PageType', DisplayName: "Page Type", Required: true, Type: 'fba.PageType' },
                        { Name: 'NumberOfPackages', DisplayName: "Number of Packages", Required: false }
                    ]
                },
                "GetUniquePackageLabels": {
                    Parameters: [
                        { Name: 'ShipmentId', DisplayName: "Id. de envÃ­o", Required: true },
                        { Name: 'PageType', DisplayName: "Page Type", Required: true, Type: 'fba.PageType' },
                        { Name: 'PackageLabelsToPrint.member.-', DisplayName: "List of PackageLabelsToPrint. Scratchpad limits this list to 20 values.", List: true, Required: true }
                    ]
                },
                "GetTransportContent": {
                    Parameters: [
                        { Name: 'ShipmentId', DisplayName: "Id. de envÃ­o", Required: true }
                    ]
                },
                "ListInboundShipmentItems": {
                    Parameters: [
                        { Name: 'ShipmentId', DisplayName: "Id. de envÃ­o", Required: true },
                        { Name: 'LastUpdatedAfter', DisplayName: 'Ãšltima actualizaciÃ³n despuÃ©s del', Type: 'Timestamp' },
                        { Name: 'LastUpdatedBefore', DisplayName: 'Ãšltima actualizaciÃ³n antes del', Type: 'Timestamp' }
                    ]
                },
                "ListInboundShipmentItemsByNextToken": {
                    Parameters: [{ Name: 'NextToken', DisplayName: "SÃ­mbolo token", Required: true }]
                },
                "ListInboundShipments": {
                    Parameters: [
                        { Name: 'ShipmentStatusList.member.-', DisplayName: "Estado del envÃ­o", List: true, Required: false },
                        { Name: 'ShipmentIdList.member.-', DisplayName: "Id. de envÃ­o", List: true, Required: false },
                        { Name: 'LastUpdatedAfter', DisplayName: 'Ãšltima actualizaciÃ³n despuÃ©s del', Type: 'Timestamp' },
                        { Name: 'LastUpdatedBefore', DisplayName: 'Ãšltima actualizaciÃ³n antes del', Type: 'Timestamp' }
                    ]
                },
                "ListInboundShipmentsByNextToken": {
                    Parameters: [{ Name: 'NextToken', DisplayName: "SÃ­mbolo token", Required: true }]
                },
                "PutTransportContent": {
                    Parameters: [
                        { Name: "ShipmentId", DisplayName: "Id. de envÃ­o", Required: true },
                        { Name: "IsPartnered", DisplayName: "Is Partnered", Required: true, Type: "bde.Boolean" },
                        { Name: "ShipmentType", DisplayName: "Shipment Type", Required: true, Type: "fba.ShipmentType" },
                        {
                            Name: 'TransportDetails', DisplayName: "Transport Details", Required: false, Type: 'Complex',
                            Parameters: [
                                {
                                    Name: "TransportDetails.PartneredSmallParcelData", DisplayName: "Partnered Small Parcel Data", Required: false, Type: 'Complex',
                                    Parameters: [
                                        ScratchPadFulfillmentByAmazonParameters.PartneredSmallParcelDataCarrierName,
                                        {
                                            Name: "TransportDetails.PartneredSmallParcelData.PackageList", DisplayName: "Package List", Type: 'Complex', List: true, Required: false,
                                            Parameters: [
                                                { Name: "TransportDetails.PartneredSmallParcelData.PackageList.member.-.Weight.Value", DisplayName: "Weight" },
                                                { Name: "TransportDetails.PartneredSmallParcelData.PackageList.member.-.Weight.Unit", DisplayName: "Unit", Type: 'fba.UnitOfWeight' },
                                                { Name: "TransportDetails.PartneredSmallParcelData.PackageList.member.-.Dimensions.Length", DisplayName: "Length" },
                                                { Name: "TransportDetails.PartneredSmallParcelData.PackageList.member.-.Dimensions.Width", DisplayName: "Width" },
                                                { Name: "TransportDetails.PartneredSmallParcelData.PackageList.member.-.Dimensions.Height", DisplayName: "Height" },
                                                { Name: "TransportDetails.PartneredSmallParcelData.PackageList.member.-.Dimensions.Unit", DisplayName: "Unit", Type: 'fba.UnitOfMeasure' }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    Name: "TransportDetails.NonPartneredSmallParcelData", DisplayName: "", Required: false, Type: 'Complex',
                                    Parameters: [
                                        { Name: "TransportDetails.NonPartneredSmallParcelData.CarrierName", DisplayName: "Carrier Name" },
                                        {
                                            Name: "TransportDetails.NonPartneredSmallParcelData.PackageList", DisplayName: "Package List", Type: 'Complex', List: true, Required: false,
                                            Parameters: [
                                                { Name: "TransportDetails.NonPartneredSmallParcelData.PackageList.member.-.TrackingId", DisplayName: "Tracking Id" },
                                            ]
                                        }
                                    ]
                                },
                                {
                                    Name: "TransportDetails.PartneredLtlData", DisplayName: "", Required: false, Type: 'Complex',
                                    Parameters: [
                                        { Name: "TransportDetails.PartneredLtlData.Contact.Name", DisplayName: "Nombre", Required: false },
                                        { Name: "TransportDetails.PartneredLtlData.Contact.Phone", DisplayName: "", Required: false },
                                        { Name: "TransportDetails.PartneredLtlData.Contact.Email", DisplayName: "", Required: false },
                                        { Name: "TransportDetails.PartneredLtlData.Contact.Fax", DisplayName: "", Required: false },
                                        { Name: "TransportDetails.PartneredLtlData.BoxCount", DisplayName: "", Required: false },
                                        { Name: "TransportDetails.PartneredLtlData.SellerFreightClass", DisplayName: "", Type: 'fba.SellerFreightClass', Required: false },
                                        { Name: "TransportDetails.PartneredLtlData.FreightReadyDate", DisplayName: "", Type: 'DateString', Required: false },
                                        { Name: "TransportDetails.PartneredLtlData.TotalWeight.Value", DisplayName: "Total Weight" },
                                        { Name: "TransportDetails.PartneredLtlData.TotalWeight.Unit", DisplayName: "Unit", Type: 'fba.UnitOfWeight' },
                                        { Name: "TransportDetails.PartneredLtlData.SellerDeclaredValue.Value", DisplayName: "" },
                                        { Name: "TransportDetails.PartneredLtlData.SellerDeclaredValue.CurrencyCode", DisplayName: "Currency Code", Type: 'fba.CurrencyCode' },
                                        {
                                            Name: "TransportDetails.PartneredLtlData.PalletList", DisplayName: "", Type: 'Complex', List: 'true', Required: false,
                                            Parameters: [
                                                { Name: "TransportDetails.PartneredLtlData.PalletList.member.-.PalletNumber", DisplayName: "", Required: false },
                                                { Name: "TransportDetails.PartneredLtlData.PalletList.member.-.Dimensions.Length", DisplayName: "", Required: false },
                                                { Name: "TransportDetails.PartneredLtlData.PalletList.member.-.Dimensions.Width", DisplayName: "", Required: false },
                                                { Name: "TransportDetails.PartneredLtlData.PalletList.member.-.Dimensions.Height", DisplayName: "", Required: false },
                                                { Name: "TransportDetails.PartneredLtlData.PalletList.member.-.Dimensions.Unit", DisplayName: "", Type: 'fba.UnitOfMeasure', Required: false },
                                                { Name: "TransportDetails.PartneredLtlData.PalletList.member.-.Weight.Value", DisplayName: "Weight" },
                                                { Name: "TransportDetails.PartneredLtlData.PalletList.member.-.Weight.Unit", DisplayName: "Unit", Type: 'fba.UnitOfWeight' },
                                                { Name: "TransportDetails.PartneredLtlData.PalletList.member.-.IsStacked", DisplayName: "Is Stacked", Type: 'bde.Boolean', Required: false },
                                            ]
                                        },
                                    ]
                                },
                                {
                                    Name: "TransportDetails.NonPartneredLtlData", DisplayName: "", Required: false, Type: 'Complex',
                                    Parameters: [
                                        { Name: "TransportDetails.NonPartneredLtlData.CarrierName", DisplayName: "Carrier Name", Required: false },
                                        { Name: "TransportDetails.NonPartneredLtlData.ProNumber", DisplayName: "Pro Number", Required: false },
                                    ]
                                },
                            ]
                        }
                    ]
                },
                "VoidTransportRequest": {
                    Parameters: [
                        { Name: 'ShipmentId', DisplayName: "Id. de envÃ­o", Required: true }
                    ]
                },
                "UpdateInboundShipment": {
                    Parameters: [
                        { Name: 'ShipmentId', DisplayName: "Id. de envÃ­o", Required: true },
                        {
                            Name: "Inbound Shipment Header", DisplayName: "Encabezado de envÃ­o a Amazon", Type: 'Complex', Required: true,
                            Parameters: [
                                { Name: "InboundShipmentHeader.ShipmentName", DisplayName: "Nombre del envÃ­o", Required: true },
                                { Name: "InboundShipmentHeader.ShipFromAddress.Name", DisplayName: "Nombre", Required: true },
                                { Name: "InboundShipmentHeader.ShipFromAddress.AddressLine1", DisplayName: "DirecciÃ³n", Required: true },
                                { Name: "InboundShipmentHeader.ShipFromAddress.AddressLine2", DisplayName: "DirecciÃ³n", Required: true },
                                { Name: "InboundShipmentHeader.ShipFromAddress.City", DisplayName: "Ciudad", Required: true },
                                { Name: "InboundShipmentHeader.ShipFromAddress.StateOrProvinceCode", DisplayName: "Ciudad", Required: true },
                                { Name: "InboundShipmentHeader.ShipFromAddress.PostalCode", DisplayName: "CÃ³digo postal", Required: true },
                                { Name: "InboundShipmentHeader.ShipFromAddress.CountryCode", DisplayName: "PaÃ­s", Required: true },
                                { Name: "InboundShipmentHeader.ShipFromAddress.DistrictOrCounty", DisplayName: "District or County", Required: true },
                                { Name: "InboundShipmentHeader.DestinationFulfillmentCenterId", DisplayName: "Dest. NÃºmero de centro logÃ­stico", Required: true },
                                { Name: "InboundShipmentHeader.ShipmentStatus", DisplayName: "Estado del envÃ­o" },
                                { Name: "InboundShipmentHeader.LabelPrepPreference", DisplayName: "Preferencia de preparaciÃ³n de etiqueta" }
                            ]
                        },
                        {
                            Name: "InboundShipmentItems", DisplayName: "ArtÃ­culos de envÃ­o a Amazon", Type: 'ComplexList', List: true, Required: true,
                            Parameters: [
                                { Name: "InboundShipmentItems.member.-.QuantityShipped", DisplayName: "Cantidad" },
                                { Name: "InboundShipmentItems.member.-.SellerSKU", DisplayName: "SKU" },
                                {
                                    Name: 'PrepDetailsList', DisplayName: 'Plan Request Items Prep List', Required: true, List: true, Type: 'Complex',
                                    Parameters: [
                                        { Name: "InboundShipmentItems.member.-.PrepDetailsList.PrepDetails.-.PrepInstruction", DisplayName: "Prep Instruction" },
                                        { Name: "InboundShipmentItems.member.-.PrepDetailsList.PrepDetails.-.PrepOwner", DisplayName: "Prep Owner" }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                "GetPrepInstructionsForSKU": {
                    Parameters: [
                        {
                            Name: "SellerSKUList", DisplayName: "", Type: 'Complex', Required: true,
                            Parameters: [
                                { Name: "SellerSKUList.Id.-", DisplayName: "SKU", List: true, Required: true }
                            ]
                        },
                        { Name: "ShipToCountryCode", DisplayName: "Ship to Country Code", Required: true }
                    ]
                },
                "GetPrepInstructionsForASIN": {
                    Parameters: [
                        {
                            Name: "AsinList", DisplayName: "Seller ASIN List", Type: 'Complex', Required: true,
                            Parameters: [
                                { Name: "AsinList.Id.-", DisplayName: "ASIN", List: true, Required: true }
                            ]
                        },
                        { Name: "ShipToCountryCode", DisplayName: "Ship to Country Code", Required: true }
                    ]
                },
                "GetInboundGuidanceForASIN": {
                    Parameters: [
                        {
                            Name: "ASINList", DisplayName: "Seller ASIN List", Type: 'Complex', Required: true,
                            Parameters: [
                                { Name: "ASINList.Id.-", DisplayName: "ASIN", List: true, Required: true }
                            ]
                        },
                        { Name: "MarketplaceId", DisplayName: "ID de mercado", Required: true }
                    ]
                },
                "GetInboundGuidanceForSKU": {
                    Parameters: [
                        {
                            Name: "SellerSKUList", DisplayName: "", Type: 'Complex', Required: true,
                            Parameters: [
                                { Name: "SellerSKUList.Id.-", DisplayName: "SKU", List: true, Required: true }
                            ]
                        },
                        { Name: "MarketplaceId", DisplayName: "ID de mercado", Required: true }
                    ]
                },
            }
        },
        "FulfillmentInventory": {
            Name: "Inventario",
            Path: "/FulfillmentInventory/2010-10-01",
            ApiCalls: {
                "GetServiceStatus": {
                    Parameters: []
                },
                "ListInventorySupply": {
                    Parameters: [
                        { Name: 'SellerSkus.member.-', DisplayName: "SKU", List: true },
                        { Name: 'QueryStartDateTime', DisplayName: "Hora de inicio", Type: 'Timestamp' },
                        { Name: 'ResponseGroup', DisplayName: "", Type: 'fba.ResponseGroups' },
                        { Name: 'MarketplaceId', DisplayName: "" }
                    ]
                },
                "ListInventorySupplyByNextToken": {
                    Parameters: [{ Name: 'NextToken', DisplayName: "SÃ­mbolo token", Required: true }]
                }
            }
        },
        "FulfillmentOutbound": {
            Name: "EnvÃ­os salientes",
            Path: "/FulfillmentOutboundShipment/2010-10-01",
            ApiCalls: {
                "GetServiceStatus": {
                    Parameters: []
                },
                "CancelFulfillmentOrder": {
                    Parameters: [
                        { Name: 'SellerFulfillmentOrderId', DisplayName: "NÃºmero de pedido de gestiÃ³n logÃ­stica", Required: true }
                    ]
                },
                "CreateFulfillmentOrder": {
                    Parameters: [
                        { Name: 'MarketplaceId', DisplayName: 'ID de mercado', Required: false },
                        { Name: 'ShipFromCountryCode', DisplayName: "", Required: false },
                        { Name: 'SellerFulfillmentOrderId', DisplayName: "NÃºmero de pedido de gestiÃ³n logÃ­stica", Required: true },
                        { Name: 'ShippingSpeedCategory', DisplayName: "CategorÃ­a de velocidad de entrega", Required: true, Type: 'fba.ShippingSpeedCategory' },
                        { Name: 'DisplayableOrderId', DisplayName: "Id. de pedido", Required: true },
                        { Name: 'DisplayableOrderDateTime', DisplayName: "Date", Required: true, Type: 'Timestamp' },
                        { Name: 'DisplayableOrderComment', DisplayName: "Comentario", Required: true },
                        { Name: 'FulfillmentPolicy', DisplayName: "PolÃ­tica de gestiÃ³n logÃ­stica", Required: false, Type: 'fba.FulfillmentPolicy' },
                        { Name: 'FulfillmentAction', DisplayName: "Fulfillment Action", Required: false },
                        { Name: 'NotificationEmailList.member.-', DisplayName: "Correo de notificaciÃ³n", Required: false, List: true },
                        {
                            Name: 'DestinationAddress', DisplayName: "DirecciÃ³n de destino", Required: true, Type: 'Complex',
                            Parameters: [
                                { Name: 'DestinationAddress.Name', DisplayName: "Nombre" },
                                { Name: 'DestinationAddress.Line1', DisplayName: "DirecciÃ³n" },
                                { Name: 'DestinationAddress.Line2', DisplayName: "DirecciÃ³n" },
                                { Name: 'DestinationAddress.Line3', DisplayName: "Address 3" },
                                { Name: 'DestinationAddress.City', DisplayName: "Ciudad" },
                                { Name: 'DestinationAddress.StateOrProvinceCode', DisplayName: "Ciudad" },
                                { Name: 'DestinationAddress.PostalCode', DisplayName: "CÃ³digo postal" },
                                { Name: 'DestinationAddress.CountryCode', DisplayName: "PaÃ­s" },
                                { Name: 'DestinationAddress.DistrictOrCounty', DisplayName: "District or County" },
                                { Name: 'DestinationAddress.PhoneNumber', DisplayName: "Phone Number" }
                            ]
                        },
                        {
                            Name: 'Items', DisplayName: "Items", Type: 'Complex', Required: true, List: true,
                            Parameters: [
                                { Name: 'Items.member.-.DisplayableComment', DisplayName: "Comentario visualizable" },
                                { Name: 'Items.member.-.GiftMessage', DisplayName: "Mensaje del regalo" },
                                { Name: 'Items.member.-.PerUnitDeclaredValue.Value', DisplayName: "Valor declarado" },
                                { Name: 'Items.member.-.PerUnitDeclaredValue.CurrencyCode', DisplayName: "Divisa declarada" },
                                { Name: 'Items.member.-.FulfillmentNetworkSKU', DisplayName: "Fulfillment Network SKU" },
                                { Name: 'Items.member.-.Quantity', DisplayName: "Cantidad" },
                                { Name: 'Items.member.-.SellerFulfillmentOrderItemId', DisplayName: "Id. del artÃ­culo del pedido SVCGC" },
                                { Name: 'Items.member.-.SellerSKU', DisplayName: "SKU" }
                            ]
                        }
                    ]
                },
                "UpdateFulfillmentOrder": {
                    Parameters: [
                        { Name: 'MarketplaceId', DisplayName: 'ID de mercado', Required: false },
                        { Name: 'ShipFromCountryCode', DisplayName: "", Required: false },
                        { Name: 'SellerFulfillmentOrderId', DisplayName: "NÃºmero de pedido de gestiÃ³n logÃ­stica", Required: true },
                        { Name: 'ShippingSpeedCategory', DisplayName: "CategorÃ­a de velocidad de entrega", Required: false, Type: 'fba.ShippingSpeedCategory' },
                        { Name: 'DisplayableOrderId', DisplayName: "Id. de pedido", Required: false },
                        { Name: 'DisplayableOrderDateTime', DisplayName: "Date", Required: false, Type: 'Timestamp' },
                        { Name: 'DisplayableOrderComment', DisplayName: "Comentario", Required: false },
                        { Name: 'FulfillmentPolicy', DisplayName: "PolÃ­tica de gestiÃ³n logÃ­stica", Required: false, Type: 'fba.FulfillmentPolicy' },
                        { Name: 'FulfillmentAction', DisplayName: "Fulfillment Action", Required: false },
                        { Name: 'NotificationEmailList.member.-', DisplayName: "Correo de notificaciÃ³n", Required: false, List: true },
                        {
                            Name: 'DestinationAddress', DisplayName: "DirecciÃ³n de destino", Required: false, Type: 'Complex',
                            Parameters: [
                                { Name: 'DestinationAddress.Name', DisplayName: "Nombre" },
                                { Name: 'DestinationAddress.Line1', DisplayName: "DirecciÃ³n" },
                                { Name: 'DestinationAddress.Line2', DisplayName: "DirecciÃ³n" },
                                { Name: 'DestinationAddress.Line3', DisplayName: "Address 3" },
                                { Name: 'DestinationAddress.City', DisplayName: "Ciudad" },
                                { Name: 'DestinationAddress.StateOrProvinceCode', DisplayName: "Ciudad" },
                                { Name: 'DestinationAddress.PostalCode', DisplayName: "CÃ³digo postal" },
                                { Name: 'DestinationAddress.CountryCode', DisplayName: "PaÃ­s" },
                                { Name: 'DestinationAddress.DistrictOrCounty', DisplayName: "District or County" },
                                { Name: 'DestinationAddress.PhoneNumber', DisplayName: "Phone Number" }
                            ]
                        },
                        {
                            Name: 'Items', DisplayName: "Items", Type: 'Complex', Required: false, List: true,
                            Parameters: [
                                { Name: 'Items.member.-.DisplayableComment', DisplayName: "Comentario visualizable" },
                                { Name: 'Items.member.-.GiftMessage', DisplayName: "Mensaje del regalo" },
                                { Name: 'Items.member.-.PerUnitDeclaredValue.Value', DisplayName: "Valor declarado" },
                                { Name: 'Items.member.-.PerUnitDeclaredValue.CurrencyCode', DisplayName: "Divisa declarada" },
                                { Name: 'Items.member.-.Quantity', DisplayName: "Cantidad" },
                                { Name: 'Items.member.-.SellerFulfillmentOrderItemId', DisplayName: "Id. del artÃ­culo del pedido SVCGC" },
                                { Name: 'Items.member.-.FulfillmentNetworkSKU', DisplayName: "Fulfillment Network SKU" },
                                { Name: 'Items.member.-.SellerSKU', DisplayName: "SKU" }
                            ]
                        }
                    ]
                },
                "GetFulfillmentOrder": {
                    Parameters: [{ Name: 'SellerFulfillmentOrderId', DisplayName: "NÃºmero de pedido de gestiÃ³n logÃ­stica", Required: true }]
                },
                "GetFulfillmentPreview": {
                    Parameters: [
                        { Name: 'MarketplaceId', DisplayName: 'ID de mercado', Required: false },
                        {
                            Name: 'Address', DisplayName: "DirecciÃ³n de destino", Required: true, Type: 'Complex',
                            Parameters: [
                                { Name: 'Address.Name', DisplayName: "Nombre" },
                                { Name: 'Address.Line1', DisplayName: "DirecciÃ³n" },
                                { Name: 'Address.Line2', DisplayName: "DirecciÃ³n" },
                                { Name: 'Address.Line3', DisplayName: "Address 3" },
                                { Name: 'Address.City', DisplayName: "Ciudad" },
                                { Name: 'Address.StateOrProvinceCode', DisplayName: "Ciudad" },
                                { Name: 'Address.PostalCode', DisplayName: "CÃ³digo postal" },
                                { Name: 'Address.CountryCode', DisplayName: "PaÃ­s" },
                                { Name: 'Address.DistrictOrCounty', DisplayName: "District or County" },
                                { Name: 'Address.PhoneNumber', DisplayName: "Phone Number" }
                            ]
                        },
                        {
                            Name: 'Items', DisplayName: "Items", Type: 'Complex', Required: true, List: true,
                            Parameters: [
                                { Name: 'Items.member.-.Quantity', DisplayName: "Cantidad" },
                                { Name: 'Items.member.-.SellerFulfillmentOrderItemId', DisplayName: "Id. del artÃ­culo del pedido SVCGC" },
                                { Name: 'Items.member.-.SellerSKU', DisplayName: "SKU" },
                                { Name: 'Items.member.-.EstimatedShippingWeight', DisplayName: "" },
                                { Name: 'Items.member.-.ShippingWeightCalculationMethod', DisplayName: "MÃ©todo de cÃ¡lculo de peso del envÃ­o" }
                            ]
                        },
                        { Name: 'ShippingSpeedCategories.member.-', DisplayName: "CategorÃ­a de velocidad de entrega", List: true, Type: 'fba.ShippingSpeedCategory' }
                    ]
                },
                "GetPackageTrackingDetails": {
                    Parameters: [
                        { Name: 'PackageNumber', DisplayName: "NÃºmero de paquete", Required: true }
                    ]
                },
                "ListAllFulfillmentOrders": {
                    Parameters: [
                        { Name: 'QueryStartDateTime', DisplayName: "Hora de inicio", Required: true, Type: 'Timestamp' },
                    ]
                },
                "ListAllFulfillmentOrdersByNextToken": {
                    Parameters: [{ Name: 'NextToken', DisplayName: "SÃ­mbolo token", Required: true }]
                },
                "CreateFulfillmentReturn": {
                    Parameters: [
                        { Name: 'SellerFulfillmentOrderId', DisplayName: "NÃºmero de pedido de gestiÃ³n logÃ­stica", Required: true },
                        {
                            Name: 'Items', DisplayName: "Items", Type: 'Complex', Required: true, List: true,
                            Parameters: [
                                { Name: 'Items.member.-.SellerReturnItemId', DisplayName: "Seller Return Item Id" },
                                { Name: 'Items.member.-.SellerFulfillmentOrderItemId', DisplayName: "Id. del artÃ­culo del pedido SVCGC" },
                                { Name: 'Items.member.-.AmazonShipmentId', DisplayName: "Amazon Shipment Id" },
                                { Name: 'Items.member.-.ReturnReasonCode', DisplayName: "Return Reason Code" },
                                { Name: 'Items.member.-.ReturnComment', DisplayName: "Return Comment" }
                            ]
                        },
                    ]
                },
                "ListReturnReasonCodes": {
                    Parameters: [
                        { Name: 'MarketplaceId', DisplayName: 'ID de mercado', Required: false },
                        { Name: 'SellerFulfillmentOrderId', DisplayName: "NÃºmero de pedido de gestiÃ³n logÃ­stica", Required: false },
                        { Name: 'SellerSKU', DisplayName: 'SKU', Required: true },
                        { Name: 'Language', DisplayName: "Language", Required: false },
                    ]
                }
            }
        } // end of FulfillmentOutbound
    } // end of groups
};
ScratchpadEnums['orders.FulfillmentChannels'] = ["AFN", "MFN"];
//China has specific order status InvoiceUnconfirmed
ScratchpadEnums['orders.OrderStatuses'] = ["Pending", "Unshipped", "PartiallyShipped", "Shipped", "Canceled", "Unfulfillable", "PendingAvailability"];
ScratchpadEnums['orders.PaymentMethods'] = ["COD", "CVS", "Other"];

ScratchpadApis['Orders'] = {
    Name: "Pedidos",
    Version: "2013-09-01",
    Groups: {
        "Order Retrieval": {
            Name: "Pedidos",
            Path: "/Orders/2013-09-01",
            ApiCalls: {
                "GetServiceStatus": {
                    Parameters: []
                },
                "ListOrders": {
                    Parameters: [
                        { Name: 'CreatedAfter', DisplayName: 'Creado despuÃ©s del', Type: 'Timestamp' },
                        { Name: 'CreatedBefore', DisplayName: 'Creado antes del', Type: 'Timestamp' },
                        { Name: 'LastUpdatedAfter', DisplayName: 'Ãšltima actualizaciÃ³n despuÃ©s del', Type: 'Timestamp' },
                        { Name: 'LastUpdatedBefore', DisplayName: 'Ãšltima actualizaciÃ³n antes del', Type: 'Timestamp' },
                        { Name: 'MarketplaceId.Id.-', DisplayName: 'ID de mercado', List: true, Required: true },
                        { Name: 'OrderStatus.Status.-', DisplayName: 'Estado del pedido', Type: 'orders.OrderStatuses', List: true },
                        { Name: 'FulfillmentChannel.Channel.-', DisplayName: 'Canal de gestiÃ³n logÃ­stica', Type: 'orders.FulfillmentChannels', List: true },
                        { Name: 'SellerOrderId', DisplayName: 'NÃºmero de pedido de comerciante' },
                        { Name: 'BuyerEmail', DisplayName: 'E-mail del comprador:' },
                        { Name: 'PaymentMethod.Method.-', DisplayName: 'Payment Method', Type: 'orders.PaymentMethods', List: true },
                        { Name: 'TFMShipmentStatus.Status.-', DisplayName: 'Payment Method', List: true },
                        { Name: 'MaxResultsPerPage', DisplayName: 'Resultados mÃ¡ximos' }
                    ]
                },
                "ListOrdersByNextToken": {
                    Parameters: [{ Name: 'NextToken', DisplayName: 'SÃ­mbolo token', Required: true }]
                },
                "GetOrder": {
                    Parameters: [{ Name: 'AmazonOrderId.Id.-', DisplayName: 'Id. de pedido', Required: true, List: true }]
                },
                "ListOrderItems": {
                    Parameters: [{ Name: 'AmazonOrderId', DisplayName: 'Id. de pedido', Required: true }]
                },
                "ListOrderItemsByNextToken": {
                    Parameters: [{ Name: 'NextToken', DisplayName: 'SÃ­mbolo token', Required: true }]
                }
            }
        }
    }
};

//Section for Sellers API. 

ScratchpadApis['Sellers'] = {
    Name: "Vendedores",
    Version: "2011-07-01",
    Groups: {
        "Sellers Retrieval": {
            Name: "Vendedores",
            Path: "/Sellers/2011-07-01",
            ApiCalls: {
                "GetServiceStatus": {
                    Parameters: []
                },
                "ListMarketplaceParticipations": {
                    Parameters: []
                },
                "ListMarketplaceParticipationsByNextToken": {
                    Parameters: [{
                        Name: 'NextToken',
                        DisplayName: 'SÃ­mbolo token',
                        Required: true
                    }]
                }
            }
        }
    }
};

ScratchpadApis['Products'] = {
    Name: "Productos",
    Version: "2011-10-01",
    Groups: {
        "Products": {
            Name: "Productos",
            Path: "/Products/2011-10-01",
            ApiCalls: {
                "GetServiceStatus": {
                    Parameters: []
                },
                "ListMatchingProducts": {
                    Parameters: [
                        { Name: 'MarketplaceId', DisplayName: 'ID de mercado', Required: true },
                        { Name: 'Query', DisplayName: '', Required: true },
                        { Name: 'QueryContextId', DisplayName: '' }
                    ]
                },
                "GetMatchingProduct": {
                    Parameters: [
                        { Name: 'MarketplaceId', DisplayName: 'ID de mercado', Required: true },
                        { Name: 'ASINList.ASIN.-', DisplayName: 'ASIN', List: true, Required: true }
                    ]
                },
                "GetMatchingProductForId": {
                    Parameters: [
                        { Name: 'MarketplaceId', DisplayName: 'ID de mercado', Required: true },
                        { Name: 'IdType', DisplayName: 'Id Type', Required: true },
                        { Name: 'IdList.Id.-', DisplayName: 'Id', List: true, Required: true }
                    ]
                },
                "GetCompetitivePricingForSKU": {
                    Parameters: [
                        { Name: 'MarketplaceId', DisplayName: 'ID de mercado', Required: true },
                        { Name: 'SellerSKUList.SellerSKU.-', DisplayName: 'SKU', List: true, Required: true }
                    ]
                },
                "GetCompetitivePricingForASIN": {
                    Parameters: [
                        { Name: 'MarketplaceId', DisplayName: 'ID de mercado', Required: true },
                        { Name: 'ASINList.ASIN.-', DisplayName: 'ASIN', List: true, Required: true }
                    ]
                },
                "GetLowestPricedOffersForSKU": {
                    Parameters: [
                        { Name: 'MarketplaceId', DisplayName: 'ID de mercado', Required: true },
                        { Name: 'SellerSKU', DisplayName: 'SKU', Required: true },
                        { Name: 'ItemCondition', DisplayName: 'Price', Required: true }
                    ]
                },
                "GetLowestPricedOffersForASIN": {
                    Parameters: [
                        { Name: 'MarketplaceId', DisplayName: 'ID de mercado', Required: true },
                        { Name: 'ASIN', DisplayName: 'ASIN', Required: true },
                        { Name: 'ItemCondition', DisplayName: 'Item Condition', Required: true }
                    ]
                },
                "GetLowestOfferListingsForSKU": {
                    Parameters: [
                        { Name: 'MarketplaceId', DisplayName: 'ID de mercado', Required: true },
                        { Name: 'ItemCondition', DisplayName: '' },
                        { Name: 'ExcludeMe', DisplayName: '', Type: 'bde.Boolean' },
                        { Name: 'SellerSKUList.SellerSKU.-', DisplayName: 'SKU', List: true, Required: true }
                    ]
                },
                "GetLowestOfferListingsForASIN": {
                    Parameters: [
                        { Name: 'MarketplaceId', DisplayName: 'ID de mercado', Required: true },
                        { Name: 'ItemCondition', DisplayName: '' },
                        { Name: 'ExcludeMe', DisplayName: '', Type: 'bde.Boolean' },
                        { Name: 'ASINList.ASIN.-', DisplayName: 'ASIN', List: true, Required: true }
                    ]
                },
                "GetMyFeesEstimate": {
                    Parameters: [
                        {
                            Name: 'FeesEstimateRequestList', DisplayName: '', Type: 'Complex', Required: true, List: true,
                            Parameters: [
                                { Name: 'FeesEstimateRequestList.FeesEstimateRequest.-.MarketplaceId', DisplayName: 'ID de mercado' },
                                { Name: 'FeesEstimateRequestList.FeesEstimateRequest.-.IdType', DisplayName: 'Id Type' },
                                { Name: 'FeesEstimateRequestList.FeesEstimateRequest.-.IdValue', DisplayName: '' },
                                { Name: 'FeesEstimateRequestList.FeesEstimateRequest.-.IsAmazonFulfilled', DisplayName: '', Type: 'bde.Boolean' },
                                { Name: 'FeesEstimateRequestList.FeesEstimateRequest.-.Identifier', DisplayName: '' },
                                { Name: 'FeesEstimateRequestList.FeesEstimateRequest.-.PriceToEstimateFees.ListingPrice.Amount', DisplayName: 'Amount' },
                                { Name: 'FeesEstimateRequestList.FeesEstimateRequest.-.PriceToEstimateFees.ListingPrice.CurrencyCode', DisplayName: 'Currency Code' },
                                { Name: 'FeesEstimateRequestList.FeesEstimateRequest.-.PriceToEstimateFees.Shipping.Amount', DisplayName: 'Amount' },
                                { Name: 'FeesEstimateRequestList.FeesEstimateRequest.-.PriceToEstimateFees.Shipping.CurrencyCode', DisplayName: 'Currency Code' },
                                { Name: 'FeesEstimateRequestList.FeesEstimateRequest.-.PriceToEstimateFees.Points.PointsNumber', DisplayName: '' },
                                { Name: 'FeesEstimateRequestList.FeesEstimateRequest.-.PriceToEstimateFees.Points.PointsMonetaryValue.Amount', DisplayName: 'Amount' },
                                { Name: 'FeesEstimateRequestList.FeesEstimateRequest.-.PriceToEstimateFees.Points.PointsMonetaryValue.CurrencyCode', DisplayName: 'Currency Code' }
                            ]
                        }
                    ]
                },
                "GetMyPriceForSKU": {
                    Parameters: [
                        { Name: 'MarketplaceId', DisplayName: 'ID de mercado', Required: true },
                        { Name: 'ItemCondition', DisplayName: '' },
                        { Name: 'SellerSKUList.SellerSKU.-', DisplayName: 'SKU', List: true, Required: true }
                    ]
                },
                "GetMyPriceForASIN": {
                    Parameters: [
                        { Name: 'MarketplaceId', DisplayName: 'ID de mercado', Required: true },
                        { Name: 'ItemCondition', DisplayName: '' },
                        { Name: 'ASINList.ASIN.-', DisplayName: 'ASIN', List: true, Required: true }
                    ]
                },
                "GetProductCategoriesForSKU": {
                    Parameters: [
                        { Name: 'MarketplaceId', DisplayName: 'ID de mercado', Required: true },
                        { Name: 'SellerSKU', DisplayName: 'SKU', Required: true }
                    ]
                },
                "GetProductCategoriesForASIN": {
                    Parameters: [
                        { Name: 'MarketplaceId', DisplayName: 'ID de mercado', Required: true },
                        { Name: 'ASIN', DisplayName: 'ASIN', Required: true }
                    ]
                }
            }
        }
    }
};

ScratchpadEnums['recommendations.Categories'] = ["Inventory", "Selection", "Pricing", "Fulfillment", "ListingQuality", "GlobalSelling", "Advertising"];

ScratchpadApis['Recommendations'] = {
    Name: 'Recomendaciones',
    Version: "2013-04-01",
    Groups: {
        "Recommendations": {
            Name: 'Recomendaciones',
            Path: "/Recommendations/2013-04-01",
            ApiCalls: {
                "GetServiceStatus": {
                    Parameters: []
                },
                "GetLastUpdatedTimeForRecommendations": {
                    Parameters: [
                        { Name: 'MarketplaceId', DisplayName: 'ID de mercado', Required: true }
                    ]
                },
                "ListRecommendations": {
                    Parameters: [
                        { Name: 'MarketplaceId', DisplayName: 'ID de mercado', Required: true },
                        { Name: 'RecommendationCategory', DisplayName: 'RecommendationCategory', Type: 'recommendations.Categories', Required: false },
                        //grouping FilteOptionList into a comma separated list of FilterOptions - scratchpad does not have the ability to correctly index the elements in a list of depth > 1
                        {
                            Name: 'CategoryQueryList', DisplayName: 'CategoryQueryList', Type: 'Complex', Required: false, List: true,
                            Parameters: [
                                { Name: 'CategoryQueryList.CategoryQuery.-.RecommendationCategory', DisplayName: 'RecommendationCategory', Type: 'recommendations.Categories' },
                                { Name: 'CategoryQueryList.CategoryQuery.-.FilterOptions (Comma separated list of FilterOption values)', DisplayName: 'FilterOptionList' }
                            ]
                        }
                    ]
                },
                "ListRecommendationsByNextToken": {
                    Parameters: [
                        { Name: 'NextToken', DisplayName: 'SÃ­mbolo token', Required: true }
                    ]
                }
            }
        }
    }
};


// Begin Subscriptions API Section

ScratchpadEnums['subscriptions.DeliveryChannels'] = ["SQS"];

ScratchpadEnums['subscriptions.NotificationTypes'] = ["AnyOfferChanged", "FulfillmentOrderStatus", "FeePromotion"];

ScratchpadEnums['subscriptions.DestinationKeys'] = ['sqsQueueUrl'];

ScratchpadParameters = {};

ScratchpadParameters.MarketplaceId = { Name: 'MarketplaceId', DisplayName: 'ID de mercado', Required: true };

ScratchpadParameters.Destination = {
    Name: 'Destination', DisplayName: 'Destino', Type: 'Complex', Required: true,
    Parameters: [
        { Name: 'Destination.DeliveryChannel', DisplayName: 'Canal de entrega', Type: 'subscriptions.DeliveryChannels', Required: true },
        {
            Name: 'Destination.AttributeList', DisplayName: 'Lista de atributos', Type: 'Complex', Required: true, List: true,
            Parameters: [
                { Name: 'Destination.AttributeList.member.-.Key', DisplayName: 'Clave', Required: true, Type: 'subscriptions.DestinationKeys' },
                { Name: 'Destination.AttributeList.member.-.Value', DisplayName: 'Valor', Required: true }
            ]
        }
    ]
};

ScratchpadParameters.NotificationType = {
    Name: 'NotificationType', DisplayName: 'Tipo de notificaciÃ³n', Required: true, Type: 'subscriptions.NotificationTypes'
};

ScratchpadParameters.IsEnabled = {
    Name: 'IsEnabled', DisplayName: 'Activado', Required: true, Type: 'bde.Boolean'
};

ScratchpadParameters.Subscription = {
    Name: 'Subscription', DisplayName: 'SuscripciÃ³n', Required: true, Type: 'Complex',
    Parameters: [
        { Name: 'Subscription.NotificationType', DisplayName: 'Tipo de notificaciÃ³n', Required: true, Type: 'subscriptions.NotificationTypes' },
        {
            Name: 'Subscription.Destination', DisplayName: 'Destino', Type: 'Complex', Required: true,
            Parameters: [
                {
                    Name: 'Subscription.Destination.DeliveryChannel', DisplayName: 'Canal de entrega',
                    Type: 'subscriptions.DeliveryChannels', Required: true
                },
                {
                    Name: 'Subscription.Destination.AttributeList', DisplayName: 'Lista de atributos', Type: 'Complex', Required: true, List: true,
                    Parameters: [
                        {
                            Name: 'Subscription.Destination.AttributeList.member.-.Key', DisplayName: 'Clave',
                            Required: true, Type: 'subscriptions.DestinationKeys'
                        },
                        { Name: 'Subscription.Destination.AttributeList.member.-.Value', DisplayName: 'Valor', Required: true }
                    ]
                }
            ]
        },
        { Name: 'Subscription.IsEnabled', DisplayName: 'Activado', Required: true, Type: 'bde.Boolean' }
    ]
};

ScratchpadApis['Subscriptions'] = {
    Name: "Suscripciones",
    Version: "2013-07-01",
    Groups: {
        "Destinations": {
            Name: "Suscripciones",
            Path: "/Subscriptions/2013-07-01",
            ApiCalls: {
                "GetServiceStatus": {
                    Parameters: []
                },
                "RegisterDestination": {
                    Parameters: [ScratchpadParameters.MarketplaceId, ScratchpadParameters.Destination]
                },
                "DeregisterDestination": {
                    Parameters: [ScratchpadParameters.MarketplaceId, ScratchpadParameters.Destination]
                },
                "ListRegisteredDestinations": {
                    Parameters: [ScratchpadParameters.MarketplaceId]
                },
                "SendTestNotificationToDestination": {
                    Parameters: [ScratchpadParameters.MarketplaceId, ScratchpadParameters.Destination]
                }
            }
        },
        "Subscriptions": {
            Name: "Suscripciones",
            Path: "/Subscriptions/2013-07-01",
            ApiCalls: {
                "CreateSubscription": {
                    Parameters: [ScratchpadParameters.MarketplaceId, ScratchpadParameters.Subscription]
                },
                "GetSubscription": {
                    Parameters: [ScratchpadParameters.MarketplaceId, ScratchpadParameters.NotificationType, ScratchpadParameters.Destination]
                },
                "DeleteSubscription": {
                    Parameters: [ScratchpadParameters.MarketplaceId, ScratchpadParameters.NotificationType, ScratchpadParameters.Destination]
                },
                "ListSubscriptions": {
                    Parameters: [ScratchpadParameters.MarketplaceId]
                },
                "UpdateSubscription": {
                    Parameters: [ScratchpadParameters.MarketplaceId, ScratchpadParameters.Subscription]
                }
            }
        }
    }
};

// End Subscriptions API Section



ScratchpadApis['Finances'] = {
    Name: "Pagos",
    Version: "2015-05-01",
    Groups: {
        "Finances": {
            Name: "Pagos",
            Path: "/Finances/2015-05-01",
            ApiCalls: {
                "GetServiceStatus": {
                    Parameters: []
                },
                "ListFinancialEventGroups": {
                    Parameters: [
                        { Name: 'FinancialEventGroupStartedAfter', DisplayName: 'Opened After', Type: 'Timestamp', Required: true },
                        { Name: 'FinancialEventGroupStartedBefore', DisplayName: 'Opened Before', Type: 'Timestamp', Required: false },
                        { Name: 'MaxResultsPerPage', DisplayName: 'Resultados mÃ¡ximos', Required: false }
                    ]
                },
                "ListFinancialEventGroupsByNextToken": {
                    Parameters: [
                        { Name: 'NextToken', DisplayName: 'SÃ­mbolo token', Required: true }
                    ]
                },
                "ListFinancialEvents": {
                    Parameters: [
                        { Name: 'PostedAfter', DisplayName: 'Posted After', Type: 'Timestamp', Required: false },
                        { Name: 'PostedBefore', DisplayName: 'Posted Before', Type: 'Timestamp', Required: false },
                        { Name: 'FinancialEventGroupId', DisplayName: 'Financial Event Group Id', Required: false },
                        { Name: 'AmazonOrderId', DisplayName: 'Amazon Order Id', Required: false },
                        { Name: 'MaxResultsPerPage', DisplayName: 'Resultados mÃ¡ximos', Required: false }
                    ]
                },
                "ListFinancialEventsByNextToken": {
                    Parameters: [
                        { Name: 'NextToken', DisplayName: 'SÃ­mbolo token', Required: true }
                    ]
                }
            }
        }
    }
}

ShipmentRequestDetails = {
    Name: 'ShipmentRequestDetails', DisplayName: 'ShipmentRequestDetails', Type: 'Complex', Required: true,
    Parameters: [
        { Name: 'ShipmentRequestDetails.AmazonOrderId', DisplayName: 'Amazon Order Id', Required: true },
        { Name: 'ShipmentRequestDetails.SellerOrderId', DisplayName: 'Seller Order Id' },
        { Name: 'ShipmentRequestDetails.MustArriveByDate', DisplayName: 'Must Arrive By Date', Required: false, Type: 'Timestamp' },
        { Name: 'ShipmentRequestDetails.ShipDate', DisplayName: 'Ship Date', Required: false, Type: 'Timestamp' },
        {
            Name: 'ShipmentRequestDetails.PackageDimensions', DisplayName: 'Package Dimensions', Required: true, Type: 'Complex',
            Parameters: [
                { Name: 'ShipmentRequestDetails.PackageDimensions.Length', DisplayName: 'Length' },
                { Name: 'ShipmentRequestDetails.PackageDimensions.Width', DisplayName: 'Width' },
                { Name: 'ShipmentRequestDetails.PackageDimensions.Height', DisplayName: 'Height' },
                { Name: 'ShipmentRequestDetails.PackageDimensions.Unit', DisplayName: 'Unit' },
                { Name: 'ShipmentRequestDetails.PackageDimensions.PredefinedPackageDimensions', DisplayName: 'Predefined Package Dimensions' }
            ]
        },
        {
            Name: 'ShipmentRequestDetails.Weight', DisplayName: 'Weight', Required: true, Type: 'Complex',
            Parameters: [
                { Name: 'ShipmentRequestDetails.Weight.Value', DisplayName: 'Value', Required: true },
                { Name: 'ShipmentRequestDetails.Weight.Unit', DisplayName: 'Unit', Required: true }
            ]
        },
        {
            Name: 'ShipmentRequestDetails.ShipFromAddress', DisplayName: 'ShipmentRequestDetails.ShipFromAddress', Required: true, Type: 'Complex',
            Parameters: [
                { Name: 'ShipmentRequestDetails.ShipFromAddress.Name', DisplayName: 'Ship From Address', Required: true },
                { Name: 'ShipmentRequestDetails.ShipFromAddress.AddressLine1', DisplayName: 'Address Line 1', Required: true },
                { Name: 'ShipmentRequestDetails.ShipFromAddress.AddressLine2', DisplayName: 'Address Line 2' },
                { Name: 'ShipmentRequestDetails.ShipFromAddress.AddressLine3', DisplayName: 'Address Line 3' },
                { Name: 'ShipmentRequestDetails.ShipFromAddress.DistrictOrCounty', DisplayName: 'District Or County' },
                { Name: 'ShipmentRequestDetails.ShipFromAddress.City', DisplayName: 'City', Required: true },
                { Name: 'ShipmentRequestDetails.ShipFromAddress.StateOrProvinceCode', DisplayName: 'State Or Province Code' },
                { Name: 'ShipmentRequestDetails.ShipFromAddress.PostalCode', DisplayName: 'Postal Code', Required: true },
                { Name: 'ShipmentRequestDetails.ShipFromAddress.CountryCode', DisplayName: 'Country Code', Required: true },
                { Name: 'ShipmentRequestDetails.ShipFromAddress.Email', DisplayName: 'Email' },
                { Name: 'ShipmentRequestDetails.ShipFromAddress.Phone', DisplayName: 'Phone' }
            ]
        },
        {
            Name: 'ShipmentRequestDetails.Insurance', DisplayName: 'Insurance', Type: 'Complex',
            Parameters: [
                { Name: 'ShipmentRequestDetails.Insurance.CurrencyCode', DisplayName: 'Currency Code' },
                { Name: 'ShipmentRequestDetails.Insurance.Amount', DisplayName: 'Amount' }
            ]
        },
        {
            Name: 'ShipmentRequestDetails.ShippingServiceOptions', DisplayName: 'Shipping Service Options', Type: 'Complex',
            Parameters: [
                { Name: 'ShipmentRequestDetails.ShippingServiceOptions.DeliveryExperience', DisplayName: 'Delivery Experience' },
                { Name: 'ShipmentRequestDetails.ShippingServiceOptions.CarrierWillPickUp', DisplayName: 'Carrier Will Pick Up' },
                {
                    Name: 'ShipmentRequestDetails.ShippingServiceOptions.DeclaredValue', DisplayName: 'Declared Value', Type: 'Complex',
                    Parameters: [
                        { Name: 'ShipmentRequestDetails.ShippingServiceOptions.DeclaredValue.CurrencyCode', DisplayName: 'Currency Code' },
                        { Name: 'ShipmentRequestDetails.ShippingServiceOptions.DeclaredValue.Amount', DisplayName: 'Amount' }
                    ]
                },
                { Name: 'ShipmentRequestDetails.ShippingServiceOptions.LabelFormat', DisplayName: '' }
            ]
        },
        {
            Name: 'ShipmentRequestDetails.ItemList.Item', DisplayName: 'Item List', Required: true, Type: 'Complex',
            Parameters: [
                { Name: 'ShipmentRequestDetails.ItemList.Item.-.OrderItemId', DisplayName: 'Order Item Id', Required: true, List: true },
                { Name: 'ShipmentRequestDetails.ItemList.Item.-.Quantity', DisplayName: 'Quantity', Required: true, List: true }
            ]
        },
        {
            Name: 'ShipmentRequestDetails.LabelCustomization', DisplayName: '', Type: 'Complex',
            Parameters: [
                { Name: 'ShipmentRequestDetails.LabelCustomization.CustomTextForLabel', DisplayName: '' },
                { Name: 'ShipmentRequestDetails.LabelCustomization.StandardIdForLabel', DisplayName: '' }
            ]
        }
    ]
}

ScratchpadApis['MerchantFulfillment'] = {
    Name: "Merchant Fulfillment",
    Version: "2015-06-01",
    Groups: {
        "Merchant Fulfillment": {
            Name: "Merchant Fulfillment",
            Path: "/MerchantFulfillment/2015-06-01",
            ApiCalls: {
                "GetServiceStatus": {
                    Parameters: []
                },
                "GetEligibleShippingServices": {
                    Parameters: [ShipmentRequestDetails]
                },
                "CreateShipment": {
                    Parameters: [
                        { Name: 'ShippingServiceId', DisplayName: 'Shipping Service Id', Required: true },
                        { Name: 'ShippingServiceOfferId', DisplayName: 'Shipping Service Offer Id' },
                        { Name: 'HazmatType', DisplayName: '' },
                        ShipmentRequestDetails
                    ]
                },
                "GetShipment": {
                    Parameters: [
                        { Name: 'ShipmentId', DisplayName: 'Shipment Id', Required: true }
                    ]
                },
                "CancelShipment": {
                    Parameters: [
                        { Name: 'ShipmentId', DisplayName: 'Shipment Id', Required: true }
                    ]
                }
            }
        }
    }
}
