import { ArrowLeftIcon } from '@/assets';
import { InputNormal } from '@/components';
import { CONFIRM_OTP_ROUTER, SIGN_IN_ROUTER } from '@/routes/constants';
import { userProfileState } from '@/store/user/selector';
import { validateEmail } from '@/utils';
import { Button, Form } from 'antd';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
export const ForgotPassword: React.FC = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const [form] = Form.useForm();
  const profileUser = useSelector(userProfileState);
  const [loading, setLoading] = useState<boolean>(false);

  const onFinish = async (values: any) => {
    history.push(CONFIRM_OTP_ROUTER);
    setLoading(true);
  };

  if (profileUser?.id) {
    return <Redirect to={'/'} />;
  }

  return (
    <>
      <div className="signin-form">
        <div style={{ marginBottom: 20 }}>
          <a href={SIGN_IN_ROUTER}>
            <ArrowLeftIcon />
          </a>
        </div>
        <p className="signin-form-title" style={{ marginBottom: 40 }}>
          {t('forgotYourPassword?')}
        </p>
        <Form
          name="form-forgot-password"
          initialValues={{
            email: '',
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
            name="email"
            rules={[
              {
                validator: (_rule: any, value: string = '') => {
                  if (value.length !== 0) {
                    if (!validateEmail(value)) {
                      return Promise.reject(t('pleaseEnterACorrectEmail'));
                    }
                  }
                  if (value.length === 0) {
                    return Promise.reject(t('error.thisFieldIsRequired'));
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <InputNormal maxLength={320} placeholder={t('enterEmail') || ''} />
          </Form.Item>

          <Form.Item shouldUpdate>
            {({ getFieldValue }) => {
              const getDisabled = () => {
                if (!getFieldValue('email')) return true;
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
                  {t('resetPassword')}
                </Button>
              );
            }}
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default ForgotPassword;
