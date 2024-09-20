import { Dialog, InputNormal, MixTitle } from '@/components';
import { IListRole, IOption, LIST_LAST_WORD_PERMISSIONS, LIST_ROLE, SelectedOptions } from '@/constants/roleList';
import { createRole, getRoleById, IRoleList, updateRole } from '@/services/system-management/role-list';
import { checkedAll, handleCheckIndeterminateAll, onChangeAll } from '@/utils';
import { Button, Checkbox, Col, Collapse, Form, Row } from 'antd';
import { cloneDeep, isEmpty } from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
const CheckboxGroup = Checkbox.Group;

interface IDialogRole {
  openDialog: boolean;
  action: () => void;
  close: () => void;
  selectedRecord: IRoleList;
}

export const DialogRole: React.FC<IDialogRole> = ({ openDialog, close, action, selectedRecord }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({});

  useEffect(() => {
    if (selectedRecord) {
      serviceGetRoleDetail();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRecord]);

  const serviceGetRoleDetail = async () => {
    const res = await getRoleById({
      id: selectedRecord.id || '',
    });
    if (res?.statusCode === 200) {
      form.setFieldsValue({ name: res?.data?.name, description: res?.data?.description });
      handleSetSelectedOptions(res?.data?.permissions);
    }
  };

  const handleSetSelectedOptions = (pemissons: string[]) => {
    if (!pemissons) {
      return;
    }
    const result: Record<string, string[]> = {};

    // Iterate over each permission
    for (const item of pemissons) {
      // Find the last index of '.' in the permission string
      const lastIndex = item.lastIndexOf('.');
      // Extract the category from the permission string
      const key = item.substring(0, lastIndex);
      // The value is the full permission string
      const value = item;

      // If the category does not yet exist in the result object, initialize it with an empty array
      if (!result[key]) {
        result[key] = [];
      }

      // Add the permission to the category in the result object
      result[key].push(value);
    }

    setSelectedOptions(result);
  };

  const getTitle = () => {
    if (isEmpty(selectedRecord)) {
      return t('createNew');
    }
    return t('viewDetail');
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
    if (isEmpty(selectedRecord)) {
      handleCreateRole(values);
      setLoading(false);
      return;
    }
    handleUpdateRole(values);
    setLoading(false);
  };

  const handleCreateRole = async (values: any) => {
    const payload = {
      ...values,
      permissions: Object.values(selectedOptions).flat(),
    };
    const res = await createRole(payload);
    if (res && res.statusCode === 200) {
      handleAction();
    }
  };

  const handleUpdateRole = async (values: any) => {
    const payload = {
      ...values,
      id: selectedRecord.id || '',
      permissions: Object.values(selectedOptions).flat(),
    };
    const res = await updateRole(payload);
    if (res && res.statusCode === 200) {
      handleAction();
    }
  };

  const checkedModule = (el: IListRole) => {
    const optionsByValueModule = LIST_ROLE().find((item) => item.valueModule === el.valueModule)?.options || [];

    let totalCount = 0;

    for (const option of optionsByValueModule) {
      if (option.children) {
        totalCount += option.children.length;
      }
    }

    let valueRoleChecked = 0;

    optionsByValueModule.forEach((item: any) => {
      valueRoleChecked += selectedOptions[item.value]?.length || 0;
    });
    return totalCount === valueRoleChecked;
  };

  const handleCheckIndeterminateModule = (el: IListRole) => {
    const optionsByValueModule = LIST_ROLE().find((item) => item.valueModule === el.valueModule)?.options || [];

    let valueRoleChecked = 0;

    optionsByValueModule.forEach((item: any) => {
      valueRoleChecked += selectedOptions[item.value]?.length || 0;
    });

    return !!valueRoleChecked && !checkedModule(el);
  };

  const onChangeAllByModule = (checked: boolean, el: IListRole) => {
    const valueOptionsByValueModule = LIST_ROLE()
      .find((item) => item.valueModule === el.valueModule)
      ?.options?.map((e) => e.value);

    const objectChange: { [key: string]: string[] } = {};

    valueOptionsByValueModule?.forEach((item: string) => {
      const valuesChildren = LIST_ROLE()
        .find((i) => i.valueModule === el.valueModule)
        ?.options.find((e) => e.value === item)?.children;
      objectChange[item] = checked ? valuesChildren?.map((element) => element.value) || [] : [];
    });
    setSelectedOptions({ ...selectedOptions, ...objectChange });
    console.log({ ...selectedOptions, ...objectChange });
  };

  const handleSelectAllBySubModule = (checked: boolean, item: IOption) => {
    if (checked) {
      setSelectedOptions({
        ...selectedOptions,
        [item.value]: item.children.map((child) => child.value),
      });
      return;
    }
    setSelectedOptions({
      ...selectedOptions,
      [item.value]: [],
    });
  };

  const genExtra = (el: IListRole) => (
    <div
      onClick={(event) => {
        event.stopPropagation();
      }}
    >
      <Checkbox
        onChange={(event) => {
          onChangeAllByModule(event.target.checked, el);
        }}
        indeterminate={handleCheckIndeterminateModule(el)}
        checked={checkedModule(el)}
      >
        {t('all')}
      </Checkbox>
    </div>
  );

  const getChecked = (item: IOption) => {
    return selectedOptions[item.value] && selectedOptions[item.value].length === item.children.length;
  };

  const handleSetValueChecked = (_item: IOption, values: string[]) => {
    // Check if the 'VIEW' permission is present in the values
    const isCheck = values.some((item: string) => item.split('.').pop() === LIST_LAST_WORD_PERMISSIONS.VIEW);
    // If the 'VIEW' permission is present or the values array is empty, return the values as is
    if (isCheck || isEmpty(values)) {
      return values;
    }

    // If the 'VIEW' permission is not present, add it to the values array
    const itemAdd = values[0].split('.').slice(0, -1).join('.');
    return [...values, `${itemAdd}.${LIST_LAST_WORD_PERMISSIONS.VIEW}`];
  };

  const handleChange = (item: IOption, values: any[]) => {
    const valueClone = cloneDeep(values);

    const valueChange = handleSetValueChecked(item, valueClone);

    setSelectedOptions({
      ...selectedOptions,
      [item.value]: [...new Set(valueChange)],
    });
  };

  return (
    <Dialog isOpen={openDialog} handleClose={handleClose} footer={null} title={getTitle()} width={'70vw'}>
      <Form form={form} onFinish={onFinish} name="permissions" layout="vertical" autoComplete="off">
        <div className="edit-role-style">
          <Row gutter={32}>
            <Col span={8}>
              <Form.Item
                name="name"
                label={<MixTitle isRequired title={t('role.nameROle') || ''} />}
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
                <InputNormal />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="description"
                label={<MixTitle isRequired title={t('role.description') || ''} />}
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
                <InputNormal />
              </Form.Item>
            </Col>
          </Row>

          <Checkbox
            onChange={(event) => {
              onChangeAll({
                checked: event.target.checked,
                setSelectedOptions,
              });
            }}
            indeterminate={handleCheckIndeterminateAll({ selectedOptions }) && !checkedAll(selectedOptions)}
            checked={checkedAll(selectedOptions)}
          >
            {t('choseAll')}
          </Checkbox>
          {LIST_ROLE().map((el, index) => {
            return (
              <Collapse ghost bordered key={String(index + 1)} defaultActiveKey={[index]} size="small">
                <Collapse.Panel key={String(index + 1)} header={el.label} extra={genExtra(el)}>
                  <>
                    <Col span={24}>
                      <>
                        {el.options.map((item: IOption) => {
                          return (
                            <div key={item.value} className="mb-[30px] last:mb-[10px]">
                              {item.label && (
                                <div className="mb-[10px]">
                                  <Checkbox
                                    indeterminate={!!selectedOptions[item.value]?.length && !getChecked(item)}
                                    onChange={(e) => handleSelectAllBySubModule(e.target.checked, item)}
                                    checked={getChecked(item)}
                                  >
                                    {item.label}
                                  </Checkbox>
                                </div>
                              )}

                              <CheckboxGroup
                                options={item.children}
                                value={selectedOptions[item.value]}
                                onChange={(values) => handleChange(item, values)}
                              />
                            </div>
                          );
                        })}
                      </>
                    </Col>
                  </>
                </Collapse.Panel>
              </Collapse>
            );
          })}

          <div className="form-footer">
            <Button onClick={handleClose}>{t('cancel')}</Button>
            <Button loading={loading} htmlType="submit" type="primary" disabled={loading}>
              {t('save')}
            </Button>
          </div>
        </div>
      </Form>
    </Dialog>
  );
};
export default DialogRole;
