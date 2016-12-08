class OrderUtils {
  static getMarginFromOrderLines(orderLines) {
    let margin = 0;

    for (let i = 0; i < orderLines.length; i++) {
      margin += OrderUtils.calculateMargin(orderLines[i].unit_current_mrp,
        orderLines[i].quantity, orderLines[i].sku.vendor_discount_percent);
    }

    return margin;
  }

  static calculateMargin(unitCurrentMrp, quantity, discountPercent) {
    return (unitCurrentMrp * quantity * discountPercent) / 100;
  }
}

export default OrderUtils;
