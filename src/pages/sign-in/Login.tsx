import { InputNormal, InputPassword } from '@/components';
import { requestUserLogin } from '@/store/auth/actions';
import { AuthState } from '@/store/auth/selector';
import { Button, Form } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
export const Login: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { isLoading } = useSelector(AuthState);
  const handleLoginNormal = (values: any) => {
    const payload = { userName: values.email, password: values.password };
    dispatch(requestUserLogin(payload));
  };

  return (
    <div className="signin-form">
      <p className="signin-form-title" style={{ marginBottom: 40 }}>
        {t('signin')}
      </p>
      <Form
        name="form-sign-in"
        initialValues={{
          email: '',
          password: '',
        }}
        onFinish={handleLoginNormal}
        autoComplete="off"
        layout="vertical"
        requiredMark={false}
        form={form}
        disabled={isLoading}
      >
        <Form.Item
          label=""
          name="email"
          rules={[
            {
              validator: (_rule: any, value: string = '') => {
                if (value.length !== 0) {
                  // if (!validateEmail(value)) {
                  //   return Promise.reject(t('pleaseEnterACorrectEmail'));
                  // }
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
          ]}
          normalize={(value) => {
            return value.trim();
          }}
        >
          <InputPassword placeholder={t('enterPassword') || ''} autoComplete="new-password" />
        </Form.Item>
        <a href="/forgot-password" className="signin-form-forgot_text">
          {t('forgotYourPassword?')}
        </a>
        <Form.Item shouldUpdate>
          {({ getFieldValue, getFieldError }) => {
            const getDisabled = () => {
              if (!getFieldValue('email') || !getFieldValue('password')) return true;
              if (
                (getFieldValue('email') && getFieldError('email').length > 0) ||
                (getFieldValue('password') && getFieldError('password').length > 0)
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
                {t('signin')}
              </Button>
            );
          }}
        </Form.Item>
        <a href="/register" className="signin-form-forgot_text">
          {t('register')}
        </a>
      </Form>
    </div>
  );
};

export default Login;
