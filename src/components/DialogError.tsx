import React from 'react';

import { CloseCircleFilled } from '@ant-design/icons';
import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { commonCloseError } from '@/store/common/actions';
import { ErrorState } from '@/store/common/selector';

import { Dialog } from './Dialog';

export const DialogError = () => {
  const dispatch = useDispatch();
  const error = useSelector(ErrorState);
  const handleCloseError = () => {
    dispatch(commonCloseError());
    if (!error.action) return;
    if (error.action) {
      dispatch({ type: error.action });
    }
  };

  return (
    <>
      <Dialog isOpen={error.open} handleClose={() => handleCloseError()} className="titan-modal">
        <>
          <div className="titan-modal__content center">
            <div className="box-icon">
              <CloseCircleFilled className="icon error" />
            </div>
            <div className="title ">{error.message}</div>
            {error.description && <div className="description">{error.description}</div>}
          </div>
          <div className="titan-modal__footer">
            <div className="actions center">
              <Button type="primary" className="submit" onClick={() => handleCloseError()}>
                Got It
              </Button>
            </div>
          </div>
        </>
      </Dialog>
    </>
  );
};
export default DialogError;
