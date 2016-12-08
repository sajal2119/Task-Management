import axios from 'axios';
import config from '../../config';
import auth from './auth';

// append forward slash at the end of URL to support baseURL feature of AXIOS
const baseUrl = `${config.RECON_API_HOST}/`;

// Donot add forward slash(/) at the starting of urls
const urls = {
  DOWNLOAD_EXCEL: 'orders/excel',
  UPLOAD_EXCEL: 'order_status/excel/upload',
  LOGIN: 'login',
  SEARCH: 'search',
  VENDORS: 'vendors',
  VENDOR_LEDGER: 'vendor/ledger',
  VENDOR_ACTION: 'vendor/action',
  VENDOR_LEDGER_BY_ID: 'vendor/:id/ledger',
  VENDOR_ORDERS: 'vendor/orders',
  VENDOR_ORDERS_BY_ID: 'vendor/:id/orders',
  VENDOR_SETTLEMENT_ADD: 'vendor/:id/settlement',
  GET_ALL_ROLES: 'roles/all'
};

const baseHeaders = {
  'Content-Type': 'application/json; charset=utf-8'
};

const axiosCustom = axios.create({
  baseURL: baseUrl,
  headers: baseHeaders,
  responseType: 'json',
  transformRequest: [(data) => (JSON.stringify(data))]
});


class RequestService {


  /**
   * Send a post request to login
   * @param username {string}
   * @param password {string}
   * @returns {*}
   */
  login(username, password) {
    const rqObj = {
      method: 'post',
      url: urls.LOGIN,
      data: {
        user_name: username,
        password
      }
    };

    RequestService.mergeHeader(rqObj, {}, baseHeaders);

    return axiosCustom.request(rqObj);
  }

  /**
   * Get vendor ledger list.
   * If `id` is specified, specific vendor information is requested
   * @returns {*}
   * @param [id]
   */
  vendorLedger(params) {
    const rqObj = {
      method: 'get',
      url: urls.VENDOR_LEDGER
    };

    if (params) {
      rqObj.params = params;
    }

    rqObj.headers = RequestService.mergeHeader({ Authorization: auth.getToken() }, baseHeaders);

    return axiosCustom.request(rqObj);
  }

  /**
   * Get vendor ledger list.
   * If `id` is specified, specific vendor information is requested
   * @returns {*}
   * @param [id]
   */
  adminVendorLedger(id, params) {
    const rqObj = {
      method: 'get'
    };

    rqObj.url = 'admin/vendor/ledger';

    if (params) {
      rqObj.params = params;
    } else {
      rqObj.params = {};
    }

    if (id) {
      rqObj.params.vendor_id = id;
    }

    rqObj.headers = RequestService.mergeHeader({ Authorization: auth.getToken() }, baseHeaders);

    return axiosCustom.request(rqObj);
  }

  vendorAction(rqBody) {
    const rqObj = {
      method: 'post',
      url: urls.VENDOR_ACTION,
      data: rqBody
    };

    rqObj.headers = RequestService.mergeHeader({ Authorization: auth.getToken() }, baseHeaders);

    return axiosCustom.request(rqObj);
  }


  /**
   * Get claims and settlement list for vendor
   * If `id` is specified, specific vendor information is requested
   * @param date {Number} time in seconds
   * @param [id] {Number} Vendor ID
   * @returns {*}
   */
  vendorOrdersByDate(date, start) {
    const rqObj = {
      method: 'get',
      url: urls.VENDOR_ORDERS,
      params: {
        date,
        start
      }
    };

    rqObj.headers = RequestService.mergeHeader({ Authorization: auth.getToken() }, baseHeaders);

    return axiosCustom.request(rqObj);
  }

  /**
   * Get claims and settlement list for vendor
   * If `id` is specified, specific vendor information is requested
   * @param date {Number} time in seconds
   * @param [id] {Number} Vendor ID
   * @returns {*}
   */
  adminVendorOrdersByDate(date, id, start) {
    const rqObj = {
      method: 'get',
      params: {
        date,
        start,
        vendor_id: id
      }
    };

    rqObj.url = '/admin/vendor/orders';
    rqObj.headers = RequestService.mergeHeader({ Authorization: auth.getToken() }, baseHeaders);

    return axiosCustom.request(rqObj);
  }

