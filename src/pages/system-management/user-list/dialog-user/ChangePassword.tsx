import { LockOutlined } from '@ant-design/icons';
import React, { Button, Col, Form, Row } from 'antd';

import { InputPassword, MixTitle } from '@/components';
import { IFormChangePasswordUser, resetPassUserByAdmin } from '@/services/system-management/user-list';
import { useTranslation } from 'react-i18next';
import { FORMAT_PASSWORD } from '@/constants';

interface IProps {
  id: string | undefined;
  action: () => void;
}

const ChangePassword = ({ id, action }: IProps) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const onFinish = (values: IFormChangePasswordUser) => {
    resetPassUserByAdmin({
      userId: id,
      newPassword: values?.password,
    }).then((res) => {
      if (res?.statusCode === 200 || res?.statusCode === 201) {
        action();
        form.resetFields();
      }
    });
  };

  return (
    <Row justify="center">
      <Col span={12}>
        <Form form={form} name="basic" layout="vertical" onFinish={onFinish} autoComplete="off">
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
                message: `${t(`user.theInputIsNotValidPassword`)}`,
              },
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
            <Button type="primary" htmlType="submit" size="large" className="bg-main">
              {t('update')}
            </Button>
          </Row>
        </Form>
      </Col>
    </Row>
  );
};
export default ChangePassword;
