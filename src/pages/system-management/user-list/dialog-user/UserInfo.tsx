import { InputNormal, InputPassword, MixTitle } from '@/components';
import { CANNOT_COTAIN_SPECIAL_CHARACTERS, FORMAT_PASSWORD, FORMAT_PHONENUMBER } from '@/constants';
import { createUser, updateUser } from '@/services/system-management/user-list';
import { isEmpty } from 'lodash';
import { Button, Checkbox, Col, Form, Row } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LockOutlined } from '@ant-design/icons';

interface IUserInfo {
  action: () => void;
  close: () => void;
  userData?: any;
}

export const UserInfo: React.FC<IUserInfo> = ({ close, action, userData }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { t } = useTranslation();
  const [form] = Form.useForm();

  useEffect(() => {
    if (userData) {
      form.setFieldsValue({
        ...userData,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);

  const handleCreateUser = async (values: any) => {
    const res = await createUser({
      ...values,
    });
    if (res && res.statusCode === 200) {
      handleAction();
    }
  };

  const handleUpdateUser = async (values: any) => {
    const res = await updateUser({
      ...userData,
      ...values,
    });
    if (res && res.statusCode === 200) {
      handleAction();
    }
  };

  const handleAction = useCallback(() => {
    action();
    form.resetFields();
  }, [action, form]);

  const handleClose = useCallback(() => {
    close();
    form.resetFields();
  }, [close, form]);

  const onFinish = async (values: any) => {
    setLoading(true);
    if (isEmpty(userData)) {
      handleCreateUser(values);
      setLoading(false);
      return;
    }
    handleUpdateUser(values);
    setLoading(false);
  };

  return (
    <Form
      disabled={loading}
      onFinish={onFinish}
      autoComplete="off"
      layout="vertical"
      form={form}
      initialValues={{
        userName: '',
        email: '',
        password: '',
        comfirmPassword: '',
        phoneNumber: '',
        isSuperAdmin: false,
      }}
    >
      <Row gutter={8}>
        <Col span={12}>
          <Form.Item
            name="userName"
            label={<MixTitle isRequired title={t('user.userName') || ''} />}
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
            normalize={(value) => {
              return value.trim();
            }}
          >
            <InputNormal type="text" disabled={!!userData} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="fullName"
            label={<MixTitle isRequired title={t('user.fullName') || ''} />}
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
            <InputNormal type="text" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={8}>
        <Col span={12}>
          <Form.Item
            name="email"
            label={<MixTitle isRequired title={t('user.email') || ''} />}
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
            <InputNormal type="emailUser" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="phoneNumber"
            label={t(`user.phoneNumber`)}
            rules={[
              {
                pattern: FORMAT_PHONENUMBER,
                message: `${t('error.theInputIsNotValid')}`,
              },
            ]}
          >
            <InputNormal />
          </Form.Item>
        </Col>
      </Row>
      {isEmpty(userData) ? (
        <Row gutter={8}>
          <Col span={12}>
            <Form.Item
              name="password"
              label={<MixTitle isRequired title={t('password') || ''} />}
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
            >
              <InputPassword
                size="large"
                prefix={<LockOutlined className="text-[#279BEF]" />}
                autoComplete="new-password"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="comfirmPassword"
              label={<MixTitle isRequired title={t('comfirmPassword') || ''} />}
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
              <InputPassword size="large" prefix={<LockOutlined className="text-[#279BEF]" />} />
            </Form.Item>
          </Col>
        </Row>
      ) : null}
      <Row gutter={8}>
        <Form.Item name="isSuperAdmin" valuePropName="checked">
          <Checkbox>{t('user.superAdmin')}</Checkbox>
        </Form.Item>
      </Row>
      <div className="form-footer">
        <Button onClick={handleClose}>{t('cancel')}</Button>
        <Button loading={loading} htmlType="submit" type="primary" disabled={loading}>
          {t('save')}
        </Button>
      </div>
    </Form>
  );
};
export default UserInfo;