  searchOrderById(id) {
    const rqObj = {
      method: 'get',
      url: urls.SEARCH,
      params: {
        order_id: id
      }
    };

    rqObj.headers = RequestService.mergeHeader({ Authorization: auth.getToken() }, baseHeaders);

    return axiosCustom.request(rqObj);
  }

  ordersDetails(orderId) {
    const rqObj = {
      method: 'get',
      params: {
        orderId
      }
    };

    rqObj.url = `order/${orderId}/details`;

    rqObj.headers = RequestService.mergeHeader({ Authorization: auth.getToken() }, baseHeaders);

    return axiosCustom.request(rqObj);
  }

  downloadExcelForVendor(vendorCode, startDate, endDate) {
    let url = `${baseUrl}${urls.DOWNLOAD_EXCEL}?`;

    if (vendorCode) {
      url += `vendor_id=${vendorCode}&`;
    }
    url += `date_from=${startDate}&date_to=${endDate}&h=${auth.getToken()}`;

    window.open(url);
  }

  uploadExcelForVendor(files) {
    const rqObj = {
      method: 'post',
      url: urls.UPLOAD_EXCEL,
      data: files,
      transformRequest: (data) => data
    };

    rqObj.headers = RequestService.mergeHeader({
      Authorization: auth.getToken()
    }, baseHeaders);

    return axiosCustom.request(rqObj);
  }

  /**
   * Get list of vendors
   * @returns {*}
   */
  vendors() {
    const rqObj = {
      method: 'get',
      url: urls.VENDORS
    };

    rqObj.headers = RequestService.mergeHeader({ Authorization: auth.getToken() }, baseHeaders);

    return axiosCustom.request(rqObj);
  }

  /**
   *
   * @param vendorId {Number} Vendor id for whom, the settlement is being created
   * @param settlement {Object} Settlement details
   * @returns {*}
   */
  createVendorSettlement(vendorId, settlement) {
    const rqObj = {
      method: 'post',
      url: `vendor/${vendorId}/settlement`,
      data: settlement
    };

    rqObj.headers = RequestService.mergeHeader({ Authorization: auth.getToken() }, baseHeaders);

    return axiosCustom.request(rqObj);
  }

  /**
   * Get user roles list.
   * @returns {*}
   * @param [id]
   */
  getUserRoles(emailId) {
    const rqObj = {
      method: 'get'
    };

    rqObj.url = `user/${emailId}/roles`;

    rqObj.headers = RequestService.mergeHeader({ Authorization: auth.getToken() }, baseHeaders);

    return axiosCustom.request(rqObj);
  }
 /**
   * Get posiible roles list.
   * @returns {*}
   */
  getAllRoles() {
    const rqObj = {
      method: 'get',
      url: urls.GET_ALL_ROLES
    };

    rqObj.headers = RequestService.mergeHeader({ Authorization: auth.getToken() }, baseHeaders);

    return axiosCustom.request(rqObj);
  }

  addRoleToUser(username, roleName) {
    const rqObj = {
      method: 'post'
    };

    rqObj.url = `user/${username}/role/${roleName}`;
    rqObj.headers = RequestService.mergeHeader({ Authorization: auth.getToken() }, baseHeaders);

    return axiosCustom.request(rqObj);
  }

  removeRoleFromUser(username, roleName) {
    const rqObj = {
      method: 'delete'
    };

    rqObj.url = `user/${username}/role/${roleName}`;
    rqObj.headers = RequestService.mergeHeader({ Authorization: auth.getToken() }, baseHeaders);

    return axiosCustom.request(rqObj);
  }

  /**
   * Generate error details
   * @param response
   * @return {type:'',messages:[]}
   */
  getException(response) {
    const obj = {
      type: 'error',
      messages: []
    };

    const data = response.data;

    if (typeof data === 'object') {
      obj.messages = obj.messages.concat(data.result.error_messages);
    } else {
      obj.messages.push('Network error. Please try again after sometime');
    }

    return obj;
  }

  /**
   * Merge target and source headers. Set them to the config object for `axios`
   * @param obj{Object} Config object for `axiosCustom` request
   * @param source1{Object} contains header fields
   * @param source2{Object} contains default header fields, merged with fields in `target`
   */
  static mergeHeader(source1, source2) {
    return Object.assign({}, source2, source1);
  }
}

export default new RequestService();
