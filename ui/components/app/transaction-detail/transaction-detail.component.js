import React from 'react';
import PropTypes from 'prop-types';

import { useGasFeeContext } from '../../../contexts/gasFee';
import { useI18nContext } from '../../../hooks/useI18nContext';
import Box from '../../ui/box';

import EditGasFeeButton from '../edit-gas-fee-button';
import TransactionDetailItem from '../transaction-detail-item/transaction-detail-item.component';

export default function TransactionDetail({
  rows = [],
  onEdit,
  userAcknowledgedGasMissing,
}) {
  const t = useI18nContext();
  const { supportsEIP1559V2 } = useGasFeeContext();

  return (
    <div className="transaction-detail">
      {supportsEIP1559V2 && (
        <Box display="flex" justifyContent="flex-end" paddingTop={5}>
          <EditGasFeeButton
            userAcknowledgedGasMissing={userAcknowledgedGasMissing}
          />
        </Box>
      )}
      {!supportsEIP1559V2 && onEdit && (
        <div className="transaction-detail-edit">
          <button onClick={onEdit}>{t('edit')}</button>
        </div>
      )}
      <div className="transaction-detail-rows">{rows}</div>
    </div>
  );
}

TransactionDetail.propTypes = {
  /**
   * Show item content for transaction detail. Array of TransactionDetailItem components
   */
  rows: PropTypes.arrayOf(TransactionDetailItem).isRequired,
  /**
   * onClick handler for the Edit link
   */
  onEdit: PropTypes.func,
  /**
   * If there is a error in getting correct estimates we show a message to the user
   * which they can acknowledge and proceed with their transaction
   */
  userAcknowledgedGasMissing: PropTypes.bool.isRequired,
};
