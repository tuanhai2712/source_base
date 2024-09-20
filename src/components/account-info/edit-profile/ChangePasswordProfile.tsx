import { LockOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import React, { useState } from 'react';
import { FORMAT_PASSWORD } from '@/constants';
import { IFormChangePasswordProfiles, resetPassUserProfile } from '@/services/user';
import InputPassword from '@/components/InputPassword';
import { MixTitle } from '@/components/MixTitle';

interface IProps {
  setIsOpenUserAccountInfo: any;
  id: any;
}

const ChangePasswordProfile = ({ setIsOpenUserAccountInfo, id }: IProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const onFinish = async (values: IFormChangePasswordProfiles) => {
    setIsLoading(true);
    const params = {
      id: id,
      password: values?.password,
      oldPassword: values?.oldPassword,
    };

    const res = await resetPassUserProfile(params);
    if (res?.statusCode === 200 || res?.statusCode === 201) {
      setIsLoading(false);
      setIsOpenUserAccountInfo(false);
    }
  };

  return (
    <>
      <Row justify="center">
        <Col span={12}>
          <Form form={form} name="basic" layout="vertical" onFinish={onFinish} autoComplete="off">
            <Form.Item
              name="oldPassword"
              label={<MixTitle isRequired title={t('user.oldPassWord') || ''} />}
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
            >
              <InputPassword
                size="large"
                prefix={<LockOutlined className="text-[#279BEF]" />}
                autoComplete="old-password"
              />
            </Form.Item>
            <Form.Item
              name="password"
              label={<MixTitle isRequired title={t('user.newPassword') || ''} />}
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
                  message: `${t('theInputIsNotValidPassword')}`,
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('oldPassword') !== value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error(`${t('user.theNewPasswordIsDifferentFromTheOldPassword')}`));
                  },
                }),
              ]}
            >
              <InputPassword
                size="large"
                prefix={<LockOutlined className="text-[#279BEF]" />}
                autoComplete="new-password"
              />
            </Form.Item>
            <Form.Item
              name="comfirmPassword"
              label={<MixTitle isRequired title={t('user.comfirmNewPassword') || ''} />}
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
                    return Promise.reject(new Error(`${t(`user.confirmPasswordNotMatch`)}`));
                  },
                }),
              ]}
            >
              <InputPassword size="large" prefix={<LockOutlined className="text-[#279BEF]" />} />
            </Form.Item>
            <Row gutter={16} justify="center">
              <Button type="primary" htmlType="submit" size="large" className="bg-main" loading={isLoading}>
                {t('update')}
              </Button>
            </Row>
          </Form>
        </Col>
      </Row>
    </>
  );
};
export default ChangePasswordProfile;
