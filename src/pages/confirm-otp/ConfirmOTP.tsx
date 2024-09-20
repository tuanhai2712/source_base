import React, { useEffect, useState } from 'react';

import { ArrowLeftIcon } from '@/assets';
import { InputNormal } from '@/components';
import { userProfileState } from '@/store/user/selector';
import { Button, Form, Spin, message } from 'antd';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { FORGOT_PASSWORD_ROUTER } from '@/routes/constants';
export const ConfirmOTP: React.FC = () => {
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const profileUser = useSelector(userProfileState);

  const [error, setError] = useState<string>();
  const email = localStorage.getItem('email') as string;
  const [loading, setLoading] = useState<boolean>(false);

  const [loadingResend, setLoadingResend] = useState<boolean>(false);
  const timeCountDownResentCode = 60000;
  const [timeResendCode, setTimeResendCode] = useState<number>(timeCountDownResentCode);
  const isEndCountTime = !timeResendCode;
  const formatTimeResendCode = () => {
    const seconds = (timeResendCode % 60000) / 1000;
    return seconds;
  };
  useEffect(() => {
    if (!isEndCountTime) {
      const setTime = setInterval(() => {
        setTimeResendCode((pre) => pre - 1000);
      }, 1000);
      return () => {
        clearInterval(setTime);
      };
    }
  }, [timeResendCode, isEndCountTime]);

  const onFinish = async (values: any) => {
    const { otpEmail } = values;
  };

  useEffect(() => {
    if (error) {
      message.config({
        maxCount: 1,
      });
      message.open({
        type: 'error',
        content: <span style={{ color: '#e9453a' }}>{String(error)}</span>,
      });
    }
  }, [error]);

  if (profileUser?.id) {
    return <Redirect to={'/'} />;
  }

  const resendCode = async () => {
    setLoadingResend(true);
    try {
      const payload = { email };
      // await requestForgotPassword(payload);
      setLoadingResend(false);
      setTimeResendCode(timeCountDownResentCode);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="signin-form">
      <div style={{ marginBottom: 20 }}>
        <a href={FORGOT_PASSWORD_ROUTER}>
          <ArrowLeftIcon />
        </a>
      </div>
      <p className="signin-form-title">{t('recoveryCode')}</p>
      <p className="signin-form-desc">{t('enterThe6DigitCodeSentToYourEmail')}</p>
      <Form
        name="form-confirm-code"
        initialValues={{
          otpEmail: '',
        }}
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
        requiredMark={false}
        form={form}
        disabled={loading}
      >
        <Form.Item
          label=""
          name="otpEmail"
          rules={[
            {
              validator: (_rule: any, value: string = '') => {
                if (value.length === 0) {
                  return Promise.reject(t('error.thisFieldIsRequired'));
                }
                if (isNaN(parseInt(value))) {
                  return Promise.reject(t('otpCodeHasToBeANumber'));
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <InputNormal
            maxLength={6}
            placeholder="Enter code"
            suffix={
              <>
                {loadingResend ? (
                  <Spin />
                ) : (
                  <>
                    <span style={{ color: !isEndCountTime ? '#475467' : '#8cb4ff' }} onClick={resendCode}>
                      {t('resendCode')}
                    </span>
                    {!isEndCountTime && formatTimeResendCode() ? (
                      <span style={{ color: !isEndCountTime ? '#475467' : '#8cb4ff' }}>{formatTimeResendCode()} s</span>
                    ) : (
                      ''
                    )}
                  </>
                )}
              </>
            }
          />
        </Form.Item>
        <Form.Item shouldUpdate>
          {({ getFieldValue, getFieldError }) => {
            const getDisabled = () => {
              if (!getFieldValue('otpEmail')) return true;
              if (getFieldValue('otpEmail') && getFieldError('otpEmail').length > 0) return true;
              if (loading) return true;
            };
            return (
              <Button
                loading={loading}
                type="primary"
                htmlType="submit"
                className="signin-form-btn_submit"
                disabled={getDisabled()}
              >
                {t('submit')}
              </Button>
            );
          }}
        </Form.Item>
      </Form>
    </div>
  );
};

export default ConfirmOTP;
