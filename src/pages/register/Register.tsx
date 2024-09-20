import { ArrowLeftIcon } from '@/assets';
import { InputNormal, InputPassword } from '@/components';
import { CANNOT_COTAIN_SPECIAL_CHARACTERS, FORMAT_PASSWORD, FORMAT_PHONENUMBER } from '@/constants';
import { SIGN_IN_ROUTER } from '@/routes/constants';
import { registerAuth } from '@/services/auth';
import { requestUserLogin } from '@/store/auth/actions';
import { Button, Form } from 'antd';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
export const Register: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [isLoading, setIsloading] = useState(false);

  const handleRegisters = async (values: any) => {
    setIsloading(true);
    const res = await registerAuth({ ...values, isSuperAdmin: false });
    if (res && res.statusCode === 200) {
      setIsloading(false);
      const payload = { userName: res.data.userName, password: values.password };
      dispatch(requestUserLogin(payload));
    }
  };

  return (
    <div className="signin-form">
      <div style={{ marginBottom: 20 }}>
        <a href={SIGN_IN_ROUTER}>
          <ArrowLeftIcon />
        </a>
      </div>
      <p className="signin-form-title" style={{ marginBottom: 40 }}>
        {t('register')}
      </p>
      <Form
        name="form-sign-in"
        initialValues={{
          userName: '',
          fullName: '',
          email: '',
          phoneNumber: '',
          password: '',
          comfirmPassword: '',
        }}
        onFinish={handleRegisters}
        autoComplete="off"
        layout="vertical"
        requiredMark={false}
        form={form}
        disabled={isLoading}
      >
        <Form.Item
          label=""
          name="userName"
          rules={[
            {
              validator: (_rule: any, value: string = '') => {
                if (value.length === 0) {
                  return Promise.reject(t('error.thisFieldIsRequired'));
                }
                if (value.length > 50) {
                  return Promise.reject(t('error.thisFieldIsRequired'));
                }
                return Promise.resolve();
              },
            },
            {
              pattern: CANNOT_COTAIN_SPECIAL_CHARACTERS,
              message: `${t('user.userNameCannotContainSpecialCharaters')}`,
            },
          ]}
        >
          <InputNormal maxLength={320} placeholder={t('enterUserName') || ''} />
        </Form.Item>
        <Form.Item
          label=""
          name="fullName"
          rules={[
            {
              validator: (_rule: any, value: string = '') => {
                if (value.length === 0) {
                  return Promise.reject(t('error.thisFieldIsRequired'));
                }
                if (value.length > 50) {
                  return Promise.reject(t('error.thisFieldIsRequired'));
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <InputNormal maxLength={320} placeholder={t('enterFullName') || ''} />
        </Form.Item>
        <Form.Item
          label=""
          name="email"
          rules={[
            {
              validator: (_rule: any, value: string = '') => {
                if (value.length === 0) {
                  return Promise.reject(t('error.thisFieldIsRequired'));
                }
                return Promise.resolve();
              },
            },
            {
              type: 'email',
              message: `${t('error.theInputIsNotValid')}`,
            },
          ]}
        >
          <InputNormal maxLength={320} placeholder={t('enterEmail') || ''} />
        </Form.Item>
        <Form.Item
          name="phoneNumber"
          label=""
          rules={[
            {
              pattern: FORMAT_PHONENUMBER,
              message: `${t('error.theInputIsNotValid')}`,
            },
          ]}
        >
          <InputNormal placeholder={t('enterPhoneNumber') || ''} />
        </Form.Item>
        <Form.Item
          label=""
          name="password"
          rules={[
            {
              validator: (_rule: any, value: string = '') => {
                if (value.length === 0) {
                  return Promise.reject(t('error.thisFieldIsRequired'));
                }
                return Promise.resolve();
              },
            },
            {
              pattern: FORMAT_PASSWORD,
              message: `${t('user.theInputIsNotValidPassword')}`,
            },
          ]}
          normalize={(value) => {
            return value.trim();
          }}
        >
          <InputPassword placeholder={t('enterPassword') || ''} autoComplete="new-password" />
        </Form.Item>
        <Form.Item
          label=""
          name="comfirmPassword"
          rules={[
            {
              validator: (_rule: any, value: string = '') => {
                if (value.length === 0) {
                  return Promise.reject(t('error.thisFieldIsRequired'));
                }
                return Promise.resolve();
              },
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error(`user.confirmPasswordNotMatch`));
              },
            }),
          ]}
        >
          <InputPassword placeholder={t('comfirmPassword') || ''} />
        </Form.Item>
        <Form.Item shouldUpdate>
          {({ getFieldValue, getFieldError }) => {
            const getDisabled = () => {
              if (
                !getFieldValue('email') ||
                !getFieldValue('password') ||
                !getFieldValue('userName') ||
                !getFieldValue('fullName') ||
                !getFieldValue('comfirmPassword')
              )
                return true;
              if (
                (getFieldValue('email') && getFieldError('email').length > 0) ||
                (getFieldValue('password') && getFieldError('password').length > 0) ||
                (getFieldValue('userName') && getFieldError('userName').length > 0) ||
                (getFieldValue('fullName') && getFieldError('fullName').length > 0) ||
                (getFieldValue('comfirmPassword') && getFieldError('comfirmPassword').length > 0)
              )
                return true;
              if (isLoading) return true;
            };
            return (
              <Button
                type="primary"
                htmlType="submit"
                className="signin-form-btn_submit"
                disabled={getDisabled()}
                loading={isLoading}
              >
                {t('register')}
              </Button>
            );
          }}
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;
