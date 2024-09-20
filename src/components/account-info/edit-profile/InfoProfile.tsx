/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Col, Form, Input, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

// import { setProfile } from '@/store/common-slice';

import { useTranslation } from 'react-i18next';
import { IFiledsFormProdile, IProfile, updateUserProfile } from '@/services/user';
import { FORMAT_PHONENUMBER } from '@/constants';
import { MixTitle } from '@/components/MixTitle';
import InputNormal from '@/components/InputNormal';
import { updateProdile } from '@/store/user/actions';

interface IProps {
  onCancel: () => void;
  setIsOpenUserAccountInfo: any;
  profile: IProfile;
}

const InfoProfile = ({ onCancel, setIsOpenUserAccountInfo, profile }: IProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  useEffect(() => {
    form.setFieldsValue({
      ...profile,
    });
  }, [profile]);

  const onFinish = async (values: IFiledsFormProdile) => {
    setIsLoading(true);
    const params = {
      ...values,
      id: profile.id || '',
    };

    const res = await updateUserProfile(params);

    if (res?.statusCode === 200) {
      setIsLoading(false);
      dispatch(
        updateProdile({
          ...profile,
          ...form.getFieldsValue(),
        }),
      );
      setIsOpenUserAccountInfo(false);
    }
  };

  return (
    <>
      <Form
        layout="vertical"
        onFinish={onFinish}
        form={form}
        initialValues={{
          userName: '',
          email: '',
          password: '',
          comfirmPassword: '',
        }}
        autoComplete="off"
      >
        <Row gutter={8} className="mt-[10px]">
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
              ]}
            >
              <InputNormal type="text" disabled />
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
              <Input type="text" />
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
              name="phonenumber"
              label={`${t('user.phoneNumber')}`}
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
        <div className="form-footer">
          <Button className="mr-[24px]" onClick={onCancel}>
            {t('cancel')}
          </Button>
          <Button type="primary" htmlType="submit" className="bg-main" loading={isLoading}>
            {t('update')}
          </Button>
        </div>
      </Form>
    </>
  );
};
export default InfoProfile;
