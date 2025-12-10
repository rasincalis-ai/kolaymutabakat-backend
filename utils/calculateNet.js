export const calculateNetPayment = (order) => {
  let total = order.totalPrice || 0;

  let commission = 0;
  let discount = 0;
  let penalty = 0;
  let returnAmount = 0;
  let serviceFee = 0;
  let overseasFee = 0;
  let intlServiceFee = 0;

  (order.lines || []).forEach(line => {
    commission += line.commissionFee || 0;
    discount += (line.merchantDiscount || 0) + (line.trendyolDiscount || 0);
    penalty += line.penalty || 0;
    returnAmount += (line.returnQuantity || 0) * (line.price || 0);
    serviceFee += (line.serviceFeeFixed || 0) + ((line.price || 0) * (line.serviceFeePercentage || 0));
    overseasFee += line.overseasOperationFee || 0;
    intlServiceFee += line.internationalServiceFee || 0;
  });

  const net =
    total -
    commission -
    discount -
    penalty -
    returnAmount -
    serviceFee -
    overseasFee -
    intlServiceFee;

  return {
    total,
    commission,
    discount,
    penalty,
    returnAmount,
    serviceFee,
    overseasFee,
    intlServiceFee,
    net
  };
};
